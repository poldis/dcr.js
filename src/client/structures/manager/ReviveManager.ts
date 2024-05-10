import { getOptions } from '../types/others';
import { DbRevive } from '../types/revive';

import { DcrCache } from '../../../cache/index';
import Revive from '../Revive';

export default class ReviveManager {
	constructor(
		private cache: DcrCache,
		private API_KEY
	) {
		this.cache = cache;
	}
	public async get(
		id: string | number,
		options: getOptions
	): Promise<Revive> {
		const reqOpts = {
			force: options?.force || false,
			update: options?.update || true,
		};
		// if (options?.all) return await this.cache.getAll('revive', "channelId", reqOpts);
		if (!id) return null;

		const data: DbRevive = await this.cache.get('revive', id, reqOpts);
		if (!data) return null;
		return new Revive(this.cache, this.API_KEY, data);
	}
	public async del(
		id: string | number,
		options: getOptions
	): Promise<boolean> {
		if (id) return await this.cache.del('revive', id, options);
		return null;
	}
	public async new(data: DbRevive): Promise<DbRevive> {
		return await this.cache.set(
			'revive',
			data.channelId,
			`INSERT INTO revives VALUES (${data.id}, '${data.guildId}', '${data.channelId}', ${data.role ? data.role.toString() : null}, ${data.time}, ${data.last}, '${data.timezone}', '${data.schedule}', ${data.night}, DEFAULT)`
		);
	}
}
