import type { Request, Response } from 'express';

import { AppResponse, Code, UserInfo } from '../../../models';
import { decamelize } from '../../../utils';
import { selectUserCurrencyByCodeAndId } from '../repository';

export const getUserCurrencyByCode = async (req: Request<{ code: Code }>, resp: Response) => {
  const curr = process.env.CURRENCIES.split(',');
  if (!req.params.code || !curr.includes(req.params.code) || req.params.code === 'RUB') {
    return resp.status(400).send(<AppResponse<never>>{
      errors: [
        `Invalid currency value: supported: ${curr.filter((el) => el !== 'RUB').join(', ')}`,
      ],
    });
  }

  const currency = await selectUserCurrencyByCodeAndId(req.params.code, resp.locals.userId);

  if (!currency) {
    return resp.status(404).send(<AppResponse<never>>{
      errors: ['User does not have this stock'],
    });
  }

  return resp.send(<AppResponse<UserInfo>>{
    data: decamelize(currency),
  });
};
