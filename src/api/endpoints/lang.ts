import { Snowflake } from 'discord-api-types/globals';
import { ApiResponse } from '../types/others';

export default async function (
	guildId: Snowflake,
	lang: string
): Promise<ApiResponse> {
	const result = await this.fetchApiEndpoint(`lang/${guildId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			lang,
		}),
	});
	return await result.json();
}
