import { DcrCache } from '../cache/index';
import { DbGuild } from "../interfaces/guild";
import type { Snowflake } from 'discord-api-types/globals';

export default class Guild {
	constructor(private cache: DcrCache, data: DbGuild) {
		this.cache = cache;
		for (const [key, value] of Object.entries(data)) {
			this[key] = value;
		}
	}
	public id: Number;
	public guildId: Snowflake;
	public lang: String;
	public premium: Number;
	public reviveMsgs: Number;
	public cmdsUsed: Number;
	public maxRevs: Number;

	public async cmdUsed(cmdName: String): Promise<void> {
		await this.increaseCmdCount();
		await this.cache.db.query(`UPDATE stats SET uses = uses + 1 WHERE cmd = '${cmdName}'`);
	}
	public async increaseCmdCount(): Promise<DbGuild> {
		return await this.cache.set('guild', this.guildId, `UPDATE server SET cmdsUsed = cmdsUsed + 1 WHERE guildId = '${this.guildId}'`);
	}
	public async increaseReviveMsgCount(): Promise<DbGuild> {
		return await this.cache.set('guild', this.guildId, `UPDATE server SET reviveMsgs = reviveMsgs + 1 WHERE guildId = '${this.guildId}'`);
	}
	public async setLang(lang: String): Promise<DbGuild> {
		return await this.cache.set('guild', this.guildId, `UPDATE server SET lang = '${lang}' WHERE guildId = '${this.guildId}'`);
	}
	public async setPremium(premium: Boolean): Promise<DbGuild> {
		return await this.cache.set('guild', this.guildId, `UPDATE server SET premium = '${premium ? 1 : 0}' WHERE guildId = '${this.guildId}'`);
	}
}