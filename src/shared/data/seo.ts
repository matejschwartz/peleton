import { type Business, fullAddress, hoursSummary } from './business';

/** schema.org BreadcrumbList for a sub page: Home › Page */
export function breadcrumbJsonLd(siteUrl: string, items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: new URL(item.path, siteUrl).href,
    })),
  };
}

/** Meta description for a contact page – address, phone, e-mail and hours */
export function contactDescription(b: Business) {
  const open = hoursSummary(b)
    .filter((row) => row.time !== 'zatvorené')
    .map((row) => `${row.days} ${row.time}`)
    .join(', ');
  return `${b.name}, ${fullAddress(b)}. Tel. ${b.phones[0].display}, e-mail ${b.email}. Otvorené ${open}.`;
}
