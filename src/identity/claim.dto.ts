import { Param } from '@discord-nestjs/core';


export class ClaimDto {
  @Param({ description: 'Joystream user', required: true})
    username!: string;
  @Param({ description: 'Wallet address', required: true})
    wallet!: string;
}