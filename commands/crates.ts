import Discord, {
    Client,
    Message,
    RichEmbed,
    DiscordAPIError
} from "discord.js";
import {
    Client as PgClient
} from "pg";
import {
    swiss_blue,
    error_red,
    log_yellow
} from "../config";
import {
    version
} from '../package.json'


export let name = 'crates'
export let description = 'Collect your daily crate!';

export async function execute(client: Client, message: Message, args: string[], db: PgClient) {}