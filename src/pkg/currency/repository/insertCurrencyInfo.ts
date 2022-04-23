import { pool } from '../../../database/pool';
import { CurrencyInfo } from '../../../models';

const query =
  'insert into currency_info (currency_code, name, symbol, country_code, country_name) values ($1, $2, $3, $4, $5)';

export const insertCurrencyInfo = async ({
  currencyCode,
  name,
  symbol,
  countryCode,
  countryName,
}: CurrencyInfo) => {
  await pool.query(query, [currencyCode, name, symbol, countryCode, countryName]);
};
