import { pool } from '../../../database/pool';
import { selectUserById } from './selectUser';

const query = `update users
               set (attempts, is_blocked) = ($1, $2)
               where id = $3
               returning id, email, balance, is_blocked, attempts`;

const resetQuery = `update users
                    set (attempts, is_blocked) = (0, false)
                    where id = $1
                    returning id, email, balance, is_blocked, attempts`;

export const updateUserIsBlocked = async (userId: number) => {
  const user = await selectUserById(userId);

  if (user.attempts + 1 === 5) {
    await pool.query(query, [5, true, userId]);
  } else {
    await pool.query(query, [user.attempts + 1, false, userId]);
  }
};

export const resetUserIsBlocked = async (userId: number) => {
  await pool.query(resetQuery, [userId]);
};
