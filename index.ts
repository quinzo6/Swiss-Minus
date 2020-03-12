/* eslint-disable consistent-return */
/* eslint-disable global-require */
import fs from "fs";
import {
  Collection,
  TextChannel,
  MessageEmbed,
  Client,
  ClientOptions
} from "discord.js";
import { Client as PgClient } from "pg";
import { config as dotenv_config } from "dotenv";
import { version } from "./package.json";
import { log_yellow, error_red } from "./config";
// import yt from "simple-youtube-api";
// import ffmpeg from "ffmpeg-static";
// import opus from "node-opus";
// import ytdl from "ytdl-core";
dotenv_config();

const dev = process.env.NODE_ENV === "dev";
import planes from "./planes";
const aplanes = Object.values(planes);
const db = new PgClient({
  connectionString: dev ? process.env.dev_db_url : process.env.DATABASE_URL,
  ssl: true
});
db.connect().then(_ => {
  console.log("Connected to database.");
});

interface SwissOptions {
  db: PgClient;
}
class SwissClient extends Client {
  public db: PgClient;
  public commands: Collection<string, any>;

  public constructor(options: SwissOptions, discordOptions: ClientOptions) {
    super(discordOptions);
    this.db = options.db;
    this.commands = new Collection();
  }
}
const client = new SwissClient({ db }, {});
const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(dev ? ".ts" : ".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  if (dev) {
    console.log(`Loading in ${command.name}`);
  }
  //@ts-ignore
  client.commands.set(command.name, command);
}
let count: number;
let lengthe = aplanes.length;
const forloop = async (_: string) => {
  for (
    count = 1;
    lengthe * 2 >
    (((
      await db.query(
        "SELECT count(*) FROM information_schema.columns WHERE table_name = 'cards'"
      )
    ).rows[0].count - 8) as number);
    count++
  ) {
    let levels = planes[count].name + "levels";
    let counts = planes[count].name + "count";
    let textl = `ALTER TABLE cards ADD COLUMN IF NOT EXISTS ${levels} int`;
    let textc = `ALTER TABLE cards ADD COLUMN IF NOT EXISTS ${counts} int`;
    await db.query(textl);
    await db.query(textc);
  }
};
forloop("_");
const cooldowns: Collection<
  string,
  Collection<string, number>
> = new Collection();

client.on("message", async message => {
  if ((message.channel as TextChannel).parentID === "606557115758411807")
    return;
  if (message.channel.type === "dm" && message.author.id !== client.user.id) {
    let dmlogs = client.channels.cache.get("680608961019510831") as TextChannel;
    let embed = new MessageEmbed();
    embed
      .setColor(log_yellow)
      .setTitle("New DM!")
      .setDescription(`From <@${message.author.id}>: ${message.content}`)
      .setTimestamp()
      .setFooter(version);
    dmlogs.send(embed);
  }
  const prefixes = [
    dev ? "?" : await getSetting("prefix"),
    `<@${client.user.id}>`
  ];
  if (
    !prefixes.some(prefix => message.content.startsWith(prefix)) ||
    message.author.bot
  )
    return;
  const prefix = prefixes.find(prefix => message.content.startsWith(prefix));
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);

  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd: { aliases: string | string[] }) =>
        cmd.aliases && cmd.aliases.includes(commandName)
    );
  if (!args[0] && !commandName) return;
  if (!command) return;

  if (command.guildOnly && message.channel.type !== "text") {
    const embed = new MessageEmbed()
      .setTitle("Error")
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setColor(error_red)
      .setDescription("This command can't be used in direct messages!");
    return await message.channel.send(embed);
  }

  const on =
    (command.canBeOff ? await getSetting(command.name) : "on") === "on";
  if (!on) {
    const notOn = new MessageEmbed()
      .setTitle(message.author.tag)
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setColor(error_red)
      .addField(
        "I'm Not On!",
        "This command it turned off! Please ask a mod or admin to turn it back on!"
      )
      .setFooter(version)
      .setTimestamp();
    return await message.channel.send(notOn);
  }

  if (command.args && !args.length) {
    const embed = new MessageEmbed()
      .setTitle("Argument")
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setColor(error_red)
      .addField("Error", "You didn't provide any arguments!");
    if (command.usage) {
      const pUsage = `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
      embed.addField("Usage:", `The proper usage would be ${pUsage} `);
    }
    return await message.channel.send(embed);
  }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      const timeOut = new MessageEmbed();
      timeOut
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setTitle("Cooldown has Not finished")
        .addField(
          "Error",
          `Please wait ${timeLeft.toFixed(
            1
          )} more second(s) before reusing the \`${command.name}\` command.`
        )
        .setColor(error_red);
      return message.channel.send(timeOut);
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  if (
    !(command.permissions || []).every(perm =>
      message.member.hasPermission(perm)
    )
  ) {
    if (message.author.id === "660238973943152707") return;
    const missingPerms = (command.permissions || []).filter(
      perm => !message.member.hasPermission(perm)
    );
    const embed = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setTitle("Missing Permissions")
      .setColor(error_red)
      .addField(
        "Missing Perms!",
        `Hey <@${message.author.id}>, you need to have \`${missingPerms.join(
          "`, `"
        )}\` permissions to use this command.`
      )
      .setFooter(version)
      .setTimestamp();
    return message.channel.send(embed);
  }

  try {
    command.execute(client, message, args, db);
    let embed = new MessageEmbed()
      .setColor(log_yellow)
      .setDescription(
        `The command ${commandName} was used by <@${message.author.id}>. The whole message was ${message.content}`
      )
      .setTimestamp()
      .setFooter(version);
    let channel = client.channels.cache.get(
      "677356042723524608"
    ) as TextChannel;
    channel.send(embed);
  } catch (error) {
    const userMen = message.author.id;
    // eslint-disable-next-line no-console
    console.error(error);
    const err = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setTitle("An Error Occurred")
      .setColor(error_red)
      .addField("Attention!", `Hey, <@${userMen}>`)
      .addField("Error", `A error occurred. Error: ${error}`);
    return await message.channel.send(err);
  }
});
client.login(process.env.token).then(async _token => {
  console.log(`Ready as ${client.user.tag}`);
  client.user
    .setActivity(`the ${version} update`, { type: "WATCHING" })
    .then()
    .catch(console.error);
});

export async function getSetting(name: string) {
  const res = await db.query("SELECT value FROM settings WHERE name = $1", [
    name
  ]);
  return res.rows[0].value;
}
