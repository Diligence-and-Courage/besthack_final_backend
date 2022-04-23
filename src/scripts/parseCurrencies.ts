import axios from 'axios';
import dotenv from 'dotenv';

import { CurrencyInfo } from '../models';
import { insertCurrencyInfo } from '../pkg/currency/repository';
import { camelize } from '../utils';
// import { camelize } from '../utils';

(async () => {
  dotenv.config();
  const { data } = await axios.get<Record<string, any>>(
    'https://v2.api.forex/infos/currencies.json',
  );

  const curCodes = process.env.CURRENCIES.split(',');
  const promises = [];

  curCodes.forEach((curCode) => {
    promises.push(insertCurrencyInfo(camelize(data[curCode]) as CurrencyInfo));
  });

  Promise.all(promises)
    .then(() => console.log('Currency info insert successfully'))
    .catch((err) => {
      console.log(`Failed to get currency info: ${err}`);
    });
})();
