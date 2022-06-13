import type { Pool } from "mysql";
import type Redis from "ioredis";

import Guilds from '../structures/Guilds';
import Users from '../structures/Users';
import DcrCache from 'dcr-cache';

export interface BaseInterface {
	id: Number,
}

export interface BaseClient {
	pool: Pool,
	redis: Redis,
	cache: DcrCache,
	guilds: Guilds,
	users: Users,
}

export interface Topic extends BaseInterface {
	groupId: Number,
	content: String,
}

export interface getOptions {
	all?: boolean,
	force?: boolean,
	update?: boolean,
}