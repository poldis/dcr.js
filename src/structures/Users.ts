import { getOptions } from '../interfaces/others';
import { User } from '../interfaces/user';
import DcrCache from 'dcr-cache';

export default class Users {
	constructor(private cache: DcrCache) {
		this.cache = cache;
	}
	public async get(id: String | Number, options: getOptions): Promise<Array<User>> {
		const reqOpts = {
			force: options?.force || false,
			update: options?.update || true,
		}
		if (options?.all) return await this.cache.getAll('user', "discordId", reqOpts);
		if (options && id) return await this.cache.get('user', id, reqOpts);
		throw new Error("Users.get() was run without an id provided.");
	}
}