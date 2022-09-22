import { TransformPipe } from '@discord-nestjs/common';
import {
  Command,
  DiscordTransformedCommand,
  Payload,
  TransformedCommandExecutionContext,
  UsePipes,
} from '@discord-nestjs/core';
import { Inject, Logger } from '@nestjs/common';
import { CacheType, CommandInteraction, ContextMenuInteraction } from 'discord.js';
import { PendingVerification } from 'src/db/pendingverification.entity';
import { ClaimDto } from './claim.dto';
import { nanoid } from 'nanoid';
import { RetryablePioneerClient } from 'src/gql/pioneer.client';
import { MemberByHandleQuery } from 'src/qntypes';

@Command({
  name: 'claim',
  description: 'Claim an on-chain identity',
})
@UsePipes(TransformPipe)
export class IdentityClaimCommand implements DiscordTransformedCommand<ClaimDto> {
  private readonly logger = new Logger(IdentityClaimCommand.name);

  constructor(
    @Inject('PENDING_VERIFICATION_REPOSITORY')
    private readonly pendingVerificationRepository: typeof PendingVerification,
    private readonly queryNodeClient: RetryablePioneerClient,
  ) {}

  async handler(@Payload() dto: ClaimDto, context: TransformedCommandExecutionContext) {
    this.logger.log(`${this.buildHandle(context.interaction)} claiming on-chain identity '${dto.username}' (${dto.wallet})`);

    // verify that the address really belongs to the claimed membership
    let queryNodeMember: MemberByHandleQuery | null  =  null;
    try {
      queryNodeMember = await this.queryNodeClient.memberByHandle(dto.username);
    } catch (error) {
      this.logger.warn(`Username ${dto.username} not found`);
    }
    
    if(queryNodeMember && queryNodeMember.memberships.length > 0 && 
      (queryNodeMember.memberships[0].controllerAccount === dto.wallet || 
        queryNodeMember.memberships[0].rootAccount === dto.wallet)) {

      this.logger.log(`${this.buildHandle(context.interaction)} claiming on-chain identity '${dto.username}' (${dto.wallet})`);
      // existing pending verification check
      // TODO how to make sure only one pending verification exist for a given user? 
      const verification = await this.pendingVerificationRepository.findOne(
        {
          where: {
            startedByDiscordHandle: this.buildHandle(context.interaction)
          }, 
          raw: true
        });
      if(verification) {
        context.interaction.reply({
          content: `You already started to claim on-chain identity. Use \`/solve\` command to finish the process`,
          ephemeral: true
        });
        return
      } else {
        const challenge = nanoid();
        const created = await this.pendingVerificationRepository.create(
          { 
            claimedMembership: dto.username, 
            claimedAccountAddress: dto.wallet,
            startedByDiscordHandle: this.buildHandle(context.interaction),
            challenge: challenge
          });
        if(created) {
          this.logger.log(`${this.buildHandle(context.interaction)} initiated claiming on-chain identity '${dto.username}' (${dto.wallet})`);
          context.interaction.reply({
            content: `Copy the following string and sign it using [Polkadot App](https://polkadot.js.org/apps/?rpc=wss://rpc.joystream.org:9944/#/signing):\n\`${challenge}\`\nThen, use \`/solve\` command to finish the process.`,
            ephemeral: true
          });
          return
        } else {
          context.interaction.reply({
            content: `Well, this is embarassing, but I have to ask you to try again later.`,
            ephemeral: true
          });
          return
        }
      }
    } else {
      context.interaction.reply({
        content: `You cannot claim this identity`,
        ephemeral: true
      });
    }    
  }
  buildHandle(interaction: CommandInteraction<CacheType> | ContextMenuInteraction<CacheType>): string {
    return `${interaction.user.username}#${interaction.user.discriminator}`;
  }
}