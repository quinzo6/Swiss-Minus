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
import {
    Cipher
} from "crypto";

export let name = 'crates'
export let description = 'Collect your daily crate!';
export let usage = '<open> <crate type>'
export let aliases = ['crate']

export async function execute(client: Client, message: Message, args: string[], db: PgClient) {
    const aplanes = Object.values(planes)
    class Plane {
        name: string;
        rarity: any;
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
    let commons: Number = (await db.query('SELECT common FROM cards WHERE id = $1', [message.author.id])).rows[0].common
    let rares: Number = (await db.query('SELECT rare FROM cards WHERE id = $1', [message.author.id])).rows[0].rare
    let jumbos: Number = (await db.query('SELECT jumbo FROM cards WHERE id = $1', [message.author.id])).rows[0].jumbo
    let ultras: Number = (await db.query('SELECT ultra FROM cards WHERE id = $1', [message.author.id])).rows[0].ultra
    let legendarys: Number = (await db.query('SELECT ledgendary FROM cards WHERE id = $1', [message.author.id])).rows[0].ledgendary
    if (!args[0]) {
        let cards = new Discord.RichEmbed as RichEmbed
        cards
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor(swiss_blue)
            .setFooter(version)
            .setTimestamp()
            .setDescription(`You have ${commons} commons! \n You have ${rares} rares! \n You have ${jumbos} jumbos! \n You have ${ultras} ultras! \n You have ${legendarys} ledgendarys!`);
        message.author.send(cards)
    }
    if (args[0] === "open" || args[1] === "Open") {
        if (!args[1]) {
            message.channel.send('You need to open something')
        }
        let commonss = aplanes.filter(planes => planes.rarity === 'common').map(m => m.name)
        let raress = aplanes.filter(planes => planes.rarity === 'rare').map(m => m.name)
        let epicss = aplanes.filter(planes => planes.rarity === 'epic').map(m => m.name)
        let ultrass = aplanes.filter(planes => planes.rarity === 'ultra').map(m => m.name)
        let legendaryss = aplanes.filter(planes => planes.rarity === 'ledgendary').map(m => m.name)
        let cratetype = args[1].toLowerCase()
        let amtC = commonss.length
        let amtR = raress.length
        let amtE = epicss.length
        let amtU = ultrass.length
        let amtL = legendaryss.length
        if (cratetype === 'common' && (commons !== 0 && commons !== null && commons !== undefined)) {
            let Odds = Math.random()
            let Cextra = 2
            if (Odds <= .5 && Odds > .8) {
                Cextra = 3
            }
            if (Odds <= .8 && Odds > .95) {
                Cextra = 4
            }
            if (Odds <= .95) {
                Cextra = 5
            }
            let ROdds = Math.random()
            let Rextra = 0
            if (ROdds >= .5) {
                Rextra = 1
            }
            let EOdds = Math.random()
            let Eextra = 0
            if (EOdds >= .75) {
                Eextra = 1
            }
            let cardss = []
            if (Cextra > 0) {
                for (let hhh = 0; hhh < Cextra; hhh++) {
                    let ran = Math.floor(Math.random() * amtC)
                    cardss.push(commonss[ran])
                }
            }
            if (Rextra > 0) {
                for (let bbb = 0; bbb < Rextra; bbb++) {
                    let ran = Math.floor(Math.random() * amtR)
                    cardss.push(raress[ran])
                }
            }
            if (Eextra > 0) {
                for (let ccc = 0; ccc < Eextra; ccc++) {
                    let ran = Math.floor(Math.random() * amtE)
                    cardss.push(epicss[ran])
                }
            }
            for (let ddd = 0; ddd < cardss.length; ddd++) {
                let texts: string = `UPDATE cards SET ${cardss[ddd]}count = ${cardss[ddd]}count + 1 WHERE id = '${message.author.id}'`
                await db.query(texts);
            }
            let mes = 'From your common crate: \n```diff\n'
            for (let c = 0; c < cardss.length; c++) {
                mes = `${mes}+ 1 ${cardss[c].split('_').join(" ")} \n`
            }
            mes = mes + '```'
            message.author.send(mes)
            let messa = `UPDATE cards SET common = common - 1 WHERE id = '${message.author.id}'`
            return await db.query(messa)
        }
        if (args[1] === 'rare' && (rares !== 0 && rares !== null && rares !== undefined)) {
            let Odds = Math.random()
            let Cextra = 1
            if (Odds <= .5 && Odds > .8) {
                Cextra = 2
            }
            if (Odds <= .8 && Odds > .95) {
                Cextra = 3
            }
            if (Odds <= .95) {
                Cextra = 4
            }
            let ROdds = Math.random()
            let Rextra = 1
            if (ROdds >= .635) {
                Rextra = 2
            }
            let EOdds = Math.random()
            let Eextra = 0
            if (EOdds >= .65) {
                Eextra = 1
            }
            if (EOdds > .90) {
                Eextra = 2
            }
            let UOdds = Math.random()
            let Uextra = 0
            if (UOdds > .90) {
                Uextra = 1
            }
            let LOdds = Math.random()
            let Lextra = 0
            if (LOdds > .999) {
                Lextra = 1
            }
            let cardss = []
            for (let hhh = 0; hhh < Cextra; hhh++) {
                let ran = Math.floor(Math.random() * amtC)
                cardss.push(commonss[ran])
            }
            if (Rextra > 0) {
                for (let bbb = 0; bbb < Rextra; bbb++) {
                    let ran = Math.floor(Math.random() * amtR)
                    cardss.push(raress[ran])
                }
            }
            if (Eextra > 0) {
                for (let ccc = 0; ccc < Eextra; ccc++) {
                    let ran = Math.floor(Math.random() * amtE)
                    cardss.push(epicss[ran])
                }
            }
            if (Uextra > 0) {
                for (let m = 0; m < Uextra; m++) {
                    let ran = Math.floor(Math.random() * amtU)
                    cardss.push(ultrass[ran])
                }
            }
            if (Lextra > 0) {
                for (let m = 0; m < Lextra; m++) {
                    let ran = Math.floor(Math.random() * amtL)
                    cardss.push(legendaryss[ran])
                }
            }
            let mes = 'From your rare crate: \n```diff\n'
            for (let c = 0; c < cardss.length; c++) {
                mes = `${mes}+ 1 ${cardss[c].split('_').join(" ")} \n`
            }
            for (let ddd = 0; ddd < cardss.length; ddd++) {
                let texts: string = `UPDATE cards SET ${cardss[ddd]}count = ${cardss[ddd]}count + 1 WHERE id = '${message.author.id}'`
                await db.query(texts);
            }
            mes = mes + '```'
            message.author.send(mes)
            let messa = `UPDATE cards SET rare = rare - 1 WHERE id = '${message.author.id}'`
            return await db.query(messa)
        }
        if (args[1] === 'jumbo' && (jumbos !== 0 && jumbos !== null && jumbos !== undefined)) {
            let Odds = Math.random()
            let Cextra = 4
            if (Odds <= .5 && Odds > .8) Cextra = 5
            if (Odds <= .8 && Odds > .95) Cextra = 7
            if (Odds <= .95) Cextra = 9
            let ROdds = Math.random()
            let Rextra = 3
            if (ROdds >= .635) Rextra = 5
            let EOdds = Math.random()
            let Eextra = 0
            if (EOdds >= .5) Eextra = 1
            if (EOdds > .6) Eextra = 2
            let UOdds = Math.random()
            let Uextra = 0
            if (UOdds > .8) Uextra = 1
            let LOdds = Math.random()
            let Lextra = 0
            if (LOdds > .98) Lextra = 1
            let cardss = []
            for (let hhh = 0; hhh < Cextra; hhh++) {
                let ran = Math.floor(Math.random() * amtC)
                cardss.push(commonss[ran])
            }
            for (let bbb = 0; bbb < Rextra; bbb++) {
                let ran = Math.floor(Math.random() * amtR)
                cardss.push(raress[ran])
            }
            if (Eextra > 0) {
                for (let ccc = 0; ccc < Eextra; ccc++) {
                    let ran = Math.floor(Math.random() * amtE)
                    cardss.push(epicss[ran])
                }
            }
            if (Uextra > 0) {
                for (let ccc = 0; ccc < Uextra; ccc++) {
                    let ran = Math.floor(Math.random() * amtU)
                    cardss.push(ultrass[ran])
                }
            }
            if (Lextra > 0) {
                for (let ccc = 0; ccc < Lextra; ccc++) {
                    let ran = Math.floor(Math.random() * amtL)
                    cardss.push(legendaryss[ran])
                }
            }
            for (let ddd = 0; ddd < cardss.length; ddd++) {
                let texts = `UPDATE cards SET ${cardss[ddd]}count = ${cardss[ddd]}count + 1 WHERE id = '${message.author.id}'`
                await db.query(texts)
            }
            let mes = 'From your jumbo crate: \n```diff\n'
            for (let eee = 0; eee < cardss.length; eee++) {
                mes = mes + `+1 ${cardss[eee].split('_').join(" ")} \n`
            }
            mes = mes + '```'
            message.author.send(mes)
            let messa = `UPDATE cards SET jumbo = jumbo - 1 WHERE id = '${message.author.id}'`
            return await db.query(messa)
        }
        if (args[1] === 'ultra' && (ultras !== 0 && ultras !== null && ultras !== undefined)) {
            let Odds = Math.random()
            let Cextra = 3
            if (Odds <= .5 && Odds > .8) Cextra = 4
            if (Odds <= .8 && Odds > .95) Cextra = 5
            if (Odds <= .95) Cextra = 6
            let ROdds = Math.random()
            let Rextra = 3
            if (ROdds >= .635) Rextra = 4
            let EOdds = Math.random()
            let Eextra = 2
            if (EOdds >= .45) Eextra = 3
            if (EOdds > .7) Eextra = 5
            let UOdds = Math.random()
            let Uextra = 1
            if (UOdds > .699) Uextra = 2
            let LOdds = Math.random()
            let Lextra = 0
            if (LOdds > .75) Lextra = 1
            let cardss = []
            for (let hhh = 0; hhh < Cextra; hhh++) {
                let ran = Math.floor(Math.random() * amtC)
                cardss.push(commonss[ran])
            }
            for (let bbb = 0; bbb < Rextra; bbb++) {
                let ran = Math.floor(Math.random() * amtR)
                cardss.push(raress[ran])
            }
            for (let ccc = 0; ccc < Eextra; ccc++) {
                let ran = Math.floor(Math.random() * amtE)
                cardss.push(epicss[ran])
            }
            for (let ccc = 0; ccc < Uextra; ccc++) {
                let ran = Math.floor(Math.random() * amtU)
                cardss.push(ultrass[ran])
            }
            if (Lextra > 0) {
                for (let ccc = 0; ccc < Lextra; ccc++) {
                    let ran = Math.floor(Math.random() * amtL)
                    cardss.push(legendaryss[ran])
                }
            }
            for (let ddd = 0; ddd < cardss.length; ddd++) {
                let texts = `UPDATE cards SET ${cardss[ddd]}count = ${cardss[ddd]}count + 1 WHERE id = '${message.author.id}'`
                await db.query(texts)
            }
            let mes = 'From your ultra crate: \n```diff\n'
            for (let eee = 0; eee < cardss.length; eee++) {
                mes = mes + `+1 ${cardss[eee].split('_').join(" ")} \n`
            }
            mes = mes + '```'
            message.author.send(mes)
            let messa = `UPDATE cards SET ultra = ultra - 1 WHERE id = '${message.author.id}'`
            return await db.query(messa)
        }
        if (args[1] === 'ledgendary' && (legendarys !== 0 && legendarys !== null && legendarys !== undefined)) {

            let Lextra = 1
            let cardss = []
            for (let ccc = 0; ccc < Lextra; ccc++) {
                let ran = Math.floor(Math.random() * amtL)
                cardss.push(legendaryss[ran])
            }
            for (let ddd = 0; ddd < cardss.length; ddd++) {
                let texts = `UPDATE cards SET ${cardss[ddd]}count = ${cardss[ddd]}count + 1 WHERE id = '${message.author.id}'`
                await db.query(texts)
            }
            let mes = 'From your ledgendary crate: \n```diff\n'
            for (let eee = 0; eee < cardss.length; eee++) {
                mes = mes + `+1 ${cardss[eee].split('_').join(" ")} \n`
            }
            mes = mes + '```'
            message.author.send(mes)
            let messa = `UPDATE cards SET ledgendary = ledgendary - 1 WHERE id = '${message.author.id}'`
            return await db.query(messa)
        }
        let no = new Discord.RichEmbed
        no
            .setColor(error_red)
            .setDescription("Hey that dosent seem to be a crate type, do !crates to see crate types. It also might be that you have ran out of crates, do !crates to see")
            .setTimestamp()
            .setFooter(version)
        return message.channel.send(no)
    }
}