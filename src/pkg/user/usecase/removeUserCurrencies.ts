import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { round } from 'lodash';

import { AppResponse, UserCurrenciesAdd } from '../../../models';
import { selectCurrencyInfoByCode } from '../../currency/repository';
import {
  deleteUserCurrencies,
  insertUserCurrencies,
  selectUserById,
  selectUserCurrencyByCodeAndId,
  updateBalance,
} from '../repository';

export const removeUserCurrencies = async (req: Request, resp: Response) => {
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

  const userCurrRemove = req.body as UserCurrenciesAdd;
  userCurrRemove.userId = resp.locals.userId;

  const curr = await selectCurrencyInfoByCode(userCurrRemove.code);
  if (!curr) {
    return resp.status(404).send(<AppResponse<never>>{
      errors: [`No stock with symbol ${userCurrRemove.code} found`],
    });
  }

  const userCurr = await selectUserCurrencyByCodeAndId(userCurrRemove.code, userCurrRemove.userId);

  if (!userCurr) {
    return resp.status(404).send(<AppResponse<never>>{
      errors: [`User with id ${userCurrRemove.userId} doesn't have ${userCurrRemove.code} stock`],
    });
  }

  if (userCurr.count < userCurrRemove.count) {
    return resp.status(404).send(<AppResponse<never>>{
      errors: [
        `User with id ${userCurrRemove.userId} have ${userCurr.count} ${userCurrRemove.code} stocks. That is not enough`,
      ],
    });
  }

  userCurrRemove.count = round(-userCurrRemove.count, 4);

  const newCount = await insertUserCurrencies(userCurrRemove);
  const userInfo = await selectUserById(resp.locals.userId);

  await updateBalance(
    resp.locals.userId,
    round(userInfo.balance + userCurr.count * curr.costInRub, 4),
  );

  if (userCurr.count === -userCurrRemove.count) {
    await deleteUserCurrencies(userCurrRemove.code, userCurrRemove.userId);
  }

  return resp.send(<AppResponse<{ count: number }>>{
    data: {
      count: newCount,
    },
  });
};
