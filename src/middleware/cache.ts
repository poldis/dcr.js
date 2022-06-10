import { DcrCache } from 'dcr-cache';

import { redis, pool } from './config';

export default new DcrCache({ redis, db: pool });