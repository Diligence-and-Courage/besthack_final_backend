import { pool } from '../../../database/pool';
import { Domain } from './getNewsFromApi';

const query = 'select domain from domains_enabled where is_enabled = true;';

export const selectNewsDomains = async (): Promise<Domain[]> => {
  const { rows } = await pool.query(query);

  const typedRows = rows as { domain: Domain }[];

  return typedRows.map((row) => row.domain);
};
