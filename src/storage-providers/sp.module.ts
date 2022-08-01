import { CacheModule, Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { PioneerGraphQLModule } from 'src/gql/pioneer.module';
import { DatabaseModule } from 'src/db/database.module';
import { StorageNodeEndpointProvider } from './endpoint.provider';
import { StorageProviderHealthChecker } from './sp-health-checker.service';

@Module({
  imports: [
    CacheModule.register({ttl: 60*60}), // cached for 1h
    DiscordModule.forFeature(),
    ConfigModule.forRoot(),
    DatabaseModule,
    PioneerGraphQLModule
  ],
  providers: [StorageNodeEndpointProvider, StorageProviderHealthChecker],
})
export class StorageProvidersModule {}