import Discord, {
    Client,
    Message,
    MessageEmbed,
    DiscordAPIError,
} from "discord.js";
import {
    Client as PgClient
} from "pg";
import {getSetting} from "../index"
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
    const on = await getSetting("bernie") === "on";
    if (!on) {
      const notOn = new Discord.MessageEmbed();
      notOn
        .setTitle(message.author.tag)
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setColor(error_red)
        .addField("I'm Not On!", 'This command it turned off! Please ask a mod or admin to turn it back on!')
        .setFooter(version)
        .setTimestamp()
      return await message.channel.send(notOn);
    }
    return message.channel.send(new Discord.MessageAttachment('https://cdn.discordapp.com/attachments/592768337407115264/678386879653085198/image0.png', 'bernie.jpg'))
}