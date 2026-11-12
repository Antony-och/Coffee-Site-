export const CONTACT_PHONE_LOCAL = '0714304838';
export const CONTACT_PHONE_INTERNATIONAL = '254714304838';
export const CONTACT_PHONE_TEL = `+${CONTACT_PHONE_INTERNATIONAL}`;
export const CONTACT_PHONE_DISPLAY = CONTACT_PHONE_TEL;

export const CONTACT_EMAIL = 'firstcupcoffeeltd@gmail.com';

export const CONTACT_OFFICE_LOCATION = {
  id: 'office',
  name: 'First Cup Coffee & Tea Office',
  region: 'Ruiru, Kiambu County',
  address: 'First Cup Coffee and Tea, Ruiru, Kenya',
  elevation: '1,520m',
  purpose: 'Retail pickup, customer service, and order collection',
  mapQuery: 'First Cup Coffee and Tea Ruiru Kenya',
} as const;

export const CONTACT_OFFICE_LOCATION_LABEL = 'Ruiru, Kenya';

export const CONTACT_OFFICE_HOURS = {
  weekdays: 'Mon–Fri, 8:00 AM–5:00 PM',
  weekends: 'Weekends, 8:00 AM–1:00 PM',
} as const;
