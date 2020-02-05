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

export let name = 'daily'
export let description = 'Collect your daily crate!';
export let guildOnly = true

export async function execute(client: Client, message: Message, args: string[], db: PgClient) {
    //const result = await db.query('UPDATE money SET balance = balance + 0 WHERE id = $1', [mentioned.id]);
    const id = await db.query('SELECT id FROM cards WHERE id = $1', [message.author.id])
    if (id.rowCount === 0) await db.query('INSERT INTO cards (id, common, rare, jumbo, ultra, ledgendary) VALUES($1, 0, 0, 0, 0, 0)', [message.author.id])
    const Time = (await db.query('SELECT daily FROM cards WHERE id = $1', [message.author.id])).rows[0].daily
    console.log(Time)
    const subtractedTime: Number = (await db.query('SELECT (EXTRACT(EPOCH FROM current_timestamp - $1)/3600)::Integer AS sub', [Time])).rows[0].sub
    console.log(typeof subtractedTime)
    if (subtractedTime === undefined || subtractedTime >= 24 || subtractedTime === null) {
    
    let ranChest: Number = Math.random()
    console.log(ranChest)
    if (ranChest < 0.5 || ranChest >= 0.96875) {
        await db.query('UPDATE cards SET common = common + 1 WHERE id = $1', [message.author.id])
        await db.query('UPDATE cards SET daily = current_timestamp WHERE id = $1', [message.author.id])
        return message.author.send('You recived a common crate for your daily reward!')
    }
    if (ranChest >= 0.5 && ranChest < 0.75) {
        await db.query('UPDATE cards SET rare = rare + 1 WHERE id = $1', [message.author.id])
        await db.query('UPDATE cards SET daily = current_timestamp WHERE id = $1', [message.author.id])
        return message.author.send('You recived a rare crate for your daily reward!')
    }
    if (ranChest >= .75 && ranChest < 0.875) {
        await db.query('UPDATE cards SET jumbo = jumbo + 1 WHERE id = $1', [message.author.id])
        await db.query('UPDATE cards SET daily = current_timestamp WHERE id = $1', [message.author.id])
        return message.author.send('You recived a jumbo crate for your daily reward!')
    }
    if (ranChest >= 0.875 && ranChest < 0.9375) {
        await db.query('UPDATE cards SET ultra = ultra + 1 WHERE id = $1', [message.author.id])
        await db.query('UPDATE cards SET daily = current_timestamp WHERE id = $1', [message.author.id])
        return message.author.send('You recived a common ultra for your daily reward!')
    }
    if (ranChest >= 0.9375 && ranChest < 0.96875) {
        await db.query('UPDATE cards SET legendary = legdendary + 1 WHERE id = $1', [message.author.id])
        await db.query('UPDATE cards SET daily = current_timestamp WHERE id = $1', [message.author.id])
        return message.author.send('You recived a ledgendary crate for your daily reward!')
    }
}
const waitTill = (await db.query('SELECT daily + interval \'24 hours\' AS time FROM cards WHERE id = $1', [message.author.id])).rows[0].time
const timeTill: Number = (await db.query('SELECT (EXTRACT(EPOCH FROM $1 - current_timestamp)/3600)::Integer AS sub', [waitTill])).rows[0].sub
console.log(timeTill)
let coolDown: RichEmbed = new Discord.RichEmbed()
coolDown
    .setTitle('Cooldown')
    .setColor(error_red)
    .setDescription(`Hey, your crate can't be delivered, try again in ${timeTill} hours!`)
    .setTimestamp()
return message.channel.send(coolDown)

}