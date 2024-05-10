import { DcrCache } from '../../cache/index';
import { DbCustom } from './types/revive';

export default class Custom {
	constructor(
		private cache: DcrCache,
		data: DbCustom
	) {
		this.cache = cache;
		for (const [key, value] of Object.entries(data)) {
			this[key] = value;
		}
	}
	public id: number;
	public reviveId: number;
	public embed: string;
	public buttons: number;
	public tcol: number;

	public async set(
		embed: string,
		buttons: number,
		tcol: number
	): Promise<DbCustom | null> {
		await this.setEmbed(embed);
		await this.setButtons(buttons);
		return await this.setTcol(tcol);
	}
	public async setEmbed(embed: string): Promise<DbCustom | null> {
		return await this.cache.set(
			'custom',
			this.reviveId,
			`UPDATE custom SET embed = '${embed}' WHERE reviveId = ${this.reviveId}`
		);
	}
	public async setButtons(buttons: number): Promise<DbCustom | null> {
		return await this.cache.set(
			'custom',
			this.reviveId,
			`UPDATE custom SET buttons = ${buttons} WHERE reviveId = ${this.reviveId}`
		);
	}
	public async setTcol(tcol: number): Promise<DbCustom | null> {
		return await this.cache.set(
			'custom',
			this.reviveId,
			`UPDATE custom SET tcol = ${tcol} WHERE reviveId = ${this.reviveId}`
		);
	}
}
