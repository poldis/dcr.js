import { BaseInterface } from "./others";
import type { Snowflake } from 'discord-api-types/globals';

export interface DbGuild extends BaseInterface {
	guildId: Snowflake,
	lang: String,
	premium: Number,
	reviveMsgs: Number,
	cmdsUsed: Number,
	maxRevs: Number,
}