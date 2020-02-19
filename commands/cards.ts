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
import planes from '../planes'

export let name = 'cards'
export let description = 'Card info';
export let usage = '<card name>'
export let aliases = ['card']

export async function execute(client: Client, message: Message, args: string[], db: PgClient) {
    const aplanes = Object.values(planes)
    class Plane {
        name: string;
        rarity: string;
        constructor(name: string) {
            this.name = name;
            this.rarity = aplanes.find(p => p.name === name).rarity
        }
    }
    const crate: string[] = [
        "common",
        'rare',
        'epic',
        'ultra',
        'ledgendary'
    ]
    const id = await db.query('SELECT id FROM cards WHERE id = $1', [message.author.id])
    if (id.rowCount === 0) await db.query('INSERT INTO cards (id, common, rare, jumbo, ultra, ledgendary) VALUES($1, 0, 0, 0, 0, 0)', [message.author.id])
            let commonss = aplanes.filter(planes => planes.rarity === 'common').map(m => m.name)
        let raress = aplanes.filter(planes => planes.rarity === 'rare').map(m => m.name)
        let epicss = aplanes.filter(planes => planes.rarity === 'epic').map(m => m.name)
        let ultrass = aplanes.filter(planes => planes.rarity === 'ultra').map(m => m.name)
        let legendaryss = aplanes.filter(planes => planes.rarity === 'ledgendary').map(m => m.name)
    if(!args[0]){
        let cards = new Discord.RichEmbed() as RichEmbed
        let countT = `SELECT ${new Plane('Boing_747').name.split(" ").join("_")}count AS counte FROM cards WHERE id = '${message.author.id}'`
        let countS = (await db.query(countT)).rows[0].counte
        let lengthe = aplanes.length
        for (let count = 1; lengthe * 2 > (((await db.query("SELECT count(*) FROM information_schema.columns WHERE table_name = 'cards'")).rows[0].count - 8) as number); count ++){
        let testm = `UPDATE cards SET ${planes[count].name}count = 0 WHERE ${planes[count].name}count IS NULL AND id = '${message.author.id}'`
        let testn = `UPDATE cards SET ${planes[count].name}levels = 0 WHERE ${planes[count].name}levels IS NULL AND id = '${message.author.id}'`
        await db.query(testm)
        await db.query(testn)
        }
        let cs = []
        let rs = []
        let es = []
        let us = []
        let ls = []
        let amtC = commonss.length
        let amtR = raress.length
        let amtE = epicss.length
        let amtU = ultrass.length
        let amtL = legendaryss.length
        for(let a = 0; amtC > a; a++){
            let card = commonss[a]
            let name = new Plane(card).name.split("_").join(" ")
            let countT = `SELECT ${new Plane(card).name.split(" ").join("_")}count AS counte FROM cards WHERE id = '${message.author.id}'`
            let countS = (await db.query(countT)).rows[0].counte
            cs.push(`${countS} ${name}s`)
        }
        for(let a = 0; amtR > a; a++){
            let card = raress[a]
            let name = (new Plane(card).name).split("_").join(" ")
            let countT = `SELECT ${new Plane(card).name.split(" ").join("_")}count AS counte FROM cards WHERE id = '${message.author.id}'`
            let countS = (await db.query(countT)).rows[0].counte
            rs.push(`${countS} ${name}s`)
        }
        for(let a = 0; amtE > a; a++){
            let card = epicss[a]
            let name = (new Plane(card).name).split("_").join(" ")
            let countT = `SELECT ${new Plane(card).name.split(" ").join("_")}count AS counte FROM cards WHERE id = '${message.author.id}'`
            let countS = (await db.query(countT)).rows[0].counte
            es.push(`${countS} ${name}s`)
        }
        for(let a = 0; amtU > a; a++){
            let card = ultrass[a]
            let name = (new Plane(card).name).split("_").join(" ")
            let countT = `SELECT ${new Plane(card).name.split(" ").join("_")}count AS counte FROM cards WHERE id = '${message.author.id}'`
            let countS = (await db.query(countT)).rows[0].counte
            us.push(`${countS} ${name}s`)
        }
        for(let a = 0; amtL > a; a++){
            let card = legendaryss[a]
            let name = (new Plane(card).name).split("_").join(" ")
            let countT = `SELECT ${new Plane(card).name.split(" ").join("_")}count AS counte FROM cards WHERE id = '${message.author.id}'`
            let countS = (await db.query(countT)).rows[0].counte
            ls.push(`${countS} ${name}s`)
        }
    cards
    .setColor(swiss_blue)
    .setTitle('Cards')
    .addField('Commons', `You have: ${cs}`)
    .addField('Rares', `You have: ${rs}`)
    .addField('Epics', `You have: ${es}`)
    .addField('Ultras', `You have: ${us}`)
    .addField('Ledgendars', `You have: ${ls}`)
    .setFooter(version)
    .setTimestamp()
    message.author.send(cards)   
    }
    let cardP = new Discord.RichEmbed
}