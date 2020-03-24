import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
//import { ChatService } from 'src/services/chat/chat.service';


interface IChat {
    from: string
    message: string
    sentAt: number
}


@Resolver()
export class ChatResolver {

    private chats: IChat[];
    private pubSub: PubSub;

    constructor() {
        this.pubSub = new PubSub();
        this.chats = [];
        console.log('chat resolver init')
    }

    @Query()
    getAllChats() {
        return this.chats;
    }

    @Mutation()
    createMessage(@Args('from') from: string, @Args('message') message: string) {
        const newMsg = {
            from,
            message,
            sentAt : new Date().getTime()
        };
        this.chats.push(newMsg);
        this.pubSub.publish('newMessage', { newMessage : newMsg });
        return newMsg;
    }

    @Subscription()
    newMessage() {
        return this.pubSub.asyncIterator('newMessage');
    }
}
