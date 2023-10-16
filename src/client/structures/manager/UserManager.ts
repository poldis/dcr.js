import { getOptions } from '../interfaces/others';
import { DbUser } from '../interfaces/user';
import { DcrCache } from '../../../cache/index';
import User from '../User';

export default class UserManager {
	constructor(private cache: DcrCache) {
		this.cache = cache;
	}
	public async get(discordId: String | Number, options: getOptions): Promise<DbUser> {
		const reqOpts = {
			force: options?.force || false,
			update: options?.update || true,
		}
		// if (options?.all) return await this.cache.getAll('user', "discordId", reqOpts);
		if (!discordId) throw new Error("UserManager.get() was run without an id provided.");
		
		const data: DbUser = await this.cache.get('user', discordId, reqOpts);
		if (!data) return null;
		return new User(this.cache, data);
	}
	public async del(id: String | Number, options: getOptions): Promise<Boolean> {
		if (id) return await this.cache.del('user', id, options);
		throw new Error("UserManager.del() was run without an id provided.");
	}
	public async new(data: DbUser, options: getOptions): Promise<DbUser> {
		return await this.cache.set("user", data.discordId, `INSERT INTO users VALUES (${data.id}, '${data.discordId}', '${data.email}', ${data.autoJoin}, ${data.timezone})`, options);
	}
}