import { pool } from '../../../database/pool';
import { Code, CurrencyInfo } from '../../../models';
import { camelize } from '../../../utils';

const query = 'select * from currency_info';
const queryByCode = 'select * from currency_info where code=$1';

export const selectCurrencyInfo = async (): Promise<CurrencyInfo[]> => {
  const { rows } = await pool.query(query);

  return camelize(rows) as CurrencyInfo[];
};

export const selectCurrencyInfoByCode = async (code: Code): Promise<CurrencyInfo | null> => {
  const { rows, rowCount } = await pool.query(queryByCode, [code]);

  return rowCount ? (camelize(rows[0]) as CurrencyInfo) : null;
};
