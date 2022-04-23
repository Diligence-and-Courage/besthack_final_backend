import { Request, Response } from 'express';
import { query, validationResult } from 'express-validator';

import { AppResponse, TimeSeriesRequest, TimeSeriesValues } from '../../../models';
import { getApiTimeSeries } from '../repository/getApiTimeseries';

export const timeSeriesValidator = () => [
  query('duration')
    .exists()
    .isString()
    .custom((value) => {
      if (value !== '10m' && value !== '30m' && value !== '1h' && value !== '4h') {
        throw new Error('Invalid duration');
      }

      return true;
    }),
  query('code')
    .exists()
    .isString()
    .custom((value) => {
      if (!process.env.CURRENCIES.split(',').includes(value)) {
        throw new Error(`Invalid currency value: supported: ${process.env.CURRENCIES}`);
      }

      return true;
    }),
  query('base')
    .exists()
    .isString()
    .custom((value) => {
      if (!process.env.CURRENCIES.split(',').includes(value)) {
        throw new Error(`Invalid currency value: supported: ${process.env.CURRENCIES}`);
      }

      return true;
    }),
];

export const getTimeSeries = async (
  req: Request<any, any, any, TimeSeriesRequest>,
  resp: Response,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp.status(400).send(<AppResponse<never>>{
      errors: errors.array(),
    });
  }

  const data = await getApiTimeSeries(req.query);
  return resp.send(<AppResponse<TimeSeriesValues[]>>{
    data,
  });
};
