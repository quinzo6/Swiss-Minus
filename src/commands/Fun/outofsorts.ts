import SwissClient from "../../SwissClient";
import { MessageAttachment, Message } from "discord.js";

export let name = "randomize";
export let aliases = ["r"];

export async function execute(
  client: SwissClient,
  message: Message,
  args: string[]
) {
    let msg: any = args.join(' ')
    msg = msg.toLowerCase()
    msg = msg.split('')
    for (let a = 0; msg.length > a; a++){
     let b = Math.random()
     if(b < 0.5) msg[a] = msg[a].toLowerCase()
     else msg[a] = msg[a].toUpperCase()
    }
    msg = msg.join('')
    message.channel.send(msg)
}