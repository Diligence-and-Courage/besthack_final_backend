import { authMiddleware } from '../middlewares/auth';
import { sendHello } from '../pkg/hello/usecase';
import {
  authUser,
  authValidation,
  createUser,
  createUserValidation,
  getUser,
} from '../pkg/user/usecase';
import { Api } from './types';

export const api: Api = {
  hello: {
    prefix: '/hello',
    paths: [{ url: '/', handler: sendHello, middlewares: [authMiddleware], method: 'get' }],
  },
  user: {
    prefix: '/user',
    paths: [
      // Get methods
      {
        // Получить пользователя
        url: '/',
        method: 'get',
        middlewares: [authMiddleware],
        handler: getUser,
      },
      // Post methods
      // Войти
      {
        url: '/login',
        method: 'post',
        middlewares: [authValidation()],
        handler: authUser,
      },
      // Зарегистрироваться
      {
        url: '/register',
        method: 'post',
        middlewares: [createUserValidation()],
        handler: createUser,
      },
    ],
  },
};
