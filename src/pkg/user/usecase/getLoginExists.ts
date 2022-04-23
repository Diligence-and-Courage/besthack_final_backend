import { Request, Response } from 'express';
import { query, validationResult } from 'express-validator';

import { AppResponse } from '../../../models';
import { selectUserByEmail } from '../repository';

export const loginExistsValidator = () => [query('login').exists().isString()];

export const getLoginExists = async (
  req: Request<any, any, any, { login: string }>,
  resp: Response,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp.status(400).send(<AppResponse<never>>{
      errors: errors.array(),
    });
  }

  const user = await selectUserByEmail(req.query.login);
  if (!user) {
    return resp.send(<AppResponse<{ exists: boolean }>>{
      data: { exists: false },
    });
  }

  return resp.send(<AppResponse<{ exists: boolean }>>{
    data: { exists: true },
  });
};
