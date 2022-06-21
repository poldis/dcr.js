import { getOptions } from '../../interfaces/others';
import { User } from '../../interfaces/user';
import { DcrCache } from '../../cache/index';

export default class UserManager {
	constructor(private cache: DcrCache) {
		this.cache = cache;
	}
	public async get(id: String | Number, options: getOptions): Promise<User> {
		const reqOpts = {
			force: options?.force || false,
			update: options?.update || true,
		}
		// if (options?.all) return await this.cache.getAll('user', "discordId", reqOpts);
		if (id) return await this.cache.get('user', id, reqOpts);
		throw new Error("UserManager.get() was run without an id provided.");
	}
	public async del(id: String | Number, options: getOptions): Promise<Boolean> {
		if (id) return await this.cache.del('user', id, options);
		throw new Error("UserManager.del() was run without an id provided.");
	}
}