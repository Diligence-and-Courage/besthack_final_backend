import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { round } from 'lodash';
import requestIp from 'request-ip';

import { AppResponse, UserCurrenciesAdd } from '../../../models';
import { logHistory } from '../../../utils/logHistory';
import { selectCurrencyInfoByCode } from '../../currency/repository';
import { insertUserCurrencies, selectUserById, updateBalance } from '../repository';

export const userCurrenciesValidation = () => [
  body('code')
    .exists()
    .withMessage('Not exists')
    .isString()
    .withMessage('Not string')
    .custom((value) => {
      const curr = process.env.CURRENCIES.split(',');
      if (!curr.includes(value) || value === 'RUB') {
        throw new Error(
          `Invalid currency value: supported: ${curr.filter((el) => el !== 'RUB').join(', ')}`,
        );
      }

      return true;
    }),
  body('count').exists().withMessage('Not exists').isFloat({ min: 1 }).withMessage('Not float'),
];

export const addUserCurrencies = async (req: Request, resp: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp.status(400).send(<AppResponse<never>>{
      errors: errors.array(),
    });
  }

  if (!resp.locals.userId) {
    return resp.status(401).send(<AppResponse<never>>{
      errors: ['User unauthorized'],
    });
  }

  const userCurrencyAdd = req.body as UserCurrenciesAdd;
  userCurrencyAdd.userId = resp.locals.userId;
  userCurrencyAdd.count = round(userCurrencyAdd.count, 4);

  const user = await selectUserById(resp.locals.userId);

  const curr = await selectCurrencyInfoByCode(userCurrencyAdd.code);
  if (!curr) {
    return resp.status(404).send(<AppResponse<never>>{
      errors: [`No stock with symbol ${userCurrencyAdd.code} found`],
    });
  }

  const cost = curr.costInRub * userCurrencyAdd.count;

  if (user.balance < cost) {
    return resp.status(400).send(<AppResponse<never>>{
      errors: [`Not enough money`],
    });
  }

  await updateBalance(resp.locals.userId, round(user.balance - cost, 4));

  const count = await insertUserCurrencies(userCurrencyAdd);

  await logHistory({
    ip: requestIp.getClientIp(req),
    userInfo: user.email,
    actions: `buy currency`,
  });

  return resp.send(<AppResponse<{ count: number }>>{
    data: {
      count,
    },
  });
};
