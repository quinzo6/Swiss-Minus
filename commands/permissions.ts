import Discord, { Client, Message, GuildMember } from "discord.js";
import { swiss_blue } from "../config";
import { error_red } from "../config";
import { version } from "../package.json";

export let name = "permissions";
export let description = "Check the permissions of a user";
export let aliases = ["Permissions", "perms", "Perms", "p", "P"];
export let usage = "user";
export let cooldown = 5;
export let guildOnly = true;

export async function execute(
  client: Client,
  message: Message,
  args: string[]
) {
  const permMentioned =
    message.mentions.members.first() || // First mentioned user
    (message.guild.members.cache.get(args[0]) as GuildMember) || // User ID
    (message.guild.members.cache.find(
      m => m.user.username === args[0]
    ) as GuildMember) || // Username
    (message.guild.members.cache.find(
      m => m.nickname === args[0]
    ) as GuildMember) || // Nickname
    message.member; // Member who sent the message
  const permEmbed = new Discord.MessageEmbed();
  permEmbed
    .setTitle("Permissions")
    .setAuthor(permMentioned.user.tag, permMentioned.user.avatarURL())
    .setColor(swiss_blue)
    .addField(
      `Permissions of <@${permMentioned.user.id}>`,
      `\`${permMentioned.permissions.toArray().join("` , `")}\``
    )
    .setFooter(version)
    .setTimestamp();
  await message.channel.send(permEmbed);
}
