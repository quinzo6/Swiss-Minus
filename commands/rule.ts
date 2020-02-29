import Discord, {
  Client,
  Message,
  TextChannel,
  RichEmbed,
  ClientUser
} from "discord.js";
import {
  getSetting
} from "../index";
import {
  swiss_blue
} from "../config";
import {
  error_red
} from "../config"
import {
  log_yellow
} from "../config"
import {
  version
} from '../package.json'




export let name = "rule";
export let description = "Gets a rule";
export let cooldown = 0;
export async function execute(client: Client, message: Message, args: string[]) {
  let pete = client.fetchUser('660238973943152707')
  if (!args[0]) return
  if (args[0] === '1' || args[0] === 'age') message.channel.send("You must be over the age of 13. If we suspect a user being under the age of 13, we may enforce appropriate action to make sure all users are above the age of 13. You may continue to stay in this server with parental permission.")
  if (args[0] === '2') message.channel.send('Inappropriate discord usernames or profile pictures are not allowed, you will be given a formal warning to change this and may lead to further action being taken upon you.')
  if (args[0] === '3') message.channel.send('Moderators reserve the right to change your server nickname if it is found to be violating the rules. This will be followed by a formal warning as stated above.')
  if (args[0] === '4') message.channel.send('Please withhold only a single account within the server. Prior permission will be required from the staff team if you wish to bring in another account for any legit reason.')
  if (args[0] === '5') message.channel.send('With custom statuses, you may not have any inappropriate/racist/offensive content in anyway. Self advertising is also prohibited and action may be taken if these rules are broken.')
  if (args[0] === '6') message.channel.send('Alternate accounts are not tolerated within the server.')
  if (args[0] === '7') message.channel.send('Discriminatory jokes, language and hate speech will not be tolerated at any point.')
  if (args[0] === '8') message.channel.send('We will not tolerate any insults, verbal abuse and any threats towards others/the server. ')
  if (args[0] === '9') message.channel.send('DDOS Threats are Zero Tolerance and you will be banned immediately. No questions asked.')
  if (args[0] === '10') message.channel.send('Excessive Swearing is not allowed and you will be warned. Please do not try and use loopholes. ')
  if (args[0] === '11') message.channel.send('The excessive use of capital letters is not allowed and will result in a warning.')
  if (args[0] === '12') message.channel.send('No advertising is allowed (except from in #showcase which only allows you to self-promote your social media. No instant invites allowed. ) This includes but not limited to: Discord invites, YouTube, Instagram, or any other social medias. This does include DM advertising, if someone is advertising in your DMs, please contact a staff member.')
  if (args[0] === '13') message.channel.send('Please do not flood the text channels with rapid messages. E.g sending 3-5 messages in a consecutive manner. ')
  if (args[0] === '14') message.channel.send('Trolling or being a general nuisance is discouraged.')
  if (args[0] === '15') message.channel.send('Please try and avoid posting large obnoxious paragraphs of text. ')
  if (args[0] === '16') message.channel.send('Please respect everyone within the server. Everyone has a different opinion and should be able to express them.')
  if (args[0] === '17') message.channel.send('We have a zero tolerance policy for terrorism. Please avoid promoting terrorism or making any remarks. You will be permanently banned from the Discord Server.')
  if (args[0] === '18') message.channel.send('Please post any content in the correct channels. ')
  if (args[0] === '19') message.channel.send('Please do not ask to become a Moderator or Admin. You can apply for these roles when applications are open, however you may also be directly selected. Asking for these roles will decrease your chance of getting them.')
  if (args[0] === '20') message.channel.send('Please avoid backseat moderating')
  if (args[0] === '21') message.channel.send('Refrain from posting blank messages. Some of them are just annoying and pointless in this server.')
  if (args[0] === '22') message.channel.send('Do not leak chats to banned users of the Swiss server.')
  if (args[0] === '23') message.channel.send('Absolutely no NSFW content.')
  if (args[0] === '24') message.channel.send('Posting any offensive, sexually explicit or derogatory content is not allowed. ')
  if (args[0] === '25') message.channel.send('Please do not promote any illegal content including, but not limited to: Piracy and drugs.')
  if (args[0] === '26') message.channel.send('Do not post any content which reveals the personal information of a specific user. ')
  if (args[0] === '27') message.channel.send('We reserve the right to remove any user content at any time, this can be for any reason.')
  if (args[0] === '28') message.channel.send('Do not plagarise any content from the internet and claim that it is yours. This includes planespotting images, please give credit.')
  if (args[0] === '29') message.channel.send('Please use the VC for its intended purpose. E.g. use the general VC for general discussion and not music chat. ')
  if (args[0] === '30') message.channel.send('Please do not play any racist, homophobic or songs which contain excessive swearing. Action will be taken.')
  if (args[0] === '31') message.channel.send('Please avoid earraping the VC, however if all agree then you can go ahead.')
  if (args[0] === '32') message.channel.send('Please avoid playing any high pitched, loud or annoying sounds. ')
  if (args[0] === '33') message.channel.send('Try and reduce any background noise.')
  if (args[0] === '34') message.channel.send('Moderators reserve the right to disconnect anyone from any VC at any time.')
  if (args[0] === '35') message.channel.send('Moderators also have the right to enter any VC at any time.')
  if (args[0] === '36') message.channel.send('We reserve the right to remove the DJ role from anyone at anytime.')
  if (parseInt(args[0]) > 36) message.channel.send(`Swiss Plus is the best bot, no questions. If you do for some absurd reason have a question, dm **Non-Ping(${(await pete).tag})**`)
}