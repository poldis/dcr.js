import Guilds from '../structures/Guilds';
import Users from '../structures/Users';
import DcrCache from 'dcr-cache';

export interface BaseInterface {
	id: Number;
}

export interface BaseClient {
	guilds: Guilds,
	users: Users,
	topics: any,
	pool: any,
	redis: any,
	cache: DcrCache
}

export interface Topic extends BaseInterface {
	groupId: Number,
	content: String,
}

export interface getOptions {
	all?: boolean,
	force?: boolean,
	update?: boolean
}