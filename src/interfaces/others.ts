export interface BaseInterface {
	id: Number;
}

export interface BaseClient {
	guilds,
	users,
	topics,
	pool,
	redis,
	cache
}

export interface Topic extends BaseInterface {
	groupId: Number,
	content: String,
}

export interface getOptions {
	id?: string,
	force?: boolean,
	update?: boolean,
}