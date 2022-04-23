import { pool } from '../../../database/pool';
import { Code, CurrencyCost } from '../../../models';
import { camelize } from '../../../utils';

const query = 'select * from currency_cost  where code=$1';

export const selectCurrencyCost = async (code: Code) => {
  const { rows } = await pool.query(query, [code]);

  return camelize(rows) as CurrencyCost[];
};
