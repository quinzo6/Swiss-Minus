import Discord, {
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
import {
    cpus
} from "os";

export let name = 'trade'
export let description = 'Trade your cards!';
export let usage = '[card name] [amount] <second card name> <second card amoung> up to five diffrent cards'

export async function execute(client: Client, message: Message, args: string[], db: PgClient) {
    const aplanes = Object.values(planes)
    let carda = [args[0]]
    if (args[1]) carda.push(args[1])
    class Plane {
        name: string;
        rarity: string;
        url: string;
        constructor(name: string) {
            this.name = name;
            this.rarity = aplanes.find(p => p.name === name).rarity
            this.url = aplanes.find(p => p.name === name).url
        }
    }

    const crate: string[] = [
        "common",
        'rare',
        'epic',
        'ultra',
        'ledgendary'
    ]
    console.log(args.length)
    const id = await db.query('SELECT id FROM cards WHERE id = $1', [message.author.id])
    if (id.rowCount === 0) await db.query('INSERT INTO cards (id, common, rare, jumbo, ultra, ledgendary) VALUES($1, 0, 0, 0, 0, 0)', [message.author.id])
    if([2, 4, 6, 8, 10].includes(2)){
        return message.channel.send('Hey! You messed up the arugments. Please do `!help trade` to see the usage')
    }
}