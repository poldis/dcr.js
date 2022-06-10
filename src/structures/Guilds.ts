import { getOptions } from '../interfaces/others';
import { Guild } from '../interfaces/guild';
import cache from '../middleware/cache';

export default class Guilds {
	public async get(all: boolean, options: getOptions): Promise<Array<Guild>> {
		const reqOpts = {
			force: options?.force || false,
			update: options?.update || true,
		}
		if (all) return await cache.getAll('guild', "guildId", reqOpts);
		if (options && options?.id) return await cache.get('guild', options?.id, reqOpts);
		throw new Error("Guilds.get() was run without an id or \"all\" parameter");
	}
}