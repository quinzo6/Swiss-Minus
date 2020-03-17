import SwissClient from "../../SwissClient";
import { Message } from "discord.js";
import { join } from "path";
import { writeFileSync } from "fs";

export let name = "badword";
export let description = "Add a badword into the list";
export let aliases = ["badwords"];
export let devOnly = true;

const regexps = [/[aeiou]/gi, /[^a-z]/gi];

export async function execute(
  client: SwissClient,
  message: Message,
  args: string[]
) {
  const filepath = join(__dirname, "../../badwords.json");
  let badwords: Array<string> = require(filepath);
  let words: Array<string> = args
    .join(" ")
    .split(",")
    .map(v => v.trim());
  regexps.forEach(regexp => {
    words = words.map(word => word.replace(regexp, " "));
  });
  badwords = [...badwords, ...words];
  writeFileSync(filepath, JSON.stringify(badwords, null, 4));
  return message.channel.send(
    `\`${args.join(" ")}\` has been added to the badwords list!`
  );
}
