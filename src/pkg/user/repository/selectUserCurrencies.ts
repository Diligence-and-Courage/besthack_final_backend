import { pool } from '../../../database/pool';
import { UserCurrency } from '../../../models';
import { camelize } from '../../../utils';

const baseQuery = `select currency_code,
                          name,
                          symbol,
                          country_name,
                          country_code,
                          cost,
                          change,
                          percent_change,
                          count
                   from currency_info ci
                            join users_currencies uc on ci.currency_code = uc.code
                            join currency_cost cc on uc.code = cc.base_code
                   where cc.code = 'RUB'`;

const selectByIdQuery = `${baseQuery} and user_id = $1`;
const selectBySymbolAndId = `${baseQuery} and user_id = $1 and currency_code = $2`;

export const selectUserCurrenciesById = async (
  userId: number | undefined,
): Promise<UserCurrency[]> => {
  if (!userId) {
    return null;
  }

  const { rows } = await pool.query(selectByIdQuery, [userId]);
  return camelize(rows) as UserCurrency[];
};

export const selectUserCurrencyByCodeAndId = async (
  symbol: string,
  userId: number | undefined,
): Promise<UserCurrency> => {
  if (!userId) {
    return null;
  }
  const { rows, rowCount } = await pool.query(selectBySymbolAndId, [userId, symbol]);
  return rowCount ? (camelize(rows[0]) as UserCurrency) : null;
};
