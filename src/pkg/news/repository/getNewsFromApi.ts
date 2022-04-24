import { sub } from 'date-fns';
import NewsAPI from 'newsapi';

import { GetNewsRequest, NewsArticle, NewsRequest, NewsResponse } from '../../../models';
import { toISODate } from '../../../utils/dateFormats';
import { selectNewsDomains } from './selectNewsDomains';

export const GetNewsFromApi = async ({
  page = 1,
  pageSize = 10,
}: GetNewsRequest): Promise<NewsArticle[] | null> => {
  const res = await selectNewsDomains();
  const domains = res.map((row) => row.domain);

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
