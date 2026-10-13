import { normalizeVin, validVin, type DecodedVehicle } from '../intake/vin';

export class VinLookupError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
/** Only VIN is sent to the fixed NHTSA endpoint. No customer details or persistent cache. */
export async function decodeVin(
  raw: unknown,
): Promise<{ vehicle: DecodedVehicle; complete: boolean }> {
  const vin = typeof raw === 'string' ? normalizeVin(raw) : '';
  if (!validVin(vin)) throw new VinLookupError(400, 'Enter a 17-character VIN with no I, O, or Q.');
  let response: Response;
  try {
    response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${vin}?format=json`,
      {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(8000),
        redirect: 'error',
      },
    );
  } catch {
    throw new VinLookupError(
      503,
      'Vehicle lookup is unavailable right now. You can enter the year, make, and model below.',
    );
  }
  if (!response.ok)
    throw new VinLookupError(
      503,
      'Vehicle lookup is busy. Try again, or enter the details yourself.',
    );
  let payload;
  try {
    payload = await response.json();
  } catch {
    throw new VinLookupError(
      503,
      'Vehicle lookup returned an unreadable result. Enter the details below.',
    );
  }
  const record = payload?.Results?.[0];
  if (!record || typeof record !== 'object')
    throw new VinLookupError(
      422,
      'We couldn’t identify this vehicle. Check the VIN or enter the details below.',
    );
  // Never treat a bad check digit or a VIN error as a verified vehicle match.
  const codes = String(record.ErrorCode ?? '')
    .split(',')
    .map((c: string) => c.trim())
    .filter(Boolean);
  if (!codes.length || codes.some((c: string) => c !== '0'))
    throw new VinLookupError(
      422,
      'We couldn’t confirm this VIN. Double-check it, or enter the vehicle details yourself.',
    );
  const clean = (value: unknown) =>
    typeof value === 'string' && value.trim().length <= 100 && !/[<>\r\n]/.test(value)
      ? value.trim()
      : '';
  const year = clean(record.ModelYear);
  const vehicle: DecodedVehicle = {
    vin,
    year:
      /^\d{4}$/.test(year) && +year >= 1981 && +year <= new Date().getFullYear() + 2 ? year : '',
    make: clean(record.Make),
    model: clean(record.Model),
  };
  if (!vehicle.year && !vehicle.make && !vehicle.model)
    throw new VinLookupError(422, 'No vehicle details were found. You can still enter them below.');
  return { vehicle, complete: !!(vehicle.year && vehicle.make && vehicle.model) };
}
