import { getOptions } from '../../interfaces/others';
import { DbCustom } from "../../interfaces/revive";

import { DcrCache } from '../../cache/index';
import Custom from '../Custom';

export default class CustomManager {
	constructor(private cache: DcrCache) {
		this.cache = cache;
	}
	public async get(id: String | Number, options: getOptions): Promise<Custom> {
		const reqOpts = {
			force: options?.force || false,
			update: options?.update || true,
		}
		if (!id) return null;

		const data: DbCustom = await this.cache.get('custom', id, reqOpts);
		if (!data) return null;
		return new Custom(this.cache, data);
	}
	public async del(id: String | Number, options: getOptions): Promise<Boolean> {
		if (!id) return null;
		return await this.cache.del('custom', id, options);
	}
	public async new(data: DbCustom, options: getOptions): Promise<DbCustom> {
		return await this.cache.set("custom", data.reviveId, `INSERT INTO custom VALUES (${data.id}, ${data.reviveId}, '${data.embed}', ${data.buttons}, ${data.tcol})`, options);
	}
}