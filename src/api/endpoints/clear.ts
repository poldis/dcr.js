export default async function (): Promise<any> {
	const result = await this.fetchApiEndpoint("clear", "DELETE");
	return await result.json();
}