import { pool } from '../../../database/pool';
import { UpdateDomainsEnabledRequest } from '../../../models';

const query = 'update domains_enabled set is_enabled = $1 where domain = $2';

export const updateDomainsEnabled = async ({ domain, enabled }: UpdateDomainsEnabledRequest) => {
  await pool.query(query, [enabled, domain]);
};
