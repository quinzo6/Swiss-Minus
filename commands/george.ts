import Discord, {
    MessageAttachment,
    Client,
    Message
} from 'discord.js'

export let name = 'george'


export async function execute(client: Client, message: Message, args: string[]) {
    return message.channel.send(new Discord.MessageAttachment('https://cdn.discordapp.com/attachments/592463507124125706/678632428453101568/20200215_202029.png', 'george.jpg'))
}