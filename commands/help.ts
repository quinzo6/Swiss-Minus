import { Message, MessageEmbed } from "discord.js";
import SwissClient from "../SwissClient";
import { getSetting } from "../index";
import { swiss_blue } from "../config";
import { error_red } from "../config";
import { version } from "../package.json";

export let name = "help";
export let description =
  "List all of my commands or info about a specific command.";
export let aliases = ["commands"];
export let usage = "[command name]";
export let cooldown = 5;

export async function execute(
  client: SwissClient,
  message: Message,
  args: string[]
) {
  const { commands } = client;

  if (!args.length) {
    const categories = {};
    const prefix = await getSetting("prefix");
    client.commands.map(command => {
      if (!Object.keys(categories).includes(command.category)) {
        if (categories[command.category] === undefined)
          categories[command.category] = [];
      }
      categories[command.category].push(`${command.name}`);
    });
    const helpEmbed = new MessageEmbed()
      .setTitle("Help!")
      .setColor(swiss_blue)
      .setAuthor(message.author.tag, message.author.avatarURL())
      // .addField("Commands:", `${cmds}`)
      .setFooter(version)
      .setTimestamp();
    Object.keys(categories).forEach(key => {
      helpEmbed.addField(
        `${key} : ${categories[key].length} commands`,
        `\`${prefix}${categories[key].join(`\`, \`${prefix}`)}\``
      );
    });
    helpEmbed.addField(
      "Tip:",
      `You can send \`${prefix}help [command name]\` to get info on a specific command!`
    );
    return message.author
      .send(helpEmbed)
      .then(() => {
        if (message.channel.type === "dm") return;
        message.reply("I've sent you a DM with all my commands!");
      })
      .catch(error => {
        const embed = new MessageEmbed()
          .setTitle("Error!")
          .setAuthor(message.author.tag, message.author.avatarURL())
          .setColor(error_red)
          .setTitle("Error")
          .setDescription(
            "Unable to send you a dm with my commands! This may be because your dms are turned off. Please try again later."
          )
          .addField("Error:", error)
          .setFooter(version)
          .setTimestamp();
        message.channel.send(embed);
      });
  }

  const name = args[0].toLowerCase();
  // eslint-disable-next-line max-len
  const command =
    commands.get(name) ||
    commands.find(c => c.aliases && c.aliases.includes(name));

  if (!command) {
    const nValidComm = new MessageEmbed()
      .setTitle("Error!")
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setColor(error_red)
      .addField("Invalid Command!", "The Command you put in is invalid!")
      .setFooter(version)
      .setTimestamp();
    return message.reply(nValidComm);
  }

  const cmdName = `${command.name}`;
  const cmd = new MessageEmbed()
    .setTitle("Help")
    .setAuthor(message.author.tag, message.author.avatarURL())
    .addField("Command:", cmdName);

  if (command.aliases) {
    const alli = `${command.aliases.join(", ")}`;
    cmd.addField("Aliases:", alli);
  }
  if (command.description) {
    const description1 = `${command.description}`;
    cmd.addField("Description", description1);
  }
  if (command.usage) {
    const usage = `!${command.name} ${command.usage}`;
    cmd.addField("Usage:", usage);
  }
  const cmdCoolDown = `${command.cooldown || 3} second(s)`;
  cmd.addField("Cooldown:", cmdCoolDown);
  cmd.setFooter(version).setTimestamp();
  return message.channel.send(cmd);
}
