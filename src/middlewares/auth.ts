import type { NextFunction, Request, Response } from 'express';

import { AppResponse } from '../models';
import { selectUserById } from '../pkg/user/repository';
import { getCookieUserId } from '../utils';

// eslint-disable-next-line consistent-return
export const authMiddleware = async (req: Request, resp: Response, next: NextFunction) => {
  const userId = getCookieUserId(req);
  if (!userId) {
    return resp.status(401).send(<AppResponse<never>>{
      errors: ['User not authorised'],
    });
  }

  const user = await selectUserById(userId);
  if (user.isBlocked) {
    return resp.status(403).send(<AppResponse<never>>{
      errors: ['User is blocked'],
    });
  }

  resp.locals.userId = userId;
  next();
};
