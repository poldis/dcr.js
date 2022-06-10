import { getOptions } from '../interfaces/others';
import { User } from '../interfaces/user';
import cache from '../middleware/cache';

export default class Users {
	public async get(all: boolean, options: getOptions): Promise<Array<User>> {
		const reqOpts = {
			force: options?.force || false,
			update: options?.update || true,
		}
		if (all) return await cache.getAll('user', "discordId", reqOpts);
		if (options && options?.id) return await cache.get('user', options?.id, reqOpts);
		throw new Error("Users.get() was run without an id or \"all\" parameter");
	}
}