import { DcrApiEndpoints } from "./endpoints";

export class DcrApi {
	constructor(BASE_API_URL: String) {
		this.BASE_API_URL = BASE_API_URL;
		this.ENDPOINTS_API_URL = this.BASE_API_URL + "/api/endpoints/";

		this.endpoints = new DcrApiEndpoints(this.ENDPOINTS_API_URL);
	}

	private BASE_API_URL: String;
	private ENDPOINTS_API_URL: String;

	public endpoints: DcrApiEndpoints;
}