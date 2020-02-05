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
import {
    version
} from '../package.json'


export let name = 'crates'
export let description = 'Collect your daily crate!';

export async function execute(client: Client, message: Message, args: string[], db: PgClient) {
    const id = await db.query('SELECT id FROM cards WHERE id = $1', [message.author.id])
    if (id.rowCount === 0) await db.query('INSERT INTO cards (id, common, rare, jumbo, ultra, ledgendary) VALUES($1, 0, 0, 0, 0, 0)', [message.author.id])
    let commons: Number = (await db.query('SELECT common FROM cards WHERE id = $1', [message.author.id])).rows[0].common
    let rares: Number = (await db.query('SELECT rare FROM cards WHERE id = $1', [message.author.id])).rows[0].rare
    let jumbos: Number = (await db.query('SELECT jumbo FROM cards WHERE id = $1', [message.author.id])).rows[0].jumbo
    let ultras: Number = (await db.query('SELECT ultra FROM cards WHERE id = $1', [message.author.id])).rows[0].ultra
    let legendarys: Number = (await db.query('SELECT ledgendary FROM cards WHERE id = $1', [message.author.id])).rows[0].ledgendary
    let cards = new Discord.RichEmbed as RichEmbed
    cards
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setColor(swiss_blue)
        .setFooter(version)
        .setTimestamp()
        .setDescription(`You have ${commons} commons! \n You have ${rares} rares! \n You have ${jumbos} jumbos! \n You have ${ultras} ultras! \n You have ${legendarys} ledgendarys!`);
    message.author.send(cards)
}