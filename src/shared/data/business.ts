// Single source of truth for both shops: contacts, hours, map, structured data.
// Edit here and rebuild – every page, footer and JSON-LD block reads from it.

export type DayKey = 'Mo' | 'Tu' | 'We' | 'Th' | 'Fr' | 'Sa' | 'Su';

export interface OpeningDay {
  day: DayKey;
  label: string;
  /** "HH:MM" – omit both for a closed day */
  opens?: string;
  closes?: string;
  note?: string;
}

export interface Phone {
  display: string;
  tel: string;
  label: string;
}

export interface Business {
  key: 'sport' | 'mototechna';
  name: string;
  shortName: string;
  url: string;
  /** schema.org type(s) – several when the shop is also e.g. a repair shop */
  schemaType: string | string[];
  address: {
    street: string;
    /** Where to look for the shop, e.g. "Mestská tržnica" */
    landmark?: string;
    city: string;
    zip: string;
    region: string;
    country: string;
  };
  geo: { lat: number; lng: number };
  /** Query used for the Google Maps embed and the "navigovať" link */
  mapQuery: string;
  phones: Phone[];
  email: string;
  facebook?: string;
  messenger?: string;
  hours: OpeningDay[];
  hoursNote?: string;
  foundingDate?: string;
}

const weekdays = (opens: string, closes: string): OpeningDay[] => [
  { day: 'Mo', label: 'Pondelok', opens, closes },
  { day: 'Tu', label: 'Utorok', opens, closes },
  { day: 'We', label: 'Streda', opens, closes },
  { day: 'Th', label: 'Štvrtok', opens, closes },
  { day: 'Fr', label: 'Piatok', opens, closes },
];

export const sport: Business = {
  key: 'sport',
  name: 'Šport Peleton',
  shortName: 'Peleton Šport',
  url: 'https://sport.peleton.sk',
  schemaType: 'BikeStore',
  // Address and name as in the shop's Google Business Profile – keep them identical (local SEO)
  address: {
    street: 'Švermova 1895/3',
    landmark: 'Mestská tržnica',
    city: 'Handlová',
    zip: '972 51',
    region: 'Trenčiansky kraj',
    country: 'SK',
  },
  geo: { lat: 48.728879, lng: 18.759208 },
  mapQuery: 'Peleton - bicykle, šport, servis, Švermova 1895, 972 51 Handlová',
  phones: [
    { display: '046 5476 079', tel: '+421465476079', label: 'Predajňa' },
    { display: '046 3811 027', tel: '+421463811027', label: 'Telefón' },
  ],
  email: 'sportpeleton@gmail.com',
  facebook: 'https://www.facebook.com/SportPeleton',
  messenger: 'https://m.me/SportPeleton',
  hours: [
    ...weekdays('09:00', '17:00'),
    { day: 'Sa', label: 'Sobota', opens: '09:00', closes: '12:00' },
    { day: 'Su', label: 'Nedeľa', note: 'Zatvorené' },
  ],
  foundingDate: '2000',
};

export const mototechna: Business = {
  key: 'mototechna',
  name: 'Mototechna Peleton',
  shortName: 'Mototechna',
  url: 'https://mototechna.peleton.sk',
  schemaType: ['AutoPartsStore', 'AutoRepair'],
  // Address and name as in the shop's Google Business Profile – keep them identical (local SEO)
  address: {
    street: 'Československej armády 1',
    city: 'Handlová',
    zip: '972 51',
    region: 'Trenčiansky kraj',
    country: 'SK',
  },
  geo: { lat: 48.731406, lng: 18.760946 },
  mapQuery: 'MOTOTECHNA - PELETON, Československej armády 1, 972 51 Handlová',
  phones: [
    { display: '046 5475 290', tel: '+421465475290', label: 'Predajňa' },
    { display: '0917 784 508', tel: '+421917784508', label: 'Mobil' },
  ],
  email: 'mototechnapeleton@gmail.com',
  facebook: 'https://www.facebook.com/SportPeleton',
  hours: [
    ...weekdays('07:30', '16:30'),
    { day: 'Sa', label: 'Sobota', opens: '07:30', closes: '11:30' },
    { day: 'Su', label: 'Nedeľa', note: 'Zatvorené' },
  ],
  foundingDate: '2008-01-01',
};

export const businesses = { sport, mototechna };

export const fullAddress = (b: Business) =>
  [b.address.landmark, b.address.street, `${b.address.zip} ${b.address.city}`].filter(Boolean).join(', ');

export const mapsDirectionsUrl = (b: Business) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.mapQuery)}`;

export const mapsEmbedUrl = (b: Business) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(b.mapQuery)}&hl=sk&z=17&output=embed`;

/** "9:00" style label used in the UI */
export const shortTime = (t: string) => t.replace(/^0/, '');

const shortDay: Record<DayKey, string> = {
  Mo: 'Po',
  Tu: 'Ut',
  We: 'St',
  Th: 'Št',
  Fr: 'Pi',
  Sa: 'So',
  Su: 'Ne',
};

/** Consecutive days with the same hours merged: [{ days: 'Po – Pi', time: '9:00 – 17:00' }, …] */
export function hoursSummary(b: Business) {
  const time = (h: OpeningDay) => (h.opens && h.closes ? `${shortTime(h.opens)} – ${shortTime(h.closes)}` : 'zatvorené');
  const rows: { days: string; time: string }[] = [];
  let start = 0;
  b.hours.forEach((h, i) => {
    const next = b.hours[i + 1];
    if (next && time(next) === time(h)) return;
    const first = shortDay[b.hours[start].day];
    rows.push({ days: i === start ? first : `${first} – ${shortDay[h.day]}`, time: time(h) });
    start = i + 1;
  });
  return rows;
}

const schemaDays: Record<DayKey, string> = {
  Mo: 'Monday',
  Tu: 'Tuesday',
  We: 'Wednesday',
  Th: 'Thursday',
  Fr: 'Friday',
  Sa: 'Saturday',
  Su: 'Sunday',
};

/** schema.org LocalBusiness block for the shop's home and contact pages */
export function localBusinessJsonLd(b: Business, extra: Record<string, unknown> = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': b.schemaType,
    '@id': `${b.url}/#business`,
    name: b.name,
    url: `${b.url}/`,
    telephone: b.phones[0].tel,
    email: b.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: b.address.street,
      addressLocality: b.address.city,
      postalCode: b.address.zip,
      addressRegion: b.address.region,
      addressCountry: b.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: b.geo.lat, longitude: b.geo.lng },
    hasMap: mapsDirectionsUrl(b),
    openingHoursSpecification: b.hours
      .filter((h) => h.opens && h.closes)
      .map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `https://schema.org/${schemaDays[h.day]}`,
        opens: h.opens,
        closes: h.closes,
      })),
    sameAs: b.facebook ? [b.facebook] : undefined,
    foundingDate: b.foundingDate,
    parentOrganization: { '@id': 'https://peleton.sk/#organization' },
    ...extra,
  };
}
