import { getOptions } from '../interfaces/others';
import { DbCustom } from "../interfaces/revive";

import { DcrCache } from '../../../cache/index';
import Custom from '../Custom';

interface getOptionsCustom extends getOptions {
	defaultValues: Boolean;
}

export default class CustomManager {
	constructor(private cache: DcrCache) {
		this.cache = cache;
	}
	public async get(id: Number, options: getOptionsCustom): Promise<DbCustom> {
		const reqOpts = {
			force: options?.force || false,
			update: options?.update || true,
		}
		if (!id) return null;

		const data: DbCustom = await this.cache.get('custom', id, reqOpts);
		if (!data && options?.defaultValues == false) return null; 
		else if (!data) return {
			id: null,
			reviveId: id,
			embed: "standard",
			buttons: 1,
			tcol: 0,
		}
		return new Custom(this.cache, data);
	}
	public async del(id: Number, options: getOptions): Promise<Boolean> {
		if (!id) return null;
		return await this.cache.del('custom', id, options);
	}
	public async new(data: DbCustom, options: getOptions): Promise<DbCustom> {
		return await this.cache.set("custom", data.reviveId, `INSERT INTO custom VALUES (${data.id}, ${data.reviveId}, '${data.embed}', ${data.buttons}, ${data.tcol})`, options);
	}
}