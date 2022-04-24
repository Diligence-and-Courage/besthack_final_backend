import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import requestIp from 'request-ip';

import { AppResponse, CreateUserInfo, UserInfo } from '../../../models';
import { camelize, decamelize, hash, setCookieUserId } from '../../../utils';
import { logHistory } from '../../../utils/logHistory';
import { insertUser } from '../repository';

export const createUserValidation = () => [
  body(['password']).exists().withMessage('Not exists').isString().withMessage('Not string'),
  body('email').exists().withMessage('Not exists').isEmail().withMessage('Invalid Email'),
];

export const createUser = async (req: Request, resp: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp.status(400).send(<AppResponse<never>>{
      errors: errors.array(),
    });
  }

  const user = camelize(req.body) as CreateUserInfo;
  user.password = hash(user.password);

  const userInfo = await insertUser(user);
  if (!userInfo) {
    return resp.status(409).send(<AppResponse<never>>{
      errors: [`User already exists`],
    });
  }

  await logHistory({
    ip: requestIp.getClientIp(req),
    userInfo: userInfo.email,
    actions: 'create user',
  });

  setCookieUserId(resp, userInfo.id);

  return resp.send(<AppResponse<UserInfo>>{
    data: decamelize(userInfo),
  });
};
