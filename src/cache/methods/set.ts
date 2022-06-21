import type { MysqlError } from "mysql";

export default async function (type: String, identifier: string, query: String, params: Array<any> = []): Promise<any> {
	await this.db.query(query, params).catch((err: MysqlError) => { console.error(err); });

	return await this.get(type, identifier, { update: true, force: true });
}