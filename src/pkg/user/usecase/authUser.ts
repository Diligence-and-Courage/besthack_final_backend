import { compareSync } from 'bcrypt';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { omit } from 'lodash';
import requestIp from 'request-ip';

import { AppResponse, AuthUserInfo, UserInfo } from '../../../models';
import { decamelize, setCookieUserId } from '../../../utils';
import { logHistory } from '../../../utils/logHistory';
import { selectUserByEmail } from '../repository';
import { resetUserIsBlocked, updateUserIsBlocked } from '../repository/updateUserIsBlocked';

export const authValidation = () => [
  body('password').exists().withMessage('Not exists').isString().withMessage('Not string'),
  body('email').exists().withMessage('Not exists').isEmail().withMessage('Invalid Email'),
];

export const authUser = async (req: Request, resp: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp.status(400).send(<AppResponse<never>>{
      errors: errors.array(),
    });
  }

  const { email, password } = req.body as AuthUserInfo;
  const user = await selectUserByEmail(email);
  if (!user) {
    return resp.status(404).send(<AppResponse<never>>{
      errors: [`User with email ${email} not found`],
    });
  }

  if (user.isBlocked) {
    return resp.status(403).send(<AppResponse<never>>{
      errors: [`User is blocked`],
    });
  }

  if (!compareSync(password, user.password)) {
    await updateUserIsBlocked(user.id);
    return resp.status(401).send(<AppResponse<never>>{
      errors: [`Invalid password for user with email ${email}`],
    });
  }

  setCookieUserId(resp, user.id);

  await resetUserIsBlocked(user.id);

  const respUser = await selectUserByEmail(email);

  await logHistory({
    ip: requestIp.getClientIp(req),
    userInfo: respUser.email,
    actions: 'auth user',
  });

  return resp.send(<AppResponse<UserInfo>>{
    data: decamelize(omit(respUser, ['password'])),
  });
};
