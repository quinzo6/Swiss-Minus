import {Client, Message} from "discord.js";

export let name = 'setting';
export let description = 'Changes my setting';
export let aliases = ['Settings', 'settings', 'Setting'];
export let usage = '[setting] [boolean]';

export function execute(client: Client, message: Message, args: string[]) {
    const roles = message.member.roles.map((role) => role.name);
    const mod = (roles.includes('Mod') || roles.includes('Moderator') || roles.includes('Admin'));

    console.log(mod);
    console.log(roles);
    message.channel.send(mod);
}
