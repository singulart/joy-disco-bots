import { GraphQLClientInject, GraphQLRequestModule } from '@golevelup/nestjs-graphql-request';
import { Module } from '@nestjs/common';
import { getSdk } from '../qntypes-atlas';
import { atlasApi } from '../../config';
import { GraphQLClient } from 'graphql-request';
import { RetryableAtlasClient } from './atlas.client';

@Module({
  imports: [
    GraphQLRequestModule.forRoot(GraphQLRequestModule, {
      // Exposes configuration options based on the graphql-request package
      
      endpoint: atlasApi,
      options: {
        headers: {
          'content-type': 'application/json'
        },
      },
    }),
  ],
  providers: [
    {
      // you can provide whatever key you want. use it in conjunction with @Inject("AtlasGqlSdk") to get the SDK instance in your controllers/services
      provide: 'AtlasGqlSdk',
      inject: [GraphQLClientInject],
      useFactory: (client: GraphQLClient) => getSdk(client),
    },
    RetryableAtlasClient
  ],
  exports: [RetryableAtlasClient]
})
export class AtlasGraphQLModule {}