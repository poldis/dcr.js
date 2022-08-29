import { BaseInterface, getOptions } from "./others";
import type { Snowflake } from 'discord-api-types/globals';

export interface DbRevive extends BaseInterface {
	guildId: Snowflake,
	channelId: Snowflake,
	role: null | Snowflake,
	time: Number,
	last: Number,
	timezone: Number | String,
	schedule: String,
	night: null | String,
	lastMsgTime: String,
}

export interface DbCustom extends BaseInterface {
	reviveId: Number,
	embed: String,
	buttons: Number,
	tcol: Number,
}