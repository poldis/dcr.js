import { Snowflake } from 'discord-api-types/globals';
import { ApiResponse } from '../types/others';

export default async function (guildId: Snowflake): Promise<ApiResponse> {
	const result = await this.fetchApiEndpoint(`clear/${guildId}`, {
		method: 'DELETE',
	});
	return await result.json();
}
