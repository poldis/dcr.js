import { getOptions, getQueryReturn } from "../interfaces/others";
import get from "./methods/get";
import set from "./methods/set";
import del from "./methods/delete";
import type { Pool } from "mysql";
import type Redis from "ioredis";

export class DcrCache {
	constructor(redis: Redis, db: Pool) {
		if (!redis || !db) throw new Error("Invalid parameters passed to DcrCache constructor");
		this.redis = redis;
		this.db = db;

		this.get = get.bind(this);
		this.set = set.bind(this);
		this.del = del.bind(this);
	}
	
	public redis: Redis;
	public db: Pool;
	public get: Function | null;
	public set: Function | null;
	public del: Function | null;

	private getQuery(type: String, identifier: String, customKey: String | Boolean, customWhere: String | Boolean): getQueryReturn {
		let query: String = "";
		let db: String = "";
		let key: String = "";
		switch (type) {
			case "revive":
				db = "revives";
				key = "channelId";
				break;
			case "guild":
				db = "server";
				key = "guildId"
				break;
			default:
				db = type;
				key = "id";
				break;
		}
		if (customWhere) query = `SELECT * FROM ${db} ${customWhere}`;
		if (!customWhere && customKey) query = `SELECT * FROM ${db} WHERE ${customKey} = '${identifier}'`;
		if (!customWhere && !customKey) query = `SELECT * FROM ${db} WHERE ${key} = '${identifier}'`;
		return {
			query,
			db,
			key,
		};
	}
}