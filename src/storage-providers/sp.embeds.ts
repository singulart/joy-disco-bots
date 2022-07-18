import Discord, { Role } from 'discord.js';
import { joystreamBlue } from '../../config'

// TODO Discord.MessageEmbed doesn't support mentions! 
export const getFaultyNodesEmbed = (summary: string, serverRoleToMention: Role | undefined): Discord.MessageEmbed => {
  return new Discord.MessageEmbed()
    .setTitle(`🚨🚨🚨 Failing storage node(s) alert!`)
    .setDescription(`${serverRoleToMention ? `<@&${serverRoleToMention.id}>` : ''} \n${summary}`)
    .setColor(joystreamBlue)
    .setTimestamp();
}