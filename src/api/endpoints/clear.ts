import { Snowflake } from "discord-api-types/globals";

export default async function (guildId: Snowflake): Promise<any> {
	const result = await this.fetchApiEndpoint(`clear/${guildId}`, "DELETE");
	return await result.json();
}