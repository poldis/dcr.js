import { DcrCache } from '../../cache/index';
import { DbGuild } from './types/guild';
import type { Snowflake } from 'discord-api-types/globals';

import { DcrApi } from '../../api';
import { BASE_API_URL } from '../../utils/constants';
import { ApiResponse } from '../../api/types/others';

export default class Guild {
	constructor(
		private cache: DcrCache,
		API_KEY: string,
		data: DbGuild
	) {
		this.cache = cache;
		for (const [key, value] of Object.entries(data)) {
			this[key] = value;
		}
		this.api = new DcrApi(BASE_API_URL, API_KEY);
	}
	private api: DcrApi;

	public id: number;
	public guildId: Snowflake;
	public lang: string;
	public premium: number;
	public reviveMsgs: number;
	public cmdsUsed: number;
	public maxRevs: number;

	public async cmdUsed(cmdName: string): Promise<void> {
		await this.increaseCmdCount();
		await this.cache.db.query(
			`UPDATE stats SET uses = uses + 1 WHERE cmd = '${cmdName}'`
		);
	}
	public async increaseCmdCount(): Promise<DbGuild> {
		return await this.cache.set(
			'guild',
			this.guildId,
			`UPDATE server SET cmdsUsed = cmdsUsed + 1 WHERE guildId = '${this.guildId}'`
		);
	}
	public async increaseReviveMsgCount(): Promise<DbGuild> {
		return await this.cache.set(
			'guild',
			this.guildId,
			`UPDATE server SET reviveMsgs = reviveMsgs + 1 WHERE guildId = '${this.guildId}'`
		);
	}
	public async setLang(lang: string): Promise<DbGuild> {
		return await this.cache.set(
			'guild',
			this.guildId,
			`UPDATE server SET lang = '${lang}' WHERE guildId = '${this.guildId}'`
		);
	}
	public async setPremium(premium: boolean): Promise<DbGuild> {
		return await this.cache.set(
			'guild',
			this.guildId,
			`UPDATE server SET premium = '${premium ? 1 : 0}' WHERE guildId = '${this.guildId}'`
		);
	}
	public async clear(): Promise<ApiResponse> {
		return await this.api.endpoints.clear(this.guildId);
	}
}
