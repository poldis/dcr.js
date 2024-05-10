import { getOptions } from '../../client/structures/types/others';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function (
	type: string,
	identifier: string,
	options: getOptions
): Promise<any> {
	if (!options)
		options = {
			update: true,
			force: false,
			customKey: false,
			customWhere: false,
		};
	const {
		update = true,
		force = false,
		customKey = false,
		customWhere = false,
	} = options;
	const redisRes = !force
		? JSON.parse(await this.redis.get(`${type}_${identifier}`))
		: null;
	if (redisRes) return redisRes;

	const query = this.getQuery(type, identifier, customKey, customWhere);
	if (!query || query.query.length <= 0)
		throw new Error('Invalid type passed to cache.get(): ' + type);

	const dbRes = await this.db.query(query.query);
	if (!dbRes || dbRes.length <= 0) return null;

	if (update)
		await this.redis.set(`${type}_${identifier}`, JSON.stringify(dbRes[0]));
	return dbRes[0];
}
