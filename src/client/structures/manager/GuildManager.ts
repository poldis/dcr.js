import { getOptions } from '../types/others';
import { DbGuild } from '../types/guild';

import { DcrCache } from '../../../cache/index';
import Guild from '../Guild';

export default class GuildManager {
	constructor(
		private cache: DcrCache,
		private API_KEY: string
	) {
		this.cache = cache;
	}
	public async get(id: string | number, options: getOptions): Promise<Guild> {
		const reqOpts = {
			force: options?.force || false,
			update: options?.update || true,
		};
		// if (options?.all) return await this.cache.getAll('guild', "guildId", reqOpts);
		if (!id) return null;

		const data: DbGuild = await this.cache.get('guild', id, reqOpts);
		if (!data) return null;
		return new Guild(this.cache, this.API_KEY, data);
	}
	public async del(
		id: string | number,
		options: getOptions
	): Promise<boolean> {
		if (id) return await this.cache.del('guild', id, options);
		return null;
	}
	public async new(data: DbGuild, options: getOptions): Promise<DbGuild> {
		return await this.cache.set(
			'guild',
			data.guildId,
			`INSERT INTO server VALUES (${data.id}, '${data.guildId}', '${data.lang}', '${data.premium}', ${data.reviveMsgs}, ${data.cmdsUsed}, ${data.maxRevs})`,
			options
		);
	}
}
