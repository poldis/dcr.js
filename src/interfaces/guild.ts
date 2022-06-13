import { BaseInterface, getOptions } from "./others";

export interface Guild extends BaseInterface {
	guildId: String,
	lang: String,
	premium: Number,
	reviveMsgs: Number,
	cmdsUsed: Number,
	maxRevs: Number,
}

export interface GuildsClass {
	get(id: String | Number, options: getOptions): Promise<Guild>,
	del(id: String | Number, options: getOptions): Promise<Boolean>;
}