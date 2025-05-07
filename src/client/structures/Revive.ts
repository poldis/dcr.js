import { DbRevive } from './types/revive';
import { DbGuild } from './types/guild';
import { Error, getOptions } from './types/others';
import type { Snowflake } from 'discord-api-types/globals';

import { DcrCache } from '../../cache/index';
import Guild from './Guild';

export default class Revive {
	constructor(
		private cache: DcrCache,
		private API_KEY,
		private data: DbRevive
	) {
		this.cache = cache;
		this.data = data;
		for (const [key, value] of Object.entries(data)) {
			this[key] = value;
		}
	}
	public id: number;
	public guildId: Snowflake;
	public channelId: Snowflake;
	public role: null | Snowflake;
	public time: number;
	public last: number;
	public timezone: number;
	public schedule: string;
	public night: null | string;
	public lastMsgTime: string;

	public async reviveSent(): Promise<DbRevive | null> {
		await this.cache.pool.query(
			`UPDATE stats SET uses = uses + 1 WHERE cmd = 'reviveMsgs'`
		);
		const data: DbGuild = await this.cache.get('guild', this.guildId);
		if (!data) return null;
		const guild = new Guild(this.cache, this.API_KEY, data);
		await guild.increaseReviveMsgCount();
		return await this.cache.set(
			'revive',
			this.channelId,
			`UPDATE revives SET last = ${Date.now()} WHERE channelId = ${this.channelId}`
		);
	}
	public async setRole(role: Snowflake): Promise<DbRevive | null> {
		return await this.cache.set(
			'revive',
			this.channelId,
			`UPDATE revives SET role = ${role} WHERE channelId = ${this.channelId}`
		);
	}
	public async setTime(time: number): Promise<DbRevive | null | Error> {
		if ((time < 5400000 || time > 604800000) && this.role)
			return { success: false, code: 3112 };

		if (time < 3600000 || time > 604800000)
			return { success: false, code: 3111 };

		return await this.cache.set(
			'revive',
			this.channelId,
			`UPDATE revives SET time = ${time} WHERE channelId = ${this.channelId}`
		);
	}
	public async setNight(
		enable: boolean,
		{ timezone = '+0', schedule = '8-8' }
	): Promise<DbRevive | null> {
		return await this.cache.set(
			'revive',
			this.channelId,
			`UPDATE revives SET night = ${enable ? 1 : 0}, timezone = '${timezone}', schedule = '${schedule}' WHERE channelId = '${this.channelId}'`
		);
	}
	public async setLastMsgTime(time: number): Promise<DbRevive | null> {
		return await this.cache.set(
			'revive',
			this.channelId,
			`UPDATE revives SET lastMsgTime = '${time}' WHERE channelId = '${this.channelId}'`
		);
	}
	public async edit(data: Partial<DbRevive>): Promise<DbRevive> {
		return await this.cache.set(
			'revive',
			data.channelId,
			`UPDATE revives SET 
		role = '${data.role}', 
		time = ${data.time}, 
		timezone = '${data.timezone}', 
		schedule = '${data.schedule}', 
		night = ${data.night} WHERE channelId = '${this.channelId}'`
		);
	}
	public async delete(options: getOptions): Promise<boolean> {
		return await this.cache.del('revive', this.channelId, options);
	}
}
