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
