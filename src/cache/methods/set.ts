import type { MysqlError } from 'mysql';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function (
	type: string,
	identifier: string,
	query: string,
	params: Array<string> = []
): Promise<any> {
	await this.db.query(query, params).catch((err: MysqlError) => {
		console.error(err);
	});

	return await this.get(type, identifier, { update: true, force: true });
}
