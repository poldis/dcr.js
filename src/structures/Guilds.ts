import { getOptions } from '../interfaces/others';
import { Guild, GuildsClass } from '../interfaces/guild';
import DcrCache from 'dcr-cache';

export default class Guilds implements GuildsClass {
	constructor(private cache: DcrCache) {
		this.cache = cache;
	}
	public async get(id: String | Number, options: getOptions): Promise<Guild> {
		const reqOpts = {
			force: options?.force || false,
			update: options?.update || true,
		}
		// if (options?.all) return await this.cache.getAll('guild', "guildId", reqOpts);
		if (id) return await this.cache.get('guild', id, reqOpts);
		throw new Error("Guilds.get() was run without an id provided.");
	}
	public async del(id: String | Number, options: getOptions): Promise<Boolean> {
		if (id) return await this.cache.del('guild', id, options);
		throw new Error("Guilds.del() was run without an id provided.");
	}
}