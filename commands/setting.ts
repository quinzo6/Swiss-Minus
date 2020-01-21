import {Client, Message} from "discord.js";
import {Client as PgClient} from "pg";

export let name = 'setting';
export let description = 'Changes my setting';
export let aliases = ['Settings', 'settings', 'Setting'];
export let usage = '[setting] [boolean]';

export async function execute(client: Client, message: Message, args: string[], db: PgClient) {
    const mod = message.member.hasPermission("MUTE_MEMBERS");

    const result = await db.query("SELECT * FROM settings");

    await message.channel.send(`Current settings:\n${JSON.stringify(result.rows)}`);
}
