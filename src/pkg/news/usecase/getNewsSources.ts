import { Request, Response } from 'express';

import { AppResponse, NewsDomains } from '../../../models';
import { selectNewsDomains } from '../repository';

export const getNewsSources = async (req: Request, resp: Response) => {
  const data = await selectNewsDomains();

  return resp.send(<AppResponse<NewsDomains[]>>{
    data,
  });
};
