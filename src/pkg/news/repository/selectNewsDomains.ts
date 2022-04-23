import { pool } from '../../../database/pool';
import { NewsDomains } from '../../../models';
import { camelize } from '../../../utils';

const query = 'select domain, is_enabled from domains_enabled where is_enabled = true;';

export const selectNewsDomains = async (): Promise<NewsDomains[]> => {
  const { rows } = await pool.query(query);

  return camelize(rows) as NewsDomains[];
};
