import { getOptions, getQueryReturn } from '../client/structures/types/others';
import get from './methods/get';
import set from './methods/set';
import del from './methods/delete';
import type { Pool } from 'mysql';
import type Redis from 'ioredis';

export class DcrCache {
	constructor(redis: Redis, db: Pool) {
		if (!redis || !db)
			throw new Error(
				'Invalid parameters passed to DcrCache constructor'
			);
		this.redis = redis;
		this.db = db;

		this.get = get.bind(this);
		this.set = set.bind(this);
		this.del = del.bind(this);
	}

	public redis: Redis;
	public db: Pool;

	public get:
		| ((
				type: string,
				identifier: number | string,
				options?: getOptions
		  ) => Promise<any>) // eslint-disable-line @typescript-eslint/no-explicit-any
		| null;
	public set:
		| ((
				type: string,
				identifier: number | string,
				query: string,
				params?: Array<string>
		  ) => Promise<any>) // eslint-disable-line @typescript-eslint/no-explicit-any
		| null;
	public del:
		| ((
				type: string,
				identifier: number | string,
				options?: getOptions
		  ) => Promise<boolean>)
		| null;

	private getQuery(
		type: string,
		identifier: string,
		customKey: string | boolean,
		customWhere: string | boolean
	): getQueryReturn {
		let query: string = '';
		let db: string = '';
		let key: string = '';
		switch (type) {
			case 'revive':
				db = 'revives';
				key = 'channelId';
				break;
			case 'guild':
				db = 'server';
				key = 'guildId';
				break;
			case 'custom':
				db = 'custom';
				key = 'reviveId';
				break;
			case 'user':
				db = 'users';
				key = 'discordId';
				break;
			default:
				db = type;
				key = 'id';
				break;
		}
		if (customWhere) query = `SELECT * FROM ${db} ${customWhere}`;
		if (!customWhere && customKey)
			query = `SELECT * FROM ${db} WHERE ${customKey} = '${identifier}'`;
		if (!customWhere && !customKey)
			query = `SELECT * FROM ${db} WHERE ${key} = '${identifier}'`;
		return {
			query,
			db,
			key,
		};
	}
}
