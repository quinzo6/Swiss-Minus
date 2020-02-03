import Discord, {
    Client,
    Message,
    TextChannel
} from "discord.js";
import {
    swiss_blue,
    log_yellow
} from "../config";
import {
    error_red
} from "../config"
import {
    Client as PgClient
} from "pg";



export let name = 'balance';
export let description = 'Shows your current balance';
export let aliases = ['b', 'B'];
export let usage = '<user> <mod only: <remove> <amount(Can\'t be more than their balance)> <reason> >';
export let guildOnly = true

export async function execute(client: Client, message: Message, args: string[], db: PgClient) {
    if (!args[0]) {
        var youthey = 'you have'
    } else {
        var youthey = 'who you taged'
    }
    if (!args[1]) {
        let mentioned = message.mentions.members.first() || message.guild.members.get(args[1] || message.author.id)
        const result = await db.query('UPDATE money SET balance = balance + 0 WHERE id = $1', [mentioned.id]);
        if (result.rowCount === 0) {
            console.log
            let broke = new Discord.RichEmbed()
            broke
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setDescription(`*Sniff Sniff* I smell broke, I belive its ${youthey}. To increse you balance, chat!`)
                .setColor(error_red)
                .setTimestamp()
            let newRow = await db.query('INSERT INTO money VALUES ($1, $2)', [message.author.id, 0])
            return message.channel.send(broke)
        }
        let balance = (await db.query('SELECT balance FROM money WHERE id = $1', [mentioned.id])).rows[0].balance

        console.log(balance)

        let money = new Discord.RichEmbed()
        money
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setDescription(`I see some money in the bank! I belive ${youthey} has ${balance}ß in the bank!`)
            .setColor(swiss_blue)
            .setTimestamp()
        return message.channel.send(money)

    } else if (!args[0] || !args[1] || !args[2] || !args[3]) {
        const embed = new Discord.RichEmbed()
        embed
            .setTitle('Argument')
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor(error_red)
            .addField('Error', "You didn't provide any arguments!");
        return message.channel.send(embed)
    } else {

        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            const embed = new Discord.RichEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setTitle('Missing Permissions')
                .setColor(error_red)
                .addField('Missing Perms!', `Hey ${message.author}, you are missing permissions to use this command.`);
            return message.channel.send(embed);
        }
        let reason2 = args.slice(1)
        let reason1= reason2.slice(1)
        let reason= reason1.slice(1).join(" ")

        if (args[1] = 'remove' || 'r') {
            let Amt = parseInt(args[2])
            let mentioned = message.mentions.members.first() || message.guild.members.get(args[1] || message.author.id)
            const result = await db.query('UPDATE money SET balance = balance + 0 WHERE id = $1', [mentioned.id]);
            if (result.rowCount === 0) {
                console.log
                let broke = new Discord.RichEmbed()
                broke
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .setDescription(`Gone, reduced to atoms. I cant find a database with that person, so I will make a new gauntlet, I mean data set`)
                    .setColor(error_red)
                    .setTimestamp()
                let newRow = await db.query('INSERT INTO money VALUES ($1, $2)', [mentioned.id, 0])
                return message.channel.send(broke)
            }
            let balance = (await db.query('SELECT balance FROM money WHERE id = $1', [mentioned.id])).rows[0].balance
            if (Amt > balance) return message.reply('You can\'t put them in the negitives! Thats unfair.')
            let b = await db.query('UPDATE money SET balance = balance - $2 WHERE id = $1', [mentioned.id, args[2]])
            if (balance < 10) return message.reply('Dont take from the poor, there broke!')
            message.reply('I removed the money')
            let transaction = new Discord.RichEmbed()
            transaction
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setDescription(`<@${message.author.id}> removed ${Amt} from ${mentioned}`)
                .addField('Reason:', reason)
                .setTimestamp()
                .setColor(log_yellow)
            let log = client.channels.get('673846077241163796') as TextChannel
            return log.send(transaction)
        } else
            var embed = new Discord.RichEmbed()
        embed
            .setTitle('Argument')
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor(error_red)
            .addField('Error', "You didn't provide any arguments!");
        message.channel.send(embed)
    }
}