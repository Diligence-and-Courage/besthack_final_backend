export type NewsRequest = {
  domains: string;
  from: string;
  to: string;
  language: 'ru';
  page: number;
  pageSize: number;
};

export type NewsArticle = {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content?: string;
};

export type NewsResponse = {
  totalResults: number;
  status: 'ok' | 'error';

  // when status error
  code?: string;
  message?: string;

  // when status ok
  articles?: NewsArticle[];
};

export type UpdateDomainsEnabledRequest = {
  domain: string;
  enabled: boolean;
};

export const availableDomains = ['news.google.com', 'lenta.ru', 'www.rbc.ru', 'russian.rt.com'];
export type Domain = 'news.google.com' | 'lenta.ru' | 'www.rbc.ru' | 'russian.rt.com';
export type GetNewsRequest = {
  page?: number;
  pageSize?: number;
};

export type NewsDomains = { domain: Domain; isEnabled: boolean };
