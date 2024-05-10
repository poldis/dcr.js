import { BaseInterface } from './others';
import type { Snowflake } from 'discord-api-types/globals';

export interface DbGuild extends BaseInterface {
	guildId: Snowflake;
	lang: string;
	premium: number;
	reviveMsgs: number;
	cmdsUsed: number;
	maxRevs: number;
}
