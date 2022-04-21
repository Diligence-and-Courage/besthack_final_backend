import router from 'express';

import { api } from '../../api';
import { generateRouterPaths } from '../../api/generateRouterPaths';

const helloHandler = router();

const {
  hello: { paths },
} = api;

generateRouterPaths(paths, helloHandler);

export default helloHandler;
