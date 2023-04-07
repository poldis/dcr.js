import { DcrApiEndpoints } from "./endpoints";

export class DcrApi {
	constructor(BASE_API_URL: String, API_KEY: String) {
		this.BASE_API_URL = BASE_API_URL;
		this.ENDPOINTS_API_URL = this.BASE_API_URL + "/api/endpoints/";

		this.API_KEY = API_KEY;

		this.endpoints = new DcrApiEndpoints(this.ENDPOINTS_API_URL, this.API_KEY);
	}

	private BASE_API_URL: String;
	private ENDPOINTS_API_URL: String;

	private API_KEY: String;

	public endpoints: DcrApiEndpoints;
}