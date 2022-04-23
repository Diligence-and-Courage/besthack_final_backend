import Router from 'express';

import { api } from '../../api';
import { generateRouterPaths } from '../../api/generateRouterPaths';

const newsRouter = Router();

const {
  news: { paths },
} = api;

generateRouterPaths(paths, newsRouter);

export default newsRouter;
