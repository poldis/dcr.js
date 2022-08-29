import { Snowflake } from "discord-api-types/globals";

export default async function (guildId: Snowflake, lang: String): Promise<any> {
	const result = await this.fetchApiEndpoint(`lang/${guildId}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			lang,
		}),
	});
	return await result.json();
}