import { GraphQLClientInject, GraphQLRequestModule } from '@golevelup/nestjs-graphql-request';
import { Module } from '@nestjs/common';
import { getSdk } from '../qntypes';
import { pioneerApi } from '../../config';
import { GraphQLClient } from 'graphql-request';
import { RetryablePioneerClient } from './pioneer.client';

@Module({
  imports: [
    GraphQLRequestModule.forRoot(GraphQLRequestModule, {
      // Exposes configuration options based on the graphql-request package
      
      endpoint: pioneerApi,
      options: {
        headers: {
          'content-type': 'application/json'
        },
      },
    }),
  ],
  providers: [
    {
      // you can provide whatever key you want. use it in conjunction with @Inject("PioneerGqlSdk") to get the SDK instance in your controllers/services
      provide: 'PioneerGqlSdk',
      inject: [GraphQLClientInject],
      useFactory: (client: GraphQLClient) => getSdk(client),
    },
    RetryablePioneerClient
  ],
  exports: [RetryablePioneerClient]
})
export class PioneerGraphQLModule {}