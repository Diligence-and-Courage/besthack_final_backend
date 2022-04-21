import type { Router } from 'express';

import type { Path } from './types';

export const generateRouterPaths = (paths: Path[], router: Router) => {
  paths.forEach(({ method, url, middlewares, handler }) => {
    router[method](url, ...middlewares, handler);
  });
};
