import { Snowflake } from 'discord-api-types/globals';
import { DcrCache } from '../../cache/index';
import { DbUser } from './types/user';

export default class User {
	constructor(
		private cache: DcrCache,
		data: DbUser
	) {
		this.cache = cache;
		for (const [key, value] of Object.entries(data)) {
			this[key] = value;
		}
	}
	public id: number;
	public discordId: Snowflake;
	public email: string;
	public autoJoin: number;
	public timezone: number;

	public async set(
		email: string,
		autoJoin: number,
		timezone: number
	): Promise<DbUser | null> {
		await this.setEmail(email);
		await this.setAutoJoin(autoJoin);
		return await this.setTimezone(timezone);
	}
	public async setSettings(
		autoJoin: number,
		timezone: number
	): Promise<DbUser | null> {
		await this.setAutoJoin(autoJoin);
		return await this.setTimezone(timezone);
	}
	public async setEmail(email: string): Promise<DbUser | null> {
		return await this.cache.set(
			'user',
			this.discordId,
			`UPDATE users SET email = '${email}' WHERE id = ${this.id}`
		);
	}
	public async setAutoJoin(autoJoin: number): Promise<DbUser | null> {
		return await this.cache.set(
			'user',
			this.discordId,
			`UPDATE users SET autoJoin = '${autoJoin}' WHERE id = ${this.id}`
		);
	}
	public async setTimezone(timezone: number): Promise<DbUser | null> {
		return await this.cache.set(
			'user',
			this.discordId,
			`UPDATE users SET timezone = '${timezone}' WHERE id = ${this.id}`
		);
	}
}
