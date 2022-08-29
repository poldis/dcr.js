import clear from "./clear";
import ApiRevives from "./revives";

import fetch from "node-fetch";

export class DcrApiEndpoints {
	constructor(ENDPOINTS_API_URL: String) {
		this.ENDPOINTS_API_URL = ENDPOINTS_API_URL;

		this.clear = clear.bind(this);
		this.revives = new ApiRevives(ENDPOINTS_API_URL);
	}

	private ENDPOINTS_API_URL: String;

	public clear: Function | null;
	public revives: any;

	private async fetchApiEndpoint(endpoint: string, options: { method?: string, headers?: any, body?: any }): Promise<any> {
		return await fetch(this.ENDPOINTS_API_URL + endpoint, {
			method: options?.method || "GET",
			headers: options?.headers,
			body: options?.body
		});
	}
}