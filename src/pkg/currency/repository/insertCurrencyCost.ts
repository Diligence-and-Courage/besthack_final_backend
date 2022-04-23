import { QueryResult } from 'pg';

import { pool } from '../../../database/pool';
import { CurrencyCost } from '../../../models';

const insertQuery =
  'insert into currency_cost (base_code, code, cost, change, percent_change) values ($1, $2, $3, $4, $5)';

const updateQuery =
  'update currency_cost set (cost, change, percent_change) = ($1, $2, $3) where base_code=$4 and code=$5';

export const insertCurrencyCost = ({
  baseCode,
  code,
  cost,
  change,
  percentChange,
}: CurrencyCost): Promise<QueryResult> =>
  pool.query(insertQuery, [baseCode, code, cost, change, percentChange]);

export const updateCurrencyCost = ({
  baseCode,
  code,
  cost,
  change,
  percentChange,
}: CurrencyCost): Promise<QueryResult> =>
  pool.query(updateQuery, [cost, change, percentChange, baseCode, code]);
