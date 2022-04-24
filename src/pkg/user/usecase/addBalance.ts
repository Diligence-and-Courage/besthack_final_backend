import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { round } from 'lodash';
import requestIp from 'request-ip';

import { AppResponse, UserInfo } from '../../../models';
import { decamelize } from '../../../utils';
import { logHistory } from '../../../utils/logHistory';
import { selectUserById, updateBalance } from '../repository';

export const addBalanceValidation = () => [
  body('count').exists().withMessage('Not exists').isInt({ min: 1 }).withMessage('Not number'),
];

export const addBalance = async (req: Request, resp: Response) => {
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

  const currUser = await selectUserById(resp.locals.userId);

  const user = await updateBalance(resp.locals.userId, round(req.body.count + currUser.balance, 4));

  if (!user) {
    return resp.status(404).send(<AppResponse<never>>{
      errors: ['Not found'],
    });
  }

  await logHistory({
    ip: requestIp.getClientIp(req),
    userInfo: user.email,
    actions: `update balance at user`,
  });

  return resp.send(<AppResponse<UserInfo>>{
    data: decamelize(user),
  });
};
