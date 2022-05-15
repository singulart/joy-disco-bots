import { Param } from '@discord-nestjs/core';

export class SolveDto {
  @Param({ description: 'Signed challenge', required: true})
    signedChallenge!: string;
}