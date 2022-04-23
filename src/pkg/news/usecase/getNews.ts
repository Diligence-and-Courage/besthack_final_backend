import { Request, Response } from 'express';
import { query, validationResult } from 'express-validator';

import { AppResponse, NewsArticle } from '../../../models';
import { availableDomains, Domain, GetNewsFromApi } from '../repository';

export const newsValidator = () => [
  query('domains').exists().withMessage('Not exists').isString().withMessage('Not string'),
];

type QueryParams = {
  domains: string;
  page?: number;
  pageSize?: number;
};

export const getNews = async (req: Request<any, any, any, QueryParams>, resp: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp.status(400).send(<AppResponse<never>>{
      errors: errors.array(),
    });
  }

  const { domains: queryDomains, ...reqQuery } = req.query;

  const domains = queryDomains.split(',') as Domain[];

  if (!domains.every((domain) => availableDomains.includes(domain))) {
    return resp.status(400).send(<AppResponse<never>>{
      errors: [`Available domains are ${availableDomains.join(', ')}`],
    });
  }

  const articles = await GetNewsFromApi({ domains, ...reqQuery });
  if (!articles) {
    return resp.status(404).send(<AppResponse<never>>{ errors: ['No news found'] });
  }
  return resp.send(<AppResponse<NewsArticle[]>>{
    data: articles,
  });
};
