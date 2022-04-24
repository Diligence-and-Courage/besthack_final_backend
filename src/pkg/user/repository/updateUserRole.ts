import { pool } from '../../../database/pool';
import { Role } from '../../../models';

const query = `update users
               set role = $1
               where id = $2`;

export const updateUserRole = async (userId: number, newRole: Role) => {
  await pool.query(query, [newRole, userId]);
};
