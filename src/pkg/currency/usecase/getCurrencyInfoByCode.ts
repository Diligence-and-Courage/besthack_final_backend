import { Request, Response } from 'express';

import { AppResponse, Code, CurrencyInfo } from '../../../models';
import { selectCurrencyInfoByCode } from '../repository';

export const getCurrencyInfoByCode = async (req: Request<{ code?: Code }>, resp: Response) => {
  if (!req.params.code || !process.env.CURRENCIES.split(',').includes(req.params.code)) {
    return resp.status(400).send(<AppResponse<never>>{
      errors: ['Invalid request'],
    });
  }

  const data = await selectCurrencyInfoByCode(req.params.code);

  return resp.send(<AppResponse<CurrencyInfo>>{
    data,
  });
};
