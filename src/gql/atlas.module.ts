import {
  GraphQLClientInject,
  GraphQLRequestModule,
} from '@golevelup/nestjs-graphql-request';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getSdk } from '../qntypes-atlas';
import { GraphQLClient } from 'graphql-request';
import { RetryableAtlasClient } from './atlas.client';

@Module({
  imports: [
    GraphQLRequestModule.forRootAsync(GraphQLRequestModule, {
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        endpoint:
          configService.get<string>('ATLAS_NODE') ||
          'https://orion.joystream.org/graphql',
        options: {
          headers: {
            'content-type': 'application/json',
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      // you can provide whatever key you want. use it in conjunction with @Inject("AtlasGqlSdk") to get the SDK instance in your controllers/services
      provide: 'AtlasGqlSdk',
      inject: [GraphQLClientInject],
      useFactory: (client: GraphQLClient) => getSdk(client),
    },
    RetryableAtlasClient,
  ],
  exports: [RetryableAtlasClient],
})
export class AtlasGraphQLModule {}
