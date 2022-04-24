import { pool } from '../../../database/pool';
import { UserInfo } from '../../../models';
import { camelize } from '../../../utils';

const query = `
    select id, email, role, balance, attempts, is_blocked
    from users
    where id != $1`;

export const selectAllUsersExceptCurrent = async (userId: number) => {
  const { rows } = await pool.query(query, [userId]);

  return camelize(rows) as UserInfo[];
};
