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

export let name = 'council'
export let description = 'The council will decide your fate';

export async function execute(client: Client, message: Message, args: string[], db: PgClient) {
    let mentioned = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!mentioned) {
        return message.channel.send(new Attachment('https://media.discordapp.net/attachments/660242184192131138/677561873012621312/unknown.png', 'council.jpg'))
    }
    message.delete()
    message.channel.send(`<@${mentioned.id}>, Your time has come...`)
    setTimeout(function () {
        return message.channel.send(new Attachment('https://media.discordapp.net/attachments/660242184192131138/677561873012621312/unknown.png', 'council.jpg'))
    }, 2000)
}