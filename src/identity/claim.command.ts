import {
  Command,
  DiscordCommand,
} from '@discord-nestjs/core';
import { 
  CommandInteraction, 
} from 'discord.js';

@Command({
  name: 'claim',
  description: 'Claim an on-chain identity',
})
export class IdentityClaimCommand implements DiscordCommand {

  // constructor(private readonly questsService: QuestsService) {}

  async handler(interaction: CommandInteraction) {

    // if (!(interaction.member.roles as GuildMemberRoleManager).cache.some(role => Object.values(botConfig.adminRoles).includes(role.name))) {
    //   interaction.reply({
    //     content: "Forbidden",
    //     ephemeral: true
    //   })
    // } else {
    //   const quest = JSON.parse(dto.quest) as Quest
    //   quest.status = 'OPEN';
    //   this.questsService.saveQuest(quest);
    //   interaction.reply({
    //     content: ".",
    //     ephemeral: true
    //   })  
    // }
  }
}