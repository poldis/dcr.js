import { DcrCache } from './cache/index';
import { BaseClient } from './interfaces/others';

import GuildManager from './structures/manager/GuildManager';
import ReviveManager from './structures/manager/ReviveManager';
import UserManager from './structures/manager/UserManager';

import type { Pool } from "mysql";
import type Redis from "ioredis";
import CustomManager from './structures/manager/CustomManger';

export default class Client implements BaseClient {
	constructor(redis: Redis, db: Pool) {
		if (!redis || !db) throw new Error("Invalid parameters passed to dcr.js constructor");
		this.redis = redis;
		this.pool = db;
		this.cache = new DcrCache(redis, db);
		this.guilds = new GuildManager(this.cache);
		this.users = new UserManager(this.cache);
		this.revives = new ReviveManager(this.cache)
		this.customs = new CustomManager(this.cache)
	}

	public pool: Pool;
	public redis: Redis;
	public cache: DcrCache;

	public guilds: GuildManager;
	public users: UserManager;
	public revives: ReviveManager;
	public customs: CustomManager;
}