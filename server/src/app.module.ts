import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { AppController } from './app.controller';
import { ChatResolver } from './resolvers/chat/chat.resolver';
import { AppService } from './app.service';
import { join } from 'path';
import { ChatService } from './services/chat/chat.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      installSubscriptionHandlers: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService, ChatResolver, {
    provide : 'PUB_SUB',
    useValue : new PubSub()
  }],
})
export class AppModule {}
