import SwissClient from "../SwissClient";
import { Message, MessageAttachment, GuildMember } from "discord.js";

export let name = "king";
export let description = "KING's video";
export let canBeOff = true;

export async function execute(
  client: SwissClient,
  message: Message,
  args: string[],
) {
    message.channel.send(
      new MessageAttachment(
        "https://cdn.discordapp.com/attachments/592768337407115264/688354600973238302/video0.mov",
        "king.mp4"
      ));
}
