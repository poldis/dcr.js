import { DcrCache } from '../cache/index';
import { DcrApi } from '../api';

import GuildManager from './structures/manager/GuildManager';
import ReviveManager from './structures/manager/ReviveManager';
import UserManager from './structures/manager/UserManager';
import CustomManager from './structures/manager/CustomManager';

import type { Pool } from "mysql";
import type Redis from "ioredis";
import { BaseClient } from './structures/interfaces/others';

import { BASE_API_URL } from '../utils/constants';

export default class Client implements BaseClient {
	constructor(redis: Redis, db: Pool) {
		if (!redis || !db) throw new Error("Invalid parameters passed to dcr.js constructor");
		this.redis = redis;
		this.pool = db;
		this.cache = new DcrCache(redis, db);
		this.api = new DcrApi(BASE_API_URL);

		this.guilds = new GuildManager(this.cache);
		this.users = new UserManager(this.cache);
		this.revives = new ReviveManager(this.cache)
		this.customs = new CustomManager(this.cache)
	}

	public redis: Redis;
	public pool: Pool;
	public cache: DcrCache;
	public api: DcrApi;

	public guilds: GuildManager;
	public users: UserManager;
	public revives: ReviveManager;
	public customs: CustomManager;
}