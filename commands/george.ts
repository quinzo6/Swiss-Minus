import Discord, {
    MessageAttachment,
    Client,
    Message
} from 'discord.js'
import version from '../package.json'
import {error_red} from '../config'
import {getSetting} from "../index"
export let name = 'george'


export async function execute(client: Client, message: Message, args: string[]) {
    const on = await getSetting("george") === "on";
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
    return message.channel.send(new Discord.MessageAttachment('https://cdn.discordapp.com/attachments/592463507124125706/678632428453101568/20200215_202029.png', 'george.jpg'))
}