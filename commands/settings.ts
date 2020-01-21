import {Client, Message} from "discord.js";
import {Client as PgClient} from "pg";

export let name = 'settings';
export let description = 'Shows or changes settings';
export let aliases = ['Settings', 'setting', 'Setting'];
export let usage = '[settings] <name> <value>';

export async function execute(client: Client, message: Message, args: string[], db: PgClient) {
    const mod = message.member.hasPermission("MUTE_MEMBERS");
    let result: {[key: string]: string} = {};
    const rows = (await db.query("SELECT * FROM settings")).rows;
    for(let row of rows) {
        result[row.name] = row.value
    }

    await message.channel.send(`Current settings:\n${JSON.stringify(result)}`);
}
