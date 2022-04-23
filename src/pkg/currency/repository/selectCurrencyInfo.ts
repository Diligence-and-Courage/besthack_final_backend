import { pool } from '../../../database/pool';
import { Code, CurrencyInfo, FullCurrencyInfo } from '../../../models';
import { camelize } from '../../../utils';

const query = 'select * from currency_info';
const queryByCode =
  'select currency_code, name, symbol, country_code, country_name, cost as cost_in_rub, change, percent_change ' +
  "from currency_info ci join currency_cost cc on ci.currency_code = cc.base_code where cc.code = 'RUB' and ci.currency_code = $1;";

export const selectCurrencyInfo = async (): Promise<CurrencyInfo[]> => {
  const { rows } = await pool.query(query);

  return camelize(rows) as CurrencyInfo[];
};

export const selectCurrencyInfoByCode = async (code: Code): Promise<FullCurrencyInfo | null> => {
  const { rows, rowCount } = await pool.query(queryByCode, [code]);

  return rowCount ? (camelize(rows[0]) as FullCurrencyInfo) : null;
};
