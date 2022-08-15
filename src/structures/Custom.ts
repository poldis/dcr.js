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

	public async test(): Promise<void> {}
}