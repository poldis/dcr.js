import { DcrCache } from 'dcr-cache';
import { BaseClient, Topic } from './interfaces/others';
import Guilds from './structures/Guilds';
import Users from './structures/Users';
import Revives from './structures/Revives';
import type { Pool } from "mysql";
import type Redis from "ioredis";

export default class Client implements BaseClient {
	constructor(redis: Redis, db: Pool) {
		if (!redis || !db) throw new Error("Invalid parameters passed to DcrCache constructor");
		this.redis = redis;
		this.pool = db;
		this.cache = new DcrCache(redis, db);
		this.guilds = new Guilds(this.cache);
		this.users = new Users(this.cache);
		this.revives = new Revives(this.cache)
	}

	public pool: Pool;
	public redis: Redis;
	public cache: DcrCache;

	public guilds: Guilds;
	public users: Users;
	public revives: Revives;
}