import { GraphQLClientInject, GraphQLRequestModule } from '@golevelup/nestjs-graphql-request';
import { Module } from '@nestjs/common';
import { getSdk } from '../qntypes';
import { hydraLocation as endpoint } from '../../config';
import { GraphQLClient } from 'graphql-request';

@Module({
  imports: [
    GraphQLRequestModule.forRoot(GraphQLRequestModule, {
      // Exposes configuration options based on the graphql-request package
      endpoint: endpoint,
      options: {
        headers: {
          'content-type': 'application/json'
        },
      },
    }),
  ],
  providers: [
    {
      // you can provide whatever key you want. use it in conjunction with @Inject("JoystreamGqlSdk") to get the SDK instance in your controllers/services
      provide: 'JoystreamGqlSdk',
      inject: [GraphQLClientInject],
      useFactory: (client: GraphQLClient) => getSdk(client),
    },
  ],
  exports: ['JoystreamGqlSdk']
})
export class GraphQLModule {}