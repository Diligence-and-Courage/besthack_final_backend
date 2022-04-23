import { authMiddleware } from '../middlewares/auth';
import {
  getAllCurrencyInfo,
  getCurrencyInfo,
  getCurrencyInfoByCode,
  getCurrencyInfoValidation,
  getTimeSeries,
  timeSeriesValidator,
} from '../pkg/currency/usecase';
import {
  getNews,
  getNewsSources,
  updateNewsSources,
  updateNewsSourcesValidator,
} from '../pkg/news/usecase';
import {
  addBalance,
  addBalanceValidation,
  addUserCurrencies,
  authUser,
  authValidation,
  createUser,
  createUserValidation,
  getUser,
  getUserCurrencies,
  getUserCurrencyByCode,
  removeUserCurrencies,
  userCurrenciesValidation,
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
      // Получить акцию пользователя с кодом
      {
        url: '/currency/:code',
        method: 'get',
        middlewares: [authMiddleware],
        handler: getUserCurrencyByCode,
      },
      // Получить акции пользователя
      {
        url: '/currency',
        method: 'get',
        middlewares: [authMiddleware],
        handler: getUserCurrencies,
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
      // Обновить баланс
      {
        url: '/balance',
        method: 'post',
        middlewares: [authMiddleware, addBalanceValidation()],
        handler: addBalance,
      },
      // Добавить акции
      {
        url: '/currency',
        method: 'post',
        middlewares: [authMiddleware, userCurrenciesValidation()],
        handler: addUserCurrencies,
      },
      // Delete methods
      // Удалить акции
      {
        url: '/currency',
        method: 'delete',
        middlewares: [authMiddleware, userCurrenciesValidation()],
        handler: removeUserCurrencies,
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
