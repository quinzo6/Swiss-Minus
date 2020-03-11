/* import Discord, {
    Client,
    Message,
    MessageEmbed,
    DiscordAPIError,
    MessageAttachment
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

export let name = 'pen'
export let description = 'penguin bad';

export async function execute(client: Client, message: Message, args: string[]) {
    if (message.author.id !== '660238973943152707') return message.channel.send('Penguins suck?')
    await message.channel.send(':penguin: :penguin: :penguin:')
    setTimeout(async function () {
        client.user.lastMessage.edit(':x::penguin::penguin:')
    }, 1000)

    setTimeout(function () {
        client.user.lastMessage.edit(':x::x::penguin:')
    }, 2000)
    setTimeout(function () {
        client.user.lastMessage.edit(':x::x::x:')
    }, 3000)
} */