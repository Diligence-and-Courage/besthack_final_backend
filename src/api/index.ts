import { authMiddleware } from '../middlewares/auth';
import {
  getAllCurrencyInfo,
  getCurrencyInfo,
  getCurrencyInfoByCode,
  getCurrencyInfoValidation,
} from '../pkg/currency/usecase';
import { getTimeSeries, timeSeriesValidator } from '../pkg/currency/usecase/getTimeSeries';
import {
  getNews,
  getNewsSources,
  updateNewsSources,
  updateNewsSourcesValidator,
} from '../pkg/news/usecase';
import {
  authUser,
  authValidation,
  createUser,
  createUserValidation,
  getUser,
} from '../pkg/user/usecase';
import { Api } from './types';

export const api: Api = {
  news: {
    prefix: '/news',
    paths: [
      { url: '/', handler: getNews, middlewares: [], method: 'get' },
      {
        url: '/sources',
        method: 'get',
        handler: getNewsSources,
        middlewares: [],
      },
      {
        url: '/sources',
        method: 'put',
        handler: updateNewsSources,
        middlewares: [updateNewsSourcesValidator()],
      },
    ],
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
  currency: {
    prefix: '/currency',
    paths: [
      {
        url: '/info',
        method: 'get',
        middlewares: [getCurrencyInfoValidation()],
        handler: getCurrencyInfo,
      },
      { url: '/info/:code', method: 'get', middlewares: [], handler: getCurrencyInfoByCode },
      { url: '/all', method: 'get', middlewares: [], handler: getAllCurrencyInfo },
      {
        url: '/timeseries',
        method: 'get',
        middlewares: [timeSeriesValidator()],
        handler: getTimeSeries,
      },
    ],
  },
};
