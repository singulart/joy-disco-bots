import { TransformPipe } from '@discord-nestjs/common';
import {
  Command,
  DiscordTransformedCommand,
  Payload,
  TransformedCommandExecutionContext,
  UsePipes,
} from '@discord-nestjs/core';
import { Inject } from '@nestjs/common';
import { CacheType, CommandInteraction, ContextMenuInteraction } from 'discord.js';
import { PendingVerification } from 'src/db/pendingverification.entity';
import { ClaimDto } from './claim.dto';
import { nanoid } from 'nanoid';

@Command({
  name: 'claim',
  description: 'Claim an on-chain identity',
})
@UsePipes(TransformPipe)
export class IdentityClaimCommand implements DiscordTransformedCommand<ClaimDto> {

  constructor(
    @Inject('PENDING_VERIFICATION_REPOSITORY')
    private readonly pendingVerificationRepository: typeof PendingVerification,
  ) {}

  async handler(@Payload() dto: ClaimDto, context: TransformedCommandExecutionContext) {

    const challenge = nanoid();
    await this.pendingVerificationRepository.create(
      { 
        claimedMembership: dto.username, 
        claimedAccountAddress: dto.wallet,
        startedByDiscordHandle: this.buildHandle(context.interaction),
        challenge: challenge
      });
    context.interaction.reply({
        content: `Copy the following string and sign it:\n${challenge}`,
        ephemeral: true
      })
  }
  buildHandle(interaction: CommandInteraction<CacheType> | ContextMenuInteraction<CacheType>): string {
    return `${interaction.user.username}#${interaction.user.discriminator}`;
  }

}