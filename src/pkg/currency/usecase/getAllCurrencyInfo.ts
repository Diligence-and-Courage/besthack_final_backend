import { Request, Response } from 'express';

import { AppResponse, CurrencyInfo } from '../../../models';
import { selectCurrencyInfo } from '../repository';

export const getAllCurrencyInfo = async (req: Request, resp: Response) => {
  const data = await selectCurrencyInfo();

  return resp.send(<AppResponse<CurrencyInfo[]>>{
    data,
  });
};
