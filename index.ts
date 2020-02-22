/* eslint-disable consistent-return */
/* eslint-disable global-require */
import fs from "fs";
import Discord, {
  Collection,
  TextChannel,
  Emoji,
  Message,
  RichEmbed
} from "discord.js";
import {
  Client as PgClient
} from "pg";
import {
  config as dotenv_config
} from "dotenv";
import {
  version
} from './package.json'
import {
  swiss_blue,
  log_yellow,
  error_red
} from "./config";

dotenv_config();

const dev = process.env.NODE_ENV === "dev";
import planes from "./planes"
const aplanes = Object.values(planes)
const db = new PgClient({
  connectionString: dev ? process.env.dev_db_url : process.env.DATABASE_URL,
  ssl: true
});
db.connect().then(_ => {
  console.log("Connected to database.")
});
const client = new Discord.Client();
//@ts-ignore
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith(dev ? '.ts' : '.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  if (dev) {
    console.log(`Loading in ${command.name}`);
  }
  //@ts-ignore
  client.commands.set(command.name, command);
}
let count: number
let lengthe = aplanes.length
const forloop = async _ => {
  for (count = 1; lengthe * 2 > (((await db.query("SELECT count(*) FROM information_schema.columns WHERE table_name = 'cards'")).rows[0].count - 8) as number); count ++){
    let levels = planes[count].name + 'levels'
    let counts = planes[count].name + 'count'
    let textl = `ALTER TABLE cards ADD COLUMN IF NOT EXISTS ${levels} int`
    let textc = `ALTER TABLE cards ADD COLUMN IF NOT EXISTS ${counts} int`
    await db.query(textl)
    await db.query(textc)
  } 
}
forloop('_')
const cooldowns: Collection < string, Collection < string, number >> = new Discord.Collection();
client.on('emojiCreate', async (emoji: Emoji) => {
  let swissGeneral = client.channels.get('592463507124125706') as TextChannel
  let swissLogs = client.channels.get('592805129003073570') as TextChannel
  let testlogs = client.channels.get('674624372170031145') as TextChannel
  let emojigeneral = new Discord.RichEmbed() as RichEmbed
  let emojilog = new Discord.RichEmbed() as RichEmbed
  emojigeneral
    .setImage(emoji.url)
    .setDescription('Ooo, a new emoji!')
    .setTimestamp()
    .setFooter(version)
    .setColor(swiss_blue)
  swissGeneral.send(emojigeneral)
  emojilog
    .setDescription(`A emoji was added by <@${(await emoji.fetchAuthor()).id}>. Emoji ID: ${emoji.id}`)
    .setColor(log_yellow)
    .setFooter(version)
    .setTimestamp()
  swissLogs.send(emojilog)
  return testlogs.send(emojilog)
})
client.on('emojiDelete', async (emoji: Emoji) => {
  let swissLogs = client.channels.get('592805129003073570') as TextChannel
  let testlogs = client.channels.get('674624372170031145') as TextChannel
  let emojilog = new Discord.RichEmbed() as RichEmbed
  const log = (await emoji.guild.fetchAuditLogs({
    limit: 1,
    type: 62
  })).entries.first().executor.id
  emojilog
    .setDescription(`A emoji was deleted by <@${log}>.`)
    .setColor(log_yellow)
    .setFooter(version)
    .setTimestamp()
  swissLogs.send(emojilog)
  return testlogs.send(emojilog)
})


client.on('message', async (message) => {
  if ((message.channel as TextChannel).parentID === "606557115758411807") return
  if(message.channel.type === 'dm'){
    let dmlogs = client.channels.get('680608961019510831') as TextChannel
    let embed = new Discord.RichEmbed
    embed
    .setColor(log_yellow)
    .setTitle('New DM!')
    .setDescription(`From <@${message.author.id}>: ${message.content}`)
    .setTimestamp()
    .setFooter(version)
    dmlogs.send(embed)
  }
  const prefix = dev ? '?' : await getSetting('prefix');
  if (message.isMentioned(client.user.id)) {
    const embed = new Discord.RichEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setTitle('Prefix')
      .setColor(swiss_blue)
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
      .setColor(error_red)
      .addField('Invalid Command!', `Hey ${message.author}, That doesn't seem to be a command!`);
    return await message.channel.send(embed);
  }

  if (command.guildOnly && message.channel.type !== 'text') {
    const embed = new Discord.RichEmbed()
      .setTitle('Error')
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setColor(error_red)
      .setDescription("This command can't be used in direct messages!");
    return await message.channel.send(embed);
  }
  if (command.args && !args.length) {
    const embed = new Discord.RichEmbed()
      .setTitle('Argument')
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setColor(error_red)
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
        .setColor(error_red);
      return message.channel.send(timeOut);
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(client, message, args, db);
    let embed = new Discord.RichEmbed as RichEmbed
    embed
    .setColor(log_yellow)
    .setDescription(`The command ${commandName} was used by <@${message.author.id}>. The whole message was ${message}`)
    .setTimestamp()
    .setFooter(version)
    let channel = client.channels.get('677356042723524608') as TextChannel
    channel.send(embed)
  } catch (error) {
    const userMen = message.author.id;
    // eslint-disable-next-line no-console
    console.error(error);
    const err = new Discord.RichEmbed();
    err
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setTitle('An Error Occurred')
      .setColor(error_red)
      .addField('Attention!', `Hey, <@${userMen}>`)
      .addField('Error', `A error occurred. Error: ${error}`);
    return await message.channel.send(err);
  }
});
client.login(process.env.token).then(async _token => {
  console.log(`Ready as ${client.user.tag}`);
  client.user.setActivity(`the ${version} update` , { type: 'WATCHING' })
  .then()
  .catch(console.error);});

export async function getSetting(name: string) {
  const res = await db.query("SELECT value FROM settings WHERE name = $1", [name]);
  return res.rows[0].value;
}