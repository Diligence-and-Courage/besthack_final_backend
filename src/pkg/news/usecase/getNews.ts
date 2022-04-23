import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { AppResponse, NewsArticle } from '../../../models';
import { GetNewsFromApi } from '../repository';

type QueryParams = {
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

  const articles = await GetNewsFromApi({ ...req.query });
  if (!articles) {
    return resp.status(404).send(<AppResponse<never>>{ errors: ['No news found'] });
  }
  return resp.send(<AppResponse<NewsArticle[]>>{
    data: articles,
  });
};
