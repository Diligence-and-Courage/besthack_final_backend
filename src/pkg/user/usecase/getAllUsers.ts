import { Request, Response } from 'express';

import { AppResponse, UserInfo } from '../../../models';
import { decamelize } from '../../../utils';
import { selectAllUsersExceptCurrent } from '../repository';

export const getAllUsers = async (req: Request, resp: Response) => {
  const users = await selectAllUsersExceptCurrent(resp.locals.userId);

  resp.send(<AppResponse<UserInfo[]>>{
    data: decamelize(users),
  });
};
