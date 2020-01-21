/* eslint-disable consistent-return */
/* eslint-disable global-require */
import fs from "fs";
import Discord, {Collection} from "discord.js";
import { config as dotenv_config } from "dotenv";

dotenv_config();

const dev = process.env.NODE_ENV === "dev";

const client = new Discord.Client();
//@ts-ignore
client.commands = new Discord.Collection();
const prefix = dev ? '?' : '!';
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith(dev ? '.ts' : '.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  if(dev) {
    console.log(`Loading in ${command.name}`);
  }
  //@ts-ignore
  client.commands.set(command.name, command);
}

const cooldowns: Collection<string, Collection<string, number>> = new Discord.Collection();

client.on('message', async (message) => {
  if (message.isMentioned(client.user.id)) {
    const embed = new Discord.RichEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setTitle('Prefix')
      .setColor('#4DF8E8')
      .addField('Prefix', ` <@${message.author.id}>, Looks like you forgot my prefix. **My Prefix is: ${prefix}**.`);
    return await message.channel.send(embed);
  }
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);

  const commandName = args.shift().toLowerCase();

  //@ts-ignore
  const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
  if (!args[0] && !commandName) return;
  if (!command) {
    const embed = new Discord.RichEmbed()
      .setTitle('Invalid Command!')
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setColor('#E80C0C')
      .addField('Invalid Command!', `Hey ${message.author}, That doesn't seem to be a command!`);
    return await message.channel.send(embed);
  }

  if (command.guildOnly && message.channel.type !== 'text') {
    const embed = new Discord.RichEmbed()
      .setTitle('Error')
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setColor('#E80C0C')
      .setDescription("This command can't be used in direct messages!");
    return await message.channel.send(embed);
  }

  if (command.args && !args.length) {
    const embed = new Discord.RichEmbed()
      .setTitle('Argument')
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setColor('#E80C0C')
      .addField('Error', "You didn't provide any arguments!");
    if (command.usage) {
      const pUsage = `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
      embed.addField('Usage:', `The proper usage would be ${pUsage} `);
    }
    return await message.channel.send(embed);
  }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      const timeOut = new Discord.RichEmbed();
      timeOut
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle('Cooldown has Not finished')
        .addField('Error', `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)
        .setColor('#E80C0C');
      return message.channel.send(timeOut);
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(client, message, args);
  } catch (error) {
    const userMen = message.author.id;
    // eslint-disable-next-line no-console
    console.error(error);
    const err = new Discord.RichEmbed();
    err
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setTitle('An Error Occurred')
      .setColor('#E80C0C')
      .addField('Attention!', `Hey, <@${userMen}>`)
      .addField('Error', `A error occurred. Error: ${error}`);
    return await message.channel.send(err);
  }
});
client.login(process.env.token).then(async _token => {
  console.log(`Ready as ${client.user.tag}`);
  await client.user.setActivity(`Serving ${client.guilds.size} servers`);
});
