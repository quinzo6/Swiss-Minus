import Discord, {
    Client,
    Message,
    RichEmbed,
    DiscordAPIError,
    Attachment
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
import planes from '../planes'

export let name = 'bernie'
export let description = 'I am no longer asking';

export async function execute(client: Client, message: Message, args: string[], db: PgClient) {
   return message.channel.send(new Attachment('https://cdn.discordapp.com/attachments/592768337407115264/678386879653085198/image0.png','bernie.jpg'))
}