import { Snowflake } from 'discord-api-types/globals';

import clear from './clear';
import lang from './lang';
import ApiRevives from './revives';

import fetch from 'node-fetch';
import { ApiResponse } from '../types/others';

export class DcrApiEndpoints {
	constructor(ENDPOINTS_API_URL: string, API_KEY: string) {
		this.ENDPOINTS_API_URL = ENDPOINTS_API_URL;

		this.API_KEY = API_KEY;

		this.clear = clear.bind(this);
		this.lang = lang.bind(this);
		this.revives = new ApiRevives(ENDPOINTS_API_URL, API_KEY);
	}

	private ENDPOINTS_API_URL: string;
	private API_KEY: string;

	public clear: ((guildId: Snowflake) => Promise<ApiResponse>) | null;
	public lang:
		| ((guildId: Snowflake, lang: string) => Promise<ApiResponse>)
		| null;
	public revives: ApiRevives;

	private async fetchApiEndpoint(
		endpoint: string,
		options: { method?: string; headers?: HeadersInit; body?: BodyInit }
	): Promise<Response> {
		if (options?.headers) options.headers['X-Api-Key'] = this.API_KEY;
		else options.headers = { 'X-Api-Key': this.API_KEY };

		return await fetch(this.ENDPOINTS_API_URL + endpoint, {
			method: options?.method || 'GET',
			headers: options.headers,
			body: options?.body || undefined,
		});
	}
}
