import { getOptions } from '../../interfaces/others';
import { DbRevive } from '../../interfaces/revive';

import { DcrCache } from '../../cache/index';
import Revive from '../Revive';


export default class ReviveManager {
	constructor(private cache: DcrCache) {
		this.cache = cache;
	}
	public async get(id: String | Number, options: getOptions): Promise<Revive> {
		const reqOpts = {
			force: options?.force || false,
			update: options?.update || true,
		}
		// if (options?.all) return await this.cache.getAll('revive', "channelId", reqOpts);
		if (!id) throw new Error("ReviveManager.get() was run without an id provided.");

		const data: DbRevive = await this.cache.get('revive', id, reqOpts);
		return new Revive(this.cache, data);
	}
	public async del(id: String | Number, options: getOptions): Promise<Boolean> {
		if (id) return await this.cache.del('revive', id, options);
		throw new Error("ReviveManager.del() was run without an id provided.");
	}
	public async new(data: DbRevive, options: getOptions): Promise<DbRevive> {
		return await this.cache.set("revive", data.channelId, `INSERT INTO revives VALUES ('${data.id}', '${data.guildId}', '${data.channelId}', '${data.role}', ${data.time}, ${data.last}, '${data.timezone}', '${data.schedule}', ${data.night}, ${data.lastMsgTime}, ${data.custom}, ${data.buttons})`, options);
	}
}