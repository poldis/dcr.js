import { getOptions } from "../../interfaces/others";

export default async function del(type: String, identifier: String, options: getOptions): Promise<Boolean> {
	if (options?.update !== false) await this.redis.del(`${type}_${identifier}`);

	const { db, key } = this.getQuery(type, identifier, false, false);
	await this.db.query(`DELETE FROM ${db} WHERE ${key} = '${identifier}'`);

	return true;
}