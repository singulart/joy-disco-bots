import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PendingVerification } from 'src/db/pending-verification.entity';
import moment from 'moment';
import { Op } from 'sequelize';

@Injectable()
export class PendingVerificationCleaner {
  private readonly logger = new Logger(PendingVerificationCleaner.name);

  constructor(
    @Inject('PENDING_VERIFICATION_REPOSITORY')
    private readonly pendingVerificationRepository: typeof PendingVerification
  ) { }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async cleanupOldPendingVerifications(): Promise<void> {
    this.logger.debug('Cleaning old pending verifications...');
    const deletedRecords = await this.pendingVerificationRepository.destroy({
      where: {
        createdAt: {
          [Op.lte]: moment().subtract(30, 'minutes')
        }
      }
    });
    if (deletedRecords) {
      this.logger.debug(`${deletedRecords} records cleaned`);
    }
  }
}