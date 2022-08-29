import { BaseInterface } from './others';
import type { Snowflake } from 'discord-api-types/globals';

export interface User extends BaseInterface {
	discordId: Snowflake,
	email: String,
	autoJoin: Number,
}