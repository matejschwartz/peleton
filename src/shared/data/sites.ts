import { type Business, mototechna, sport } from './business';

export interface NavItem {
  href: string;
  label: string;
}

export interface SiteConfig {
  key: 'hub' | 'sport' | 'mototechna';
  brand: 'hub' | 'sport' | 'moto';
  url: string;
  siteName: string;
  locale: string;
  themeColor: string;
  business?: Business;
  nav: NavItem[];
  /** Matomo site id – one per subdomain makes the reports easier to read */
  matomoSiteId: string;
}

export const MATOMO_URL = 'https://matomo.innocore.sk/';

export const hubSite: SiteConfig = {
  key: 'hub',
  brand: 'hub',
  url: 'https://peleton.sk',
  siteName: 'Peleton Handlová',
  locale: 'sk_SK',
  themeColor: '#16191c',
  nav: [],
  matomoSiteId: '7',
};

export const sportSite: SiteConfig = {
  key: 'sport',
  brand: 'sport',
  url: sport.url,
  siteName: 'Peleton Šport – bicykle a servis Handlová',
  locale: 'sk_SK',
  themeColor: '#16191c',
  business: sport,
  nav: [
    { href: '/', label: 'Úvod' },
    { href: '/sortiment/', label: 'Sortiment' },
    { href: '/servis/', label: 'Servis' },
    { href: '/kontakt/', label: 'Kontakt' },
  ],
  matomoSiteId: '7',
};

export const mototechnaSite: SiteConfig = {
  key: 'mototechna',
  brand: 'moto',
  url: mototechna.url,
  siteName: 'Mototechna Peleton – autodiely Handlová',
  locale: 'sk_SK',
  themeColor: '#16191c',
  business: mototechna,
  nav: [
    { href: '/', label: 'Úvod' },
    { href: '/sortiment/', label: 'Sortiment' },
    { href: '/sluzby/', label: 'Servis a montáž' },
    { href: '/kontakt/', label: 'Kontakt' },
  ],
  matomoSiteId: '7',
};

/** Entries of the "Peleton v Handlovej" switcher shown on top of every page */
export const switcher = [
  { key: 'sport', label: 'Šport a bicykle', href: `${sport.url}/` },
  { key: 'mototechna', label: 'Mototechna', href: `${mototechna.url}/` },
] as const;
