import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import requestIp from 'request-ip';

import { AppResponse } from '../../../models';
import { logHistory } from '../../../utils/logHistory';
import { resetUserIsBlocked, selectUserById, updateBlockUser } from '../repository';

export const userBlockValidation = () => [body('userId').exists().isInt()];

export const blockUser = async (req: Request, resp: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp.status(400).send(<AppResponse<never>>{
      errors: errors.array(),
    });
  }

  const { userId } = req.body as { userId: number };

  const user = await selectUserById(userId);
  if (!user) {
    return resp.status(404).send(<AppResponse<never>>{
      errors: ['User not found'],
    });
  }

  await updateBlockUser(user.id);

  await logHistory({
    ip: requestIp.getClientIp(req),
    userInfo: user.email,
    actions: 'block user',
  });

  return resp.sendStatus(200);
};

export const unblockUser = async (req: Request, resp: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp.status(400).send(<AppResponse<never>>{
      errors: errors.array(),
    });
  }

  const { userId } = req.body as { userId: number };

  const user = await selectUserById(userId);
  if (!user) {
    return resp.status(404).send(<AppResponse<never>>{
      errors: ['User not found'],
    });
  }

  await resetUserIsBlocked(user.id);

  await logHistory({
    ip: requestIp.getClientIp(req),
    userInfo: user.email,
    actions: 'unblock user',
  });

  return resp.sendStatus(200);
};
