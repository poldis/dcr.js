import { getOptions } from '../interfaces/others';
import { User } from '../interfaces/user';
import DcrCache from 'dcr-cache';

export default class Users {
	constructor(private cache: DcrCache) {
		this.cache = cache;
	}
	public async get(all: boolean, options: getOptions): Promise<Array<User>> {
		const reqOpts = {
			force: options?.force || false,
			update: options?.update || true,
		}
		if (all) return await this.cache.getAll('user', "discordId", reqOpts);
		if (options && options?.id) return await this.cache.get('user', options?.id, reqOpts);
		throw new Error("Users.get() was run without an id or \"all\" parameter");
	}
}