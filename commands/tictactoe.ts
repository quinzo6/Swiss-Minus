import SwissClient from "../SwissClient";
import { swiss_blue } from "../config";
import {
  Message,
  GuildMember,
  MessageCollector,
  CollectorFilter,
  MessageEmbed,
  ReactionEmoji,
  User,
  ReactionCollector
} from "discord.js";

export let name = "tictactoe";
export let description = "Play tictactoe with a friend or with the bot!";
export let aliases = ["ttt"];
export let cooldown = 10;

const reactions = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];

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
  args: string[]
) {
  const player1 = message.member;
  const player2 =
    message.mentions.members.first() || // First mention
    (message.guild.members.cache.get(args[0]) as GuildMember) || // User ID
    (message.guild.members.cache.find(
      m => m.user.username === args[0]
    ) as GuildMember) || // Username
    (message.guild.members.cache.find(
      m => m.nickname === args[0]
    ) as GuildMember) || // Nickname
    message.guild.me; // Bot
  if (player1 === player2)
    return message.channel.send(`You can't play with yourself`);
  if (player2 !== message.guild.me) {
    message.channel.send(
      `<@${player2.user.id}>, do you want to play tictactoe with <@${player1.user.id}>? Respond with \`yes\` if you want to continue, otherwise respond with \`no\` to this message.`
    );
    message.channel.startTyping(60000);
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
  var currentPlayer = player2;
  var embed = new MessageEmbed()
    .setAuthor("Tic Tac Toe", client.user.displayAvatarURL())
    .setColor(swiss_blue);
  var stop = false;
  const gameMsg = await message.channel.send("Preparing the board...");
  const board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
  await Promise.all(reactions.map(r => gameMsg.react(r)));
  function parseSign(sign: string): string {
    var finalSign = "◼️";
    if (sign === player1.user.id) finalSign = "❌";
    if (sign === player2.user.id) finalSign = "⭕";
    return finalSign;
  }
  function updateGameEmbed() {
    embed
      .setTitle(`${currentPlayer.user.tag}'s turn`)
      .setDescription(
        [
          `${parseSign(board[0])}|${parseSign(board[1])}|${parseSign(
            board[2]
          )}`,
          `${parseSign(board[3])}|${parseSign(board[4])}|${parseSign(
            board[5]
          )}`,
          `${parseSign(board[6])}|${parseSign(board[7])}|${parseSign(board[8])}`
        ].join("\n")
      );
  }
  function findWinner(): string {
    var winner = "";
    return winner;
  }
  loop();
  async function loop() {
    if (currentPlayer === player2) currentPlayer = player1;
    else if (currentPlayer === player1) currentPlayer = player2;
    updateGameEmbed();
    await gameMsg.edit(" ", embed);
    message.channel.startTyping(60000);
    const collector = new ReactionCollector(
      gameMsg,
      (r, u) =>
        gameMsg.reactions.cache.array().includes(r) &&
        u.id === currentPlayer.id,
      {
        time: 60000
      }
    );

    collector.on("collect", reaction => {
      message.channel.stopTyping(true);
      collector.endReason();
      board[reactions.indexOf(reaction.emoji.name)] = currentPlayer.id;
      reaction.remove();
      const winner = findWinner();
      if (winner === "draw") {
        stop = true;
        updateGameEmbed();
        embed.setTitle("Its a draw!");
        gameMsg.edit(" ", embed);
        return;
      }
      if (winner !== "") {
        stop = true;
        updateGameEmbed();
        embed.setTitle(`${winner} won!`);
        gameMsg.edit(" ", embed);
        return;
      }
      if (!stop) {
        loop();
      }
    });

    collector.on("end", collected => {
      if (collected.size === 0) {
        const timeout = new MessageEmbed()
          .setColor(swiss_blue)
          .setFooter("GG")
          .setTimestamp();
        if (currentPlayer === player1) {
          timeout.setTitle(`${player2.user.tag} won!`);
          gameMsg.edit(
            `<@${player2.user.id}> won because <@${player1.user.id}> timed out!`,
            timeout
          );
        } else {
          timeout.setTitle(`${player1.user.tag} won!`);
          gameMsg.edit(
            `<@${player1.user.id}> won because <@${player2.user.id}> timed out!`,
            timeout
          );
        }
        stop = true;
        message.channel.stopTyping(true);
      }
    });
  }
}
