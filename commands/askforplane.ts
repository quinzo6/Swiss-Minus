import Discord, {
    Client,
    Message,
    TextChannel,
    RichEmbed
} from "discord.js";
import randomPuppy from "random-puppy";
const subreddits = require('./subreddits.json');
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




export let name = "askforplane";
export let cooldown = 10;
export async function execute(client: Client, message: Message, args: string[]) {
    if (message.author.id !== '660238973943152707') return
    let plane = args[0]
    let lowerarity = args[1]
    let higherarity = args[2]
    let embed = new Discord.RichEmbed as RichEmbed
    embed
        .setColor(swiss_blue)
        .setDescription(`Should the ${plane} be a ${lowerarity} (:one:) or ${higherarity} (:two:)`)
        .setFooter(version)
        .setTimestamp()
    let chanel = client.channels.get('592463507124125706') as TextChannel
    await chanel.send(embed)
    client.user.lastMessage.react('2️⃣')
    .then()
    .catch(console.error)
    client.user.lastMessage.react('1️⃣')
    .then()
    .catch(console.error)
}