import Discord, {
    Client,
    Message,
    TextChannel,
    MessageEmbed,
    ClientUser,
    UserManager,
    Collection
} from "discord.js";
import {
    getSetting
} from "../index";
import {
    swiss_blue
} from "../config";
import {
    error_red
} from "../config"
import {
    log_yellow
} from "../config"
import {
    version
} from '../package.json'
import {
    resolve
} from "dns";

export let name = 'poll';
export let description = 'creates a poll';
export let usage = '[channel][option 1] ; [option 2] ; <option 3> up to 10 options';
export let cooldown = 5;
export async function execute(client: Client, message: Message, args: string[]) {
    let timeout
    let poll = new Discord.MessageEmbed
    poll
    .setColor(swiss_blue)
    .setFooter(version)
    let mentionedChannel
    let channelAsk = new Discord.MessageEmbed
    channelAsk
        .setColor(swiss_blue)
        .setFooter(version)
        .setTimestamp()
        .setDescription('Reply with what channel you want this poll to be in?')
    await message.channel.send(channelAsk)
    let channelP = new Promise((resolve, reject) => {
        let channelCo = new Discord.MessageCollector(message.channel, m => m.author === message.author, {
            time: 60000
        });
        channelCo.on('collect', msg => {
            resolve(msg);
        });
        channelCo.on('end', msg => {
            reject('You ran out of time!')
        });
    })
    await channelP
        .then(function (msg: Message) {
            if(msg === undefined) return
            if (!msg.mentions.channels.first()) return
            mentionedChannel = msg.mentions.channels.first()
        })
        .catch(function (x) {
            if(timeout === true) return
            message.channel.send('Oops, time ran out!')
        })
    let question
    let questionEmbed = new Discord.MessageEmbed
    questionEmbed
    .setColor(swiss_blue)
    .setFooter(version)
    .setTimestamp()
    .setDescription(`Ok, you want it to be in <#${mentionedChannel.id}>.What should the question be?`)
    await message.channel.send(questionEmbed)
    let questionP = new Promise((resolve, reject) => {
        let x = new Discord.MessageCollector(message.channel, m => m.author === message.author, {time: 60000})
        x.on('collect', msg => {
            resolve(msg)
        })
        x.on('end', a => {
            reject(a)
        })
    })
    await questionP
    .then(function (msg: Message) {
        if(msg === undefined) return
        question = msg.content
        poll
        .setTitle(msg.content)
    })
    .catch(function (b) {
        timeout = true
        message.channel.send('Oops, your time ran out!')
    })
    if(timeout === true) return
    let oneOption
    let oneEmbed = new Discord.MessageEmbed
    oneEmbed
        .setColor(swiss_blue)
        .setFooter(version)
        .setTimestamp()
        .setDescription(`Ok you want the question to be \`${question}\`, what should the first option be?`)
    await message.channel.send(oneEmbed)

    let firstO = new Promise((resolve, reject) => {
        let oneCo = new Discord.MessageCollector(message.channel, (m: {
            author: Discord.User;
        }) => m.author === message.author, {
            time: 60000
        })
        oneCo.on('collect', msg => {
            resolve(msg)
        })
        oneCo.on('end', collected => {
            reject('')
        })
    })
    await firstO
        .then(function (msg: Message) {
            if(msg === undefined) return
            oneOption = msg.content
            poll
            .addField('1️⃣', msg.content)
        })
        .catch(
            function (x) {
                timeout = true
                return message.channel.send('Oops, your time ran out!')
            }
        )
        console.log(timeout)
        if(timeout === true) return

    let twoOption
    let twoEmbed = new Discord.MessageEmbed
    twoEmbed
    .setColor(swiss_blue)
    .setFooter(version)
    .setTimestamp()
    .setDescription(`Ok, so option one is \`${oneOption}\`. What should the second one be?`)
    await message.channel.send(twoEmbed)
    let secondO = new Promise((resolve, reject) => {
        let x = new Discord.MessageCollector(message.channel, m => m.author === message.author, {time: 60000})
        x.on('collect', msg => {
            resolve(msg)
        })
        x.on('end', msg => {
            reject('')
        })
    })
    await secondO
    .then(function(msg: Message) {
        if(msg === undefined) return
        twoOption = msg.content
        poll
        .addField('2️⃣', msg.content)
    })
    .catch(function(x) {
        timeout = true
        message.channel.send('Oops, your time ran out!')
    })
    if(timeout === true) return

    let threeOption
    let threeEmbed = new Discord.MessageEmbed
    threeEmbed
    .setColor(swiss_blue)
    .setFooter(version)
    .setTimestamp()
    .setDescription(`Ok, so option two is \`${twoOption}\`. What should the third one be? \n To finish, say \`finish\``)
    await message.channel.send(threeEmbed)
    let thirdO = new Promise((resolve, reject) => {
        let x = new Discord.MessageCollector(message.channel, m => m.author === message.author, {time: 60000})
        x.on('collect', msg => {
            resolve(msg)
        })
        x.on('end', msg => {
            reject('')
        })
    })
    await thirdO
    .then(async function(msg: Message) {
        if(msg === undefined) return
        if(msg.content === 'finish' || msg.content === 'end'){
            poll.setTimestamp()
            await mentionedChannel.send(poll)
            .then(message => {
                message.react('1️⃣')
                return message.react('2️⃣')
            })
        }
        threeOption = msg.content
        poll.addField('3️⃣', msg.content)
    })
    .catch(function(x) {
        timeout = true
        message.channel.send('Oops, you ran out of time!')
    })
    if(timeout === true) return

    let fourOption
    let fourEmbed = new Discord.MessageEmbed
    fourEmbed
    .setColor(swiss_blue)
    .setFooter(version)
    .setTimestamp()
    .setDescription(`Ok, so option three is \`${threeOption}\`. What should the fourth one be? \n To finish, say \`finish\``)
    await message.channel.send(fourEmbed)
    let fourO = new Promise((resolve, reject) => {
        let x = new Discord.MessageCollector(message.channel, m => m.author === message.author, {time: 60000})
        x.on('collect', msg => {
            resolve(msg)
        })
        x.on('end', msg => {
            reject('')
        })
    })
    await fourO
    .then(async function(msg: Message) {
        if(msg === undefined) return
        if(msg.content === 'finish' || msg.content === 'end'){
            poll.setTimestamp()
            await mentionedChannel.send(poll)
            .then(message => {
                message.react('1️⃣')
                message.react('2️⃣')
                return message.react('3️⃣')
            })
        }
        fourOption = msg.content
        poll.addField('4️⃣', msg.content)
    })
    .catch(function(x) {
        timeout = true
        return message.channel.send('Oops, you ran out of time!')
    })
    let fiveOption
    let fiveEmbed = new Discord.MessageEmbed
    fiveEmbed
    .setColor(swiss_blue)
    .setFooter(version)
    .setTimestamp()
    .setDescription(`Ok, so option four is \`${fourOption}\`. What should the last one be? To finish say \`finish\``)
    await message.channel.send(fiveEmbed)
    let fiveO = new Promise((resolve, reject) => {
        let x = new Discord.MessageCollector(message.channel, m => m.author === message.author, {time: 60000})
        x.on('collect', msg => {
            resolve(msg)
        })
        x.on('end', msg => {
            reject('')
        })
    })
    await fiveO
    .then(async function(msg: Message) {
        if(msg === undefined) return
        if(msg.content === 'finish' || msg.content === 'end'){
            poll.setTimestamp()
            await mentionedChannel.send(poll)
            .then(message => {
                message.react('1️⃣')
                message.react('2️⃣')
                message.react('3️⃣')
                return message.react('4️⃣')
            })
        }
        fiveOption = msg.content
        poll.addField('5️⃣', msg.content).setTimestamp()
        await mentionedChannel.send(poll)
        .then(message => {
            message.react('1️⃣')
            message.react('2️⃣')
            message.react('3️⃣')
            message.react('4️⃣')
            return message.react('5️⃣')
        })
    })
    .catch(function(x) {
        return message.channel.send('Oops, you ran out of time!')
    })
}