import { Param } from '@discord-nestjs/core';


export class ClaimDto {
  @Param({ description: 'Your Joystream username', required: true})
    username!: string;
  @Param({ description: 'Root or controller address of your Joystream user', required: true})
    wallet!: string;
}