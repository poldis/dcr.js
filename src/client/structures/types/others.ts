import { DcrCache } from '../../../cache/index';
import { DcrApi } from '../../../api/index';
import type { Pool } from 'mysql';
import type Redis from 'ioredis';

import GuildManager from '../manager/GuildManager';
import UserManager from '../manager/UserManager';
import ReviveManager from '../manager/ReviveManager';

export interface BaseInterface {
	id: number | null;
}

export interface BaseClient {
	pool: Pool;
	redis: Redis;
	cache: DcrCache;
	api: DcrApi;
	guilds: GuildManager;
	users: UserManager;
	revives: ReviveManager;
}

export interface Topic extends BaseInterface {
	groupId: number;
	content: string;
}

export interface getOptions {
	update?: boolean;
	force?: boolean;
	customKey?: string | boolean;
	customWhere?: string | boolean;
}

export interface Error {
	success: boolean;
	message?: string;
	msg?: string;
	code?: number;
}

export interface getQueryReturn {
	query: string;
	db: string;
	key: string;
}
