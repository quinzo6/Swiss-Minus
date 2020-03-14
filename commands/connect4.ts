import SwissClient from "../SwissClient";
import {
    Message,
    GuildMember,
    MessageCollector,
    CollectorFilter,
    MessageEmbed,
    ReactionCollector
  } from "discord.js";
  import { swiss_blue } from "../config";

  export let name = "connect4";
  export let description = "Play connect4 with a friend."
  export let aliases = ["c4"];
  export let usage = "[user]"
  export let cooldown = 120;

  const reactions = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣"];

  async function awaitMessage(message: Message, filter: CollectorFilter) {
    let promise = new Promise((resolve, reject) => {
      let x = new MessageCollector(message.channel, filter, { time: 60000 });
      x.on("collect", msg => {
        resolve(msg);
      });
      x.on("end", a => {
        reject(a);
      });
    });
    return await promise
      .then(function(msg: Message) {
        return msg;
      })
      .catch(function(b) {
        message.channel.send("Oops, your time ran out!");
        return null;
      });
  }

  export async function execute(
    client: SwissClient,
    message: Message,
    args : string[]
  ) {
    const player1 = message.member;
    const player2 =
    message.mentions.members.first() || 
    (message.guild.members.cache.get(args[0]) as GuildMember) || 
    (message.guild.members.cache.find(
      m => m.user.username === args[0]
    ) as GuildMember) ||
    (message.guild.members.cache.find(
      m => m.nickname === args[0]
    ) as GuildMember);
   
    if(player2.user.bot) 
      return message.channel.send("You can't play with another bot.")
    if(player2 == player1)
      return message.channel.send("You can't play with yourself.")    
    
      message.channel.send(
        `<@${player2.user.id}>, do you want to play tictactoe with <@${player1.user.id}>? Respond with \`yes\` if you want to continue, otherwise respond with \`no\` to this message.`);
        const response = await awaitMessage(
          message,
          m =>
            m.author.id === player2.user.id &&
            ["yes", "no"].includes(m.content.toLowerCase())
        );
        message.channel.stopTyping(true);
        if (response.content.toLowerCase() === "no")
          return message.channel.send(
            `<@${player1.user.id}> won because <@${player2.user.id}> gave up before the game even started!`
          );
      
  }