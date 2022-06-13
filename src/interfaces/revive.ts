import { BaseInterface, getOptions } from "./others";

export interface Revive extends BaseInterface {
	guildId: String,
	channelId: String,
	role: String,
	time: BigInt,
	last: BigInt,
	timezone: Number,
	schedule: String,
	night: String,
	lastMsgTime: String,
	custom: String,
	buttons: Number,
}

export interface RevivesClass {
	get(id: String | Number, options: getOptions): Promise<Revive>,
	del(id: String | Number, options: getOptions): Promise<Boolean>;
}