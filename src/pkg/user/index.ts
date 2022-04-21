import Router from 'express';

import { api } from '../../api';
import { generateRouterPaths } from '../../api/generateRouterPaths';

const userRouter = Router();

const {
  user: { paths },
} = api;

generateRouterPaths(paths, userRouter);

export default userRouter;
