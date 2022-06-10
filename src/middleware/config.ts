import * as mysql from 'mysql';
import * as util from 'util';
import Redis from 'ioredis';

const pool = mysql.createPool({
	host: "127.0.0.1",
	user: "dcr",
	password: process.env.MYSQL_PASS,
	database: "dcr",
	connectionLimit: 10,
	insecureAuth : true
});
pool.query = util.promisify(pool.query);

const redis = new Redis({
	port: 6379,
	host: "127.0.0.1",
	password: process.env.REDIS_PASS
});

export { pool, redis };