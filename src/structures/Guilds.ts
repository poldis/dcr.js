import { getOptions } from '../interfaces/others';
import { Guild, GuildsInterface } from '../interfaces/guild';
import DcrCache from 'dcr-cache';

export default class Guilds implements GuildsInterface {
	constructor(private cache: DcrCache) {
		this.cache = cache;
	}
	public async get(all: boolean, options: getOptions): Promise<Array<Guild>> {
		const reqOpts = {
			force: options?.force || false,
			update: options?.update || true,
		}
		if (all) return await this.cache.getAll('guild', "guildId", reqOpts);
		if (options && options?.id) return await this.cache.get('guild', options?.id, reqOpts);
		throw new Error("Guilds.get() was run without an id or \"all\" parameter");
	}
}