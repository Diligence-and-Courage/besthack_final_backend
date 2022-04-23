import { Request, Response } from 'express';
import { query, validationResult } from 'express-validator';

import { AppResponse, Code, Currency, CurrencyInfo } from '../../../models';
import { selectCurrencyInfo } from '../repository';
import { selectCurrencyCost } from '../repository/selectCurrencyCost';

export const getCurrencyInfoValidation = () => [
  query('code')
    .exists()
    .withMessage('Not exists')
    .isString()
    .withMessage('Not string')
    .custom((value) => {
      if (!process.env.CURRENCIES.split(',').includes(value)) {
        throw new Error(`Invalid currency value: supported: ${process.env.CURRENCIES}`);
      }

      return true;
    }),
];

export const getCurrencyInfo = async (
  req: Request<any, any, any, { code: Code }>,
  resp: Response,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp.status(400).send(<AppResponse<never>>{
      errors: errors.array(),
    });
  }

  const costs = await selectCurrencyCost(req.query.code);
  const info = await selectCurrencyInfo();

  const currencyInfo: Record<Code, Partial<CurrencyInfo>> = {
    CHF: {},
    CNY: {},
    EUR: {},
    GBP: {},
    RUB: {},
    USD: {},
  };

  process.env.CURRENCIES.split(',').forEach((code) => {
    currencyInfo[code] = info.find((el) => el.currencyCode === code);
  });

  const data = costs.map<Currency>(({ baseCode, code, ...rest }) => ({
    baseCode: currencyInfo[baseCode],
    code: currencyInfo[code],
    ...rest,
  }));

  return resp.send(<AppResponse<Currency[]>>{
    data,
  });
};
