import clear from "./clear";
import lang from "./lang";
import ApiRevives from "./revives";

import fetch from "node-fetch";

export class DcrApiEndpoints {
	constructor(ENDPOINTS_API_URL: String, API_KEY: String) {
		this.ENDPOINTS_API_URL = ENDPOINTS_API_URL;

		this.API_KEY = API_KEY;

		this.clear = clear.bind(this);
		this.lang = lang.bind(this);
		this.revives = new ApiRevives(ENDPOINTS_API_URL);
	}

	private ENDPOINTS_API_URL: String;
	private API_KEY: String;

	public clear: Function | null;
	public lang: Function | null;
	public revives: ApiRevives;

	private async fetchApiEndpoint(endpoint: string, options: { method?: string, headers?: any, body?: any }): Promise<any> {
		if (options?.headers) options.headers["X-Api-Key"] = this.API_KEY;
		else options.headers = { "X-Api-Key": this.API_KEY };

		return await fetch(this.ENDPOINTS_API_URL + endpoint, {
			method: options?.method || "GET",
			headers: options.headers,
			body: options?.body
		});
	}
}