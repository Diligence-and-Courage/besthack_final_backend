import axios from 'axios';
import { sub } from 'date-fns';
import dotenv from 'dotenv';

import { Code } from '../models';
import { insertCurrencyCost, updateCurrencyCost } from '../pkg/currency/repository';
import { camelize } from '../utils';
import { toISODate } from '../utils/dateFormats';

type Cost = {
  startRate: number;
  endRate: number;
  change: number;
  changePct: number;
};

type Resp = {
  rates: Record<Code, Cost>;
};

(async () => {
  dotenv.config();

  const query = `https://api.exchangerate.host/fluctuation?start_date=${toISODate(
    sub(Date.now(), { days: 1 }),
  )}&end_date=${toISODate(Date.now())}&symbols=${process.env.CURRENCIES}`;

  const curCodes = process.env.CURRENCIES.split(',');
  const promises = [];
  curCodes.forEach((code) => {
    axios.get<Resp>(`${query}&base=${code}`).then(({ data: { rates } }) => {
      curCodes.forEach((queryCode) => {
        const { endRate, change, changePct } = camelize(rates[queryCode]) as Cost;
        const data = {
          baseCode: code,
          code: queryCode,
          cost: endRate,
          change,
          percentChange: changePct,
        };

        promises.push(insertCurrencyCost(data).catch(() => updateCurrencyCost(data)));
      });
    });
  });

  Promise.all(promises)
    .then(() => console.log('Currency updated successfully'))
    .catch((err) => console.log(`Currency update error: ${err}`));
})();
