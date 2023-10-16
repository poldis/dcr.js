import { Snowflake } from 'discord-api-types/globals';
import { DcrCache } from '../../cache/index';
import { DbUser } from "./interfaces/user";

export default class User {
	constructor(private cache: DcrCache, data: DbUser) {
		this.cache = cache;
		for (const [key, value] of Object.entries(data)) {
			this[key] = value;
		}
	}
	public id: Number;
	public discordId: Snowflake;
	public email: String;
	public autoJoin: Number;
	public timezone: Number;

	public async set(email: String, autoJoin: Number, timezone: Number): Promise<DbUser | null> {
		await this.setEmail(email);
		await this.setAutoJoin(autoJoin);
		return await this.setTimezone(timezone);
	}
	public async setSettings(autoJoin: Number, timezone: Number): Promise<DbUser | null> {
		await this.setAutoJoin(autoJoin);
		return await this.setTimezone(timezone);
	}
	public async setEmail(email: String): Promise<DbUser | null> {
		return await this.cache.set('user', this.discordId, `UPDATE users SET email = '${email}' WHERE id = ${this.id}`);
	}
	public async setAutoJoin(autoJoin: Number): Promise<DbUser | null> {
		return await this.cache.set('user', this.discordId, `UPDATE users SET autoJoin = '${autoJoin}' WHERE id = ${this.id}`);
	}
	public async setTimezone(timezone: Number): Promise<DbUser | null> {
		return await this.cache.set('user', this.discordId, `UPDATE users SET timezone = '${timezone}' WHERE id = ${this.id}`);
	}
}