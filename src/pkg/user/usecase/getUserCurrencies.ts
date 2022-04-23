import type { Request, Response } from 'express';

import { AppResponse, UserInfo } from '../../../models';
import { decamelize } from '../../../utils';
import { selectUserCurrenciesById } from '../repository';

export const getUserCurrencies = async (req: Request, resp: Response) => {
  const stocks = await selectUserCurrenciesById(resp.locals.userId);

  return resp.send(<AppResponse<UserInfo>>{
    data: decamelize(stocks),
  });
};
