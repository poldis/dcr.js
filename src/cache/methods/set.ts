import type { MysqlError } from 'mysql';

export default async function (
	type: string,
	identifier: number | string,
	query: string,
	params: Array<string> = []
): Promise<any> {
	// eslint-disable-line @typescript-eslint/no-explicit-any
	await this.pool.query(query, params).catch((err: MysqlError) => {
		console.error(err);
	});

	return await this.get(type, identifier, { update: true, force: true });
}
