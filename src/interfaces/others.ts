import { DcrCache } from '../cache/index';
import type { Pool } from "mysql";
import type Redis from "ioredis";

import GuildManager from '../structures/manager/GuildManager';
import UserManager from '../structures/manager/UserManager';
import ReviveManager from '../structures/manager/ReviveManager';

export interface BaseInterface {
	id: Number | null,
}

export interface BaseClient {
	pool: Pool,
	redis: Redis,
	cache: DcrCache,
	guilds: GuildManager,
	users: UserManager,
	revives: ReviveManager,
}

export interface Topic extends BaseInterface {
	groupId: Number,
	content: String,
}

export interface getOptions {
	update?: Boolean,
	force?: Boolean,
	customKey?: String | Boolean,
	customWhere?: String | Boolean,
}

export interface Error {
	success: boolean;
	message?: string;
	msg?: string;
	code?: number;
}

export interface getQueryReturn {
	query: String,
	db: String,
	key: String,
}