import * as dotenv from 'dotenv';
dotenv.config();

import { EventEmitter } from 'events';
import { BaseClient, Topic } from './interfaces/others';
import Guilds from './structures/Guilds';
import Users from './structures/Users';

import { pool, redis } from './middleware/config';
import cache from './middleware/cache';

export default class Client extends EventEmitter implements BaseClient {
	private getTopics() { }

	public guilds = new Guilds();
	public users = new Users();
	public topics = this.getTopics()

	public pool = pool;
	public redis = redis;
	public cache = cache;

	public init = () => {
		this.emit('ready');
	}
}