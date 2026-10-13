export type DecodedVehicle = { vin: string; year: string; make: string; model: string };
export const normalizeVin = (value: string) => value.replace(/\s/g, '').toUpperCase();
export const validVin = (value: string) => /^[A-HJ-NPR-Z0-9]{17}$/.test(value);
export const vehicleLabel = (vehicle: Record<string, string>) =>
  [vehicle.year, vehicle.make, vehicle.model].filter(Boolean).join(' ');
