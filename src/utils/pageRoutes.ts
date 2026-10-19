import type { PageView } from '../types';

export const PAGE_PATHS: Record<PageView, string> = {
  home: '/',
  about: '/about',
  coffee: '/coffee',
  tea: '/tea',
  contact: '/contact',
};

const PAGE_BY_PATH: Record<string, PageView> = {
  '/': 'home',
  '/home': 'home',
  '/about': 'about',
  '/coffee': 'coffee',
  '/tea': 'tea',
  '/process': 'coffee',
  '/contact': 'contact',
};

export function pageFromPathname(pathname: string): PageView {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  return PAGE_BY_PATH[normalizedPath] ?? 'home';
}
