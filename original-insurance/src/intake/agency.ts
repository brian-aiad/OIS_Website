import { contact, origin } from '../data/site';

/** Agency identity only. Keep credentials in environment variables, never here. */
export const agency = {
  id: 'ois',
  name: 'Original Insurance',
  legalName: 'Original Insurance Services',
  origin,
  phone: contact.phone,
  phoneHref: contact.phoneHref,
  email: contact.email,
  location: 'Downey, California',
  languages: 'English · Español · العربية',
  established: '1999',
  initials: 'OI',
};
