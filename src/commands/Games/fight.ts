import SwissClient from "../../SwissClient";
import {
    swiss_blue
} from "../../config";
import {
    Message,
    GuildMember,
    MessageEmbed,
    ReactionCollector,
    MessageReaction,
    User
} from "discord.js";
import {
    awaitMessage,
    getRandom
} from "../../utils";

export let name = "fight";
export let description = "Fight another user!";
export let aliases = ["f"];
export let usage = "<user>";
export let cooldown = 5

export async function execute(
client: SwissClient,
message: Message,
args: string[]
) {
if (!args[0]) {
    return message.channel.send('You need to mention someone!')
}

let user1 = message.author
let user2 = message.mentions.members.first() || //mention
    message.guild.members.cache.get(args[0]) //ID
if (user1 === user2.user) {
    return message.channel.send('Hey, you can\'t fight your self!')
}
if (user2.user.bot) {
    return message.channel.send('A bot can\'t play with you!')
}
let fightMessage
const pt1 = user1.tag
const pt2 = user2.user.tag
    message.channel.send(
      `<@${user2.user.id}>, do you want to play tictactoe with <@${user1.id}>? Respond with \`yes\` if you want to continue, otherwise respond with \`no\` to this message.`
    );
    message.channel.startTyping(60000);
    const response = await awaitMessage(
      message,
      m =>
      m.author.id === user2.user.id && ["yes", "no"].includes(m.content.toLowerCase())
    );
    message.channel.stopTyping(true);
    if (!response) return message.channel.send('Oops, your time ran out')
    if (response.content.toLowerCase() === "no") return
let p1h = {
    hth: 100,
    set heth(h) {
        this.hth = h
    },
    get health() {
        return this.hth
    }
}
let p2h = {
    hth: 100,
    set heth(h) {
        this.hth = h
    },
    get health() {
        return this.hth
    }
}
let st
let ot
let rnd = Math.random()
if(rnd < .5) st = pt1, ot = pt2
if(rnd >= .5) st = pt2, ot = pt1
let activeP = {
    person: st,
    set psn(p) {
        this.person = p
    },
    get pson() {
        return this.person
    }
}
let offP = {
    person: ot,
    set psn(p) {
        this.person = p
    },
    get pson() {
        return this.person
    }
}
let change = {
    chg: 0,
    set chag(c) {
        this.chg = c
    },
    get change() {
        return this.chg
    }
}
let rmessage = {
    msag: 'If you see this, something went wrong.',
    set msg(m) {
        this.msag = m
    },
    get mesg() {
        return this.msag
    }

}
let embed = new MessageEmbed
embed
    .setTitle('Fight!')
    .setDescription(`Its ${activeP.pson}'s Turn`)
    .addField(`${pt1}'s health:`, p1h.health)
    .addField(`${pt2}'s health:`, p2h.health)
    .addField('\u200B', '\u200B')
    .setColor(swiss_blue)
    .setTimestamp()
    .setFooter(client.version)
await message.channel.send(embed)
    .then((msg) => {
        fightMessage = msg
    })
let damage = () => {
    let aT = Math.floor(Math.random() * 10)
    let damage: number = Math.floor(Math.random() * 100)
    let attacks = [
        `${activeP.pson} punches ${offP.pson} for ${damage} damage.`,
        `${activeP.pson} runs over ${offP.pson} for ${damage} damage.`,
        `${activeP.pson} stabs ${offP.pson} for ${damage} damage.`,
        `${activeP.pson} throws ${offP.pson} into a river for ${damage} damage.`,
        `${activeP.pson} knees ${offP.pson} for ${damage} damage.`,
        `${activeP.pson} shoots ${offP.pson} with a pistol for ${damage} damage.`,
        `${activeP.pson} shoots ${offP.pson} with a AK-47 for ${damage} damage.`,
        `${activeP.pson} hurts ${offP.pson} with words for ${damage} damage.`,
        `${activeP.pson} drowns ${offP.pson} for ${damage} damage.`,
        `${activeP.pson} throws a anvil at ${offP.pson} for ${damage} damage.`
    ]
    return change.chag = damage, rmessage.msg = attacks[aT]
}
let heal = () => {
    let hT = Math.floor(Math.random())
    let healed: number = Math.floor(Math.random() * 75)
    let heals = [
        `${activeP.pson} throws a potion and heals ${healed} health!`,
        `${activeP.pson} eats a medkid and heals ${healed} health!`,
        `${activeP.pson} shots a addrelain into them self and heals ${healed} health`,
        `${activeP.pson} eats a golden apple and heals ${healed} health.`,
        `${activeP.pson} drinks a glass of GFuel and heals ${healed} health`
    ]
    return change.chag = healed, rmessage.msg = heals[hT]
}
let steal = () => {
    let sT = Math.floor(Math.random())
    let stolen: number = Math.floor(Math.random() * 50)
    let steals = [
        `${activeP.pson} steals ${stolen} health from ${offP.pson}`
    ]
    return change.chag = stolen, rmessage.msg = steals[sT]
}
await new Promise(res => {
    setInterval(() => {
        if (p1h.health <= 0 || p2h.health <= 0) {
        clearInterval()
        res()
        }
        let action = Math.floor(Math.random() * 10)
        if (action > 5) {
            damage()
            if (activeP.pson === pt1) {
                p2h.heth = (p2h.health - change.change)
                embed.fields[1].value = p2h.hth.toString()
                activeP.psn = pt2
                offP.psn = pt1
            } else {
                p1h.heth = (p1h.health - change.change)
                embed.fields[0].value = p1h.hth.toString()
                activeP.psn = pt1
                offP.psn = pt2
            }
            embed.setTitle(activeP.pson)
            embed.fields[2].value = rmessage.msag
            return fightMessage.edit(
                embed
            )
        }
        if (action <= 5 && action > 8) {
            heal()
            if (activeP.pson === pt2) {
                p2h.heth = (p2h.health + change.change)
                embed.fields[1].value = p2h.hth.toString()
                activeP.psn = pt1
                offP.psn = pt2
            } else {
                p1h.heth = (p1h.health + change.change)
                embed.fields[0].value = p1h.hth.toString()
                activeP.psn = pt2
                offP.psn = pt1
            }
            embed.setTitle(activeP.pson)
            embed.fields[2].value = rmessage.msag
            return fightMessage.edit(
                embed
            )
        }
        if (action === 8 || action === 9) {
            steal()
            if (activeP.pson === pt1) {
                p2h.heth = (p2h.health - change.change)
                p1h.heth = (p1h.health + change.change)
                embed.fields[1].value = p2h.hth.toString()
                embed.fields[0].value = p1h.hth.toString()
                activeP.psn = pt2
                offP.psn = pt1
            } else {
                p1h.heth = (p1h.health - change.change)
                p2h.heth = (p2h.health + change.change)
                embed.fields[0].value = p1h.hth.toString()
                embed.fields[1].value = p2h.hth.toString()
                activeP.psn = pt1
                offP.psn = pt2
            }
            embed.setTitle(activeP.pson)
            embed.fields[2].value = rmessage.msag
            return fightMessage.edit(
                embed
            )
        }
    }, 3000)
})
if (p1h.health < 1) {
    fightMessage.delete().then(message.channel.send(`${pt2} was sent to the hospitol. ${pt1} won!`))
}
if (p2h.health < 1) {

    fightMessage.delete().then(message.channel.send(`${pt2} was sent to the hospitol. ${pt1} won!`))
}
}
