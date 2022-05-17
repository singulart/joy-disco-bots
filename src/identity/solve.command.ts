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
import { SolveDto } from './solve.dto';
import { signatureVerify } from '@polkadot/util-crypto';
// import { stringToU8a } from '@polkadot/util';

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
  ) {}

  async handler(@Payload() dto: SolveDto, context: TransformedCommandExecutionContext) {

    const verification = (await this.pendingVerificationRepository.findOne({where: {startedByDiscordHandle: this.buildHandle(context.interaction)}}))?.get();

    if(verification) {
      this.logger.debug(`Verifying string '${verification?.challenge}' using signature '${dto.challenge}' and address '${verification?.claimedAccountAddress}'`)
      // const challengeBytes = stringToU8a(verification?.challenge);
      // const signature = stringToU8a(dto.challenge.substring(2));
      // const publicKey = stringToU8a(verification.claimedAccountAddress);
      // let publicKey: Uint8Array | null = null;

      // try {
      //   publicKey = decodeAddress(verification.claimedAccountAddress);
      // } catch (err) {
      //   console.error(err);
      // }


      // не работает! есть предположение что не работает потому что полькадот аппка юзает более новую версию хэшируюшей либы
      // то есть я хэширую более новой либой, а проверяю более старой
      const { isValid } = signatureVerify(verification?.challenge, dto.challenge, verification.claimedAccountAddress);
      this.logger.log(isValid);
      context.interaction.reply({
        content: `Status: ${isValid}`,
        ephemeral: true
      });
    }
  }

  buildHandle(interaction: CommandInteraction<CacheType> | ContextMenuInteraction<CacheType>): string {
    return `${interaction.user.username}#${interaction.user.discriminator}`;
  }

}