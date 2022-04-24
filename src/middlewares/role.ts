import { NextFunction, Request, Response } from 'express';

import { AppResponse, Role } from '../models';
import { selectUserById } from '../pkg/user/repository';
import { getCookieUserId } from '../utils';

export const roleMiddleware =
  // eslint-disable-next-line consistent-return
  (allowedRoles: Role[]) => async (req: Request, resp: Response, next: NextFunction) => {
    const userId = getCookieUserId(req);
    if (!userId) {
      return resp.status(401).send(<AppResponse<never>>{
        errors: ['User not authorised'],
      });
    }

    const user = await selectUserById(userId);

    if (!allowedRoles.includes(user.role)) {
      return resp.status(403).send(<AppResponse<never>>{
        errors: ['Permission denied'],
      });
    }

    next();
  };
