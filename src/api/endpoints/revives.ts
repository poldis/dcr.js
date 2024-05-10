import { Snowflake } from 'discord-api-types/globals';
import { DbRevive } from '../../client/structures/types/revive';
import { ApiResponse } from '../types/others';

export default class ApiRevives {
	constructor(
		private ENDPOINTS_API_URL: string,
		private API_KEY: string
	) {
		this.ENDPOINTS_API_URL = ENDPOINTS_API_URL;
	}

	public async post(
		guildId: Snowflake,
		data: Partial<DbRevive>
	): Promise<Partial<ApiResponse>> {
		const result = await this.fetchApiEndpoint(`revives/${guildId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		return await result.json();
	}
	public async patch(
		guildId: Snowflake,
		data: Partial<DbRevive>
	): Promise<Partial<ApiResponse>> {
		const result = await this.fetchApiEndpoint(`revives/${guildId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		return await result.json();
	}
	public async delete(channelId: Snowflake): Promise<Partial<ApiResponse>> {
		const result = await this.fetchApiEndpoint(`revives/${channelId}`, {
			method: 'DELETE',
		});
		return await result.json();
	}

	private async fetchApiEndpoint(
		endpoint: string,
		options: { method?: string; headers?: HeadersInit; body?: BodyInit }
	): Promise<Response> {
		if (options?.headers) options.headers['X-Api-Key'] = this.API_KEY;
		else options.headers = { 'X-Api-Key': this.API_KEY };

		return await fetch(this.ENDPOINTS_API_URL + endpoint, {
			method: options?.method || 'GET',
			headers: options.headers,
			body: options?.body,
		});
	}
}
