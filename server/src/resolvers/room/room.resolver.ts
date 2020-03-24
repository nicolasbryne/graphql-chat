import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import * as uid from 'crypto-random-string';
import { Room } from '../../graphql';
import { PubSub } from 'graphql-subscriptions';

@Resolver()
export class RoomResolver {
    
    private pubSub: PubSub;
    private rooms: Room[];
    constructor() {
        this.pubSub = new PubSub();
        this.rooms = [];
    }

    @Query()
    getRooms() {
        return this.rooms;
    }
    
    @Query()
    getRoom(@Args('id') id: string) {
        return this.rooms.filter(room => room.id === id)[0];
    }

    @Mutation()
    createRoom(@Args('name') name: string) {
        
        const newRoom = {
            id: uid({ length : 6, type : 'numeric' }),
            name,
            joins : 0,
            users : []
        };

        this.rooms.push(newRoom);
        return newRoom;
    }

    @Mutation()
    joinRoom(@Args('id') id: string, @Args('userId') userId: string, @Args('name') name: string) {
        console.log(id);
        const room = this.rooms.filter(room => room.id === id)[0];
        if(room) {
            room.joins++
            room.users.push({ name, id : userId });
        }
        console.log(room)
        this.pubSub.publish('joinRoom', { joinRoom : { id : userId, name, roomJoin : id }});
        return room;
    }

    @Subscription('joinRoom')
    onJoinRoom() {
        return this.pubSub.asyncIterator('joinRoom');
    }
}
