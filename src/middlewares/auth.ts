import type { NextFunction, Request, Response } from 'express';

import { AppResponse } from '../models';
import { getCookieUserId } from '../utils';

// eslint-disable-next-line consistent-return
export const authMiddleware = (req: Request, resp: Response, next: NextFunction) => {
  const userId = getCookieUserId(req);
  if (!userId) {
    return resp.status(401).send(<AppResponse<never>>{
      errors: ['User not authorised'],
    });
  }
  resp.locals.userId = userId;
  next();
};