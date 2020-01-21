import {Client, Message} from "discord.js";
import {Client as PgClient} from "pg";

export let name = 'setting';
export let description = 'Changes my setting';
export let aliases = ['Settings', 'settings', 'Setting'];
export let usage = '[setting] [boolean]';

export async function execute(client: Client, message: Message, args: string[], db: PgClient) {
    const mod = message.member.hasPermission("MUTE_MEMBERS");
    let result: {[key: string]: string} = {};
    const rows = (await db.query("SELECT * FROM settings")).rows;
    for(let row of rows) {
        result[row.name] = row.value
    }

    await message.channel.send(`Current settings:\n${JSON.stringify(rows)}`);
}
