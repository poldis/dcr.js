import clear from "./clear";
import ApiRevives from "./revives";

export class DcrApiEndpoints {
	constructor(ENDPOINTS_API_URL: URL) {
		this.ENDPOINTS_API_URL = ENDPOINTS_API_URL;

		this.clear = clear.bind(this);
		this.revives = new ApiRevives(ENDPOINTS_API_URL);
	}

	private ENDPOINTS_API_URL: URL;

	public clear: Function | null;
	public revives: any;

	private async fetchApiEndpoint(endpoint: string, options: { method?: string, headers?: any, body?: any }): Promise<any> {
		return await fetch(new URL(this.ENDPOINTS_API_URL + endpoint), {
			method: options?.method || "GET",
			headers: options?.headers,
			body: options?.body
		});
	}
}