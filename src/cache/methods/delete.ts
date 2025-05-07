import { getOptions } from '../../client/structures/types/others';

export default async function del(
	type: string,
	identifier: number | string,
	options: getOptions
): Promise<boolean> {
	if (!options)
		options = {
			update: true,
			force: false,
			customKey: false,
			customWhere: false,
		};
	if (options?.update !== false)
		await this.redis.del(`${type}_${identifier}`);

	const { db, key } = this.getQuery(type, identifier, false, false);
	await this.pool.query(`DELETE FROM ${db} WHERE ${key} = '${identifier}'`);

	return true;
}
