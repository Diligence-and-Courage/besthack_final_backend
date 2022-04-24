import { formatISO } from 'date-fns';

import { pool } from '../database/pool';
import { AddHistory } from '../models/History';

const query = `insert into history (ip, time, user_info, action)
               values ($1, $2, $3, $4)`;

export const logHistory = async ({ ip, userInfo, actions }: AddHistory) => {
  await pool.query(query, [ip, formatISO(Date.now()), userInfo, actions]);
};
