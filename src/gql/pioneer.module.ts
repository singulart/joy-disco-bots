import {
  GraphQLClientInject,
  GraphQLRequestModule,
} from '@golevelup/nestjs-graphql-request';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getSdk } from '../qntypes';
import { GraphQLClient } from 'graphql-request';
import { RetryablePioneerClient } from './pioneer.client';

@Module({
  imports: [
    GraphQLRequestModule.forRootAsync(GraphQLRequestModule, {
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        endpoint:
          configService.get<string>('QUERY_NODE') ||
          'https://query.joystream.org/graphql',
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
      // you can provide whatever key you want. use it in conjunction with @Inject("PioneerGqlSdk") to get the SDK instance in your controllers/services
      provide: 'PioneerGqlSdk',
      inject: [GraphQLClientInject],
      useFactory: (client: GraphQLClient) => getSdk(client),
    },
    RetryablePioneerClient,
  ],
  exports: ['PioneerGqlSdk', RetryablePioneerClient],
})
export class PioneerGraphQLModule {}
