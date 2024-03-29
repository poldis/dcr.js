import { getOptions } from '../../interfaces/others';
import { DbGuild } from "../../interfaces/guild";

import { DcrCache } from '../../cache/index';
import Guild from '../Guild';

export default class GuildManager {
	constructor(private cache: DcrCache) {
		this.cache = cache;
	}
	public async get(id: String | Number, options: getOptions): Promise<Guild> {
		const reqOpts = {
			force: options?.force || false,
			update: options?.update || true,
		}
		// if (options?.all) return await this.cache.getAll('guild', "guildId", reqOpts);
		if (!id) return null;
		
		const data: DbGuild = await this.cache.get('guild', id, reqOpts);
		if (!data) return null;
		return new Guild(this.cache, data);
	}
	public async del(id: String | Number, options: getOptions): Promise<Boolean> {
		if (id) return await this.cache.del('guild', id, options);
		return null;
	}
	public async new(data: DbGuild, options: getOptions): Promise<DbGuild> {
		return await this.cache.set("guild", data.guildId, `INSERT INTO server VALUES (${data.id}, '${data.guildId}', '${data.lang}', '${data.premium}', ${data.reviveMsgs}, ${data.cmdsUsed}, ${data.maxRevs})`, options);
	}
}