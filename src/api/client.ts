import { DcrApiEndpoints } from "./endpoints";

export class DcrApi {
	constructor(BASE_API_URL: URL) {
		this.BASE_API_URL = BASE_API_URL;
		this.ENDPOINTS_API_URL = new URL(this.BASE_API_URL + "/api/endpoints/");

		this.endpoints = new DcrApiEndpoints(this.ENDPOINTS_API_URL);
	}

	private BASE_API_URL: URL;
	private ENDPOINTS_API_URL: URL;

	public endpoints: DcrApiEndpoints;
}