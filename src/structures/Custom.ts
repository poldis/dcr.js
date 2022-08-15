import { DcrCache } from '../cache/index';
import { DbCustom } from "../interfaces/revive";

export default class Custom {
	constructor(private cache: DcrCache, data: DbCustom) {
		this.cache = cache;
		for (const [key, value] of Object.entries(data)) {
			this[key] = value;
		}
	}
	public id: Number;
	public reviveId: Number;
	public embed: String;
	public buttons: Number;
	public tcol: Number;

	public async set(embed: String, buttons: Number, tcol: Number): Promise<DbCustom | null> {
		await this.setEmbed(embed);
		await this.setButtons(buttons);
		return await this.setTcol(tcol);
	}
	public async setEmbed(embed: String): Promise<DbCustom | null> {
		return await this.cache.set('custom', this.reviveId, `UPDATE custom SET embed = '${embed}' WHERE reviveId = ${this.reviveId}`);
	}
	public async setButtons(buttons: Number): Promise<DbCustom | null> {
		return await this.cache.set('custom', this.reviveId, `UPDATE custom SET buttons = ${buttons} WHERE reviveId = ${this.reviveId}`);
	}
	public async setTcol(tcol: Number): Promise<DbCustom | null> {
		return await this.cache.set('custom', this.reviveId, `UPDATE custom SET tcol = ${tcol} WHERE reviveId = ${this.reviveId}`);
	}
}