import Discord, {
    Attachment,
    Client,
    Message
} from 'discord.js'

export let name = 'george'


export async function execute(client: Client, message: Message, args: string[]) {
    return message.channel.send(new Attachment('https://cdn.discordapp.com/attachments/592463507124125706/678632428453101568/20200215_202029.png', 'george.jpg'))
}