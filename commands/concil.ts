import Discord, {
    Client,
    Message,
    MessageEmbed,
    DiscordAPIError,
    MessageAttachment,
    GuildManager,
    GuildMember
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
import {getSetting} from "../index"

export let name = 'council'
export let description = 'The council will decide your fate';

export async function execute(client: Client, message: Message, args: string[], db: PgClient) {
    const on = await getSetting("council") === "on";
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
    let mentioned = message.mentions.members.first() || message.guild.members.cache.get(args[0]) as GuildMember;
    if (!mentioned) {
        return message.channel.send(new Discord.MessageAttachment('https://media.discordapp.net/attachments/592463507124125706/677704599884529685/council.jpg', 'council.jpg'))
    }
    message.delete()
    message.channel.send(`<@${mentioned.id}>, Your time has come...`)
    setTimeout(function () {
        return message.channel.send(new Discord.MessageAttachment('https://media.discordapp.net/attachments/592463507124125706/677702569908371498/council.jpg', 'council.jpg'))
    }, 2000)
}