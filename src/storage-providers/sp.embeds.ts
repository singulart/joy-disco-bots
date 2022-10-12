import Discord, { Role } from 'discord.js';
import { joystreamBlue } from '../../config'

export function getFaultyNodesEmbed(summary: string, serverRoleToMention: Role | undefined): Discord.MessageEmbed {
  return new Discord.MessageEmbed()
    .setTitle(`🚨🚨🚨 Failing storage node(s) alert!`)
    .setDescription(`${serverRoleToMention ? `<@&${serverRoleToMention.id}>` : ''} \n${summary}`)
    .setColor(joystreamBlue)
    .setTimestamp();
}