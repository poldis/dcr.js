import { BaseInterface } from './others';
import type { Snowflake } from 'discord-api-types/globals';

export interface DbRevive extends BaseInterface {
	guildId: Snowflake;
	channelId: Snowflake;
	role: null | Snowflake;
	time: number;
	last: number;
	timezone: number | string;
	schedule: string;
	night: null | string;
	lastMsgTime: string;
}

export interface DbCustom extends BaseInterface {
	reviveId: number;
	embed: string;
	buttons: number;
	tcol: number;
}
