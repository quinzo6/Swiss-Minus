import SwissClient from "../../SwissClient";
import { MessageAttachment, Message } from "discord.js";

export let name = "king";
export let canBeOff = true;

export async function execute(
  client: SwissClient,
  message: Message,
  args: string[]
) {
<<<<<<< HEAD
  message.channel.send(
    new MessageAttachment(
      "https://cdn.discordapp.com/attachments/592768337407115264/688354600973238302/video0.mov",
      "video0.mov"
    )
  );
=======
  await message.channel.send('Congrats <@390939447509778432>');
>>>>>>> ef04a72d6539885062fca003e196c289cbd4bcb4
}
