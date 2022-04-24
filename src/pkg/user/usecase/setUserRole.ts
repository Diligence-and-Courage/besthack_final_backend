import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import requestIp from 'request-ip';

import { AppResponse, Role } from '../../../models';
import { logHistory } from '../../../utils/logHistory';
import { selectUserById, updateUserRole } from '../repository';

export const userRoleValidation = () => [
  body('role')
    .exists()
    .isString()
    .custom((value) => {
      if (value !== 'common' && value !== 'user' && value !== 'admin') {
        throw new Error('Invalid role');
      }

      return true;
    }),
  body('userId').exists().isInt(),
];

export const setUserRole = async (req: Request, resp: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp.status(400).send(<AppResponse<never>>{
      errors: errors.array(),
    });
  }

  const { role, userId } = req.body as { role: Role; userId: number };

  const user = await selectUserById(userId);
  if (!user) {
    return resp.status(400).send(<AppResponse<never>>{
      errors: ['User not found'],
    });
  }

  await updateUserRole(userId, role);

  await logHistory({
    ip: requestIp.getClientIp(req),
    userInfo: user.email,
    actions: 'update user role',
  });

  return resp.sendStatus(200);
};
