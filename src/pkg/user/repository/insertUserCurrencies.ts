import { pool } from '../../../database/pool';
import { UserCurrenciesAdd } from '../../../models';
import { logger } from '../../../utils';

const insertQuery =
  'insert into users_currencies (user_id, code, count)  values ($1, $2, $3) on conflict (user_id, code) ' +
  'do update set count=excluded.count + users_currencies.count returning count';

export const insertUserCurrencies = async ({
  userId,
  code,
  count,
}: UserCurrenciesAdd): Promise<null | number> => {
  try {
    const { rows } = await pool.query(insertQuery, [userId, code, count]);
    return rows[0].count;
  } catch (e) {
    logger.error(`UserCurrency insert into DB error: ${e.message}`);
    return null;
  }
};
