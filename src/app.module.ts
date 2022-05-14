import { WgModule } from './wg/wg.module';
import { IdentityModule } from './identity/identity.module';
import { DiscordModule, DiscordModuleOption } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Intents, Message } from 'discord.js';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DiscordModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        token: configService.get('TOKEN'),
        commands: ['**/*.command.js'],
        discordClientOptions: {
          intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
        },
        removeGlobalCommands: true,
        registerCommandOptions: [
          {
            forGuild: configService.get('DISCORD_SERVER'),
            allowFactory: (message: Message) =>
              !message.author.bot && message.content === '!deploy',
            removeCommandsBefore: true,
          },
        ],
      } as DiscordModuleOption),
      inject: [ConfigService],
    }),
    WgModule,
    IdentityModule
  ],
  providers: [],
})
export class AppModule {}