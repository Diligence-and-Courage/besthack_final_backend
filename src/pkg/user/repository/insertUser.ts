import { pool } from '../../../database/pool';
import { CreateUserInfo, UserInfo } from '../../../models';
import { camelize, logger } from '../../../utils';

const insertQuery =
  'insert into users (email, password) values ($1, $2) returning id, email, role, balance';

export const insertUser = async (user: CreateUserInfo): Promise<null | UserInfo> => {
  try {
    const { rows } = await pool.query(insertQuery, [user.email, user.password]);
    return camelize(rows[0]) as UserInfo;
  } catch (e) {
    logger.error(`User insert into DB error: ${e.message}`);
    return null;
  }
};
