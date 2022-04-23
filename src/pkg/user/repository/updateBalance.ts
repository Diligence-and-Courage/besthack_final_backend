import { pool } from '../../../database/pool';
import { UserInfo } from '../../../models';
import { camelize } from '../../../utils';

const query =
  'update users set balance = $1 where id = $2 returning id, email, first_name, last_name, balance, is_blocked, attempts';

export const updateBalance = async (
  userId: number,
  newBalance: number,
): Promise<UserInfo | null> => {
  const { rows, rowCount } = await pool.query(query, [newBalance, userId]);

  return rowCount ? (camelize(rows) as UserInfo) : null;
};
