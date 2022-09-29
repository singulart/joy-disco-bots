import { TransformPipe } from '@discord-nestjs/common';
import {
  Command,
  DiscordTransformedCommand,
  InjectDiscordClient,
  Payload,
  TransformedCommandExecutionContext,
  UsePipes,
} from '@discord-nestjs/core';
import { Inject, Logger } from '@nestjs/common';
import { CacheType, Client, CommandInteraction, ContextMenuInteraction, Role } from 'discord.js';
import { PendingVerification } from 'src/db/pending-verification.entity';
import { DaoMembership } from 'src/db/dao-membership.entity';
import { SolveDto } from './solve.dto';
import { signatureVerify } from '@polkadot/util-crypto';
import { findServerRole } from 'src/util';
import { ConfigService } from '@nestjs/config';
import { identityValidatedRole } from 'config';

@Command({
  name: 'solve',
  description: 'Finish claiming an on-chain identity',
})
@UsePipes(TransformPipe)
export class SolveChallengeCommand implements DiscordTransformedCommand<SolveDto> {
  private readonly logger = new Logger(SolveChallengeCommand.name);

  constructor(
    @Inject('PENDING_VERIFICATION_REPOSITORY')
    private readonly pendingVerificationRepository: typeof PendingVerification,
    @Inject('DAO_MEMBERSHIP_REPOSITORY')
    private readonly daoMembershipRepository: typeof DaoMembership,
    @InjectDiscordClient()
    private readonly client: Client,
    private readonly configService: ConfigService 
  ) { }

  async handler(@Payload() dto: SolveDto, context: TransformedCommandExecutionContext) {

    // length check
    if (dto.challenge?.length !== 130) {
      this.reply(`Signed challenge must be exactly 130 symbols. You sent a string with ${dto.challenge.length} symbols`, context);
      return;
    }
    // existing pending verification check
    // TODO how to make sure only one pending verification exist for a given user? 
    const verification = await this.pendingVerificationRepository.findOne(
      {
        where: {
          startedByDiscordHandle: this.buildHandle(context.interaction)
        },
        raw: true
      });

    if (verification) {
      this.logger.debug(`Verifying that challenge '${verification.challenge}' signature '${dto.challenge}' was signed by address '${verification.claimedAccountAddress}'`);
      try {
        const { isValid } = signatureVerify(verification.challenge, dto.challenge, verification.claimedAccountAddress);
        if (!isValid) {
          this.reply(`Signed challenge you provided is not correct`, context);
          return;
        }
      } catch (error) {
        this.logger.debug(`Verification failed for '${verification.claimedAccountAddress}'`);
        this.reply(`Signed challenge you provided is not correct`, context);
        return;
      }
      // verify that this address isn't yet claimed
      const existingBinding = await this.daoMembershipRepository.findOne(
        {
          where: {
            membership: verification.claimedMembership
          },
          raw: true
        });

      if (existingBinding) {
        this.logger.log(`Identity '${existingBinding.membership}' already claimed by '${existingBinding.discordHandle}'`);
        this.reply(`🤔 This identity seems to be already claimed`, context);
        return
      } else {
        const created = await this.daoMembershipRepository.create(
          {
            membership: verification.claimedMembership,
            accountAddress: verification.claimedAccountAddress,
            discordHandle: this.buildHandle(context.interaction)
          });
        if (created) {
          this.logger.log(`${this.buildHandle(context.interaction)} claimed identity '${verification.claimedMembership}'`);
          // clean up the pending verification records
          await this.pendingVerificationRepository.destroy(
            {
              where: {
                startedByDiscordHandle: this.buildHandle(context.interaction)
              }
            }
          );

          // assign 'identity verified' server role 
          const serverToCheck = this.configService.get('DISCORD_SERVER');
          const verifiedRole = await findServerRole(
            this.client, 
            serverToCheck, 
            identityValidatedRole) as Role;
          this.logger.debug(verifiedRole);
          const serverUser = await context.interaction.guild?.members.fetch({user: context.interaction.user});
          
          await serverUser?.roles.add(verifiedRole.id, 'Verified via claiming on-chain identity');
          
          this.reply(`Congrats! You have successfully claimed the identity. Your on-chain roles should show up within 30 minutes`, context);
          return
        } else {
          this.logger.log(`Creating record failed.`);
          this.reply(`Well, this is embarassing, but I have to ask you to try again later.`, context);
          return
        }
      }
    } else {
      this.logger.log(`No pending verification for user ${this.buildHandle(context.interaction)}`);
      this.reply(`You don't have any pending verifications. Claim your Joystream account using \`/claim\` command`, context);
      return
    }
  }

  buildHandle(interaction: CommandInteraction<CacheType> | ContextMenuInteraction<CacheType>): string {
    return `${interaction.user.username}#${interaction.user.discriminator}`;
  }

  reply(replyText: string, context: TransformedCommandExecutionContext) {
    context.interaction.reply({
      content: replyText,
      ephemeral: true
    });    
  }
}