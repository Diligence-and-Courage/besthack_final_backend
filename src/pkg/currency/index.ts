import Router from 'express';

import { api } from '../../api';
import { generateRouterPaths } from '../../api/generateRouterPaths';

const currencyRouter = Router();

const {
  currency: { paths },
} = api;

generateRouterPaths(paths, currencyRouter);

export default currencyRouter;
