import { Request, Response } from 'express';

import { AppResponse } from '../../../models';

export const logoutUser = async (req: Request, resp: Response) => {
  resp.clearCookie('auth');

  return resp.send(<AppResponse<boolean>>{
    data: true,
  });
};
