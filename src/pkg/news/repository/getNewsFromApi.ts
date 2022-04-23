import { sub } from 'date-fns';
import NewsAPI from 'newsapi';

import { NewsArticle, NewsRequest, NewsResponse } from '../../../models';
import { toISODate } from '../../../utils/dateFormats';

export const availableDomains = ['news.google.com', 'lenta.ru', 'www.rbc.ru', 'russian.rt.com'];
export type Domain = 'news.google.com' | 'lenta.ru' | 'www.rbc.ru' | 'russian.rt.com';
export type GetNewsApiProps = {
  domains: Domain[];
  page?: number;
  pageSize?: number;
};

export const GetNewsFromApi = async ({
  domains,
  page = 1,
  pageSize = 10,
}: GetNewsApiProps): Promise<NewsArticle[] | null> => {
  const api = new NewsAPI(process.env.NEWSAPI_KEY);
  const resp: NewsResponse = await api.v2.everything(<NewsRequest>{
    from: toISODate(sub(Date.now(), { days: 7 })),
    to: toISODate(Date.now()),
    language: 'ru',
    page,
    pageSize,
    domains: domains.join(', '),
  });

  if (resp.status === 'error') {
    return null;
  }

  return resp.articles;
};
