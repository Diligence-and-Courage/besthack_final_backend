import { pool } from '../../../database/pool';
import { Code } from '../../../models';
import { logger } from '../../../utils';

const deleteQuery = 'delete from users_currencies where user_id = $1 and code = $2';

export const deleteUserCurrencies = async (code: Code, userId: number): Promise<boolean> => {
  try {
    await pool.query(deleteQuery, [userId, code]);
    return true;
  } catch (e) {
    logger.error(`Error while deleting userStocks: ${e.message}`);
    return false;
  }
};
