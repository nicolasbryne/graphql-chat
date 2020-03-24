import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

import { Room, CreateRoomMutation, GetRooms, JoinRoomSubscription } from '../../interfaces/room.interface';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  public roomName: string;
  public roomId: string;

  public rooms: Room[] = [];

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo.watchQuery<GetRooms>({
      query : gql`
        query getRooms {
          getRooms {
            id
            name
            joins
            users {
              id
              name
            }
          }
        }  
      `
    }).valueChanges.subscribe( rooms => this.rooms = rooms.data.getRooms);
    
    this.subscribe();
  }

  createRoom() {
    this.roomName = prompt('Please enter room name to create');

    this.apollo.mutate<CreateRoomMutation>({
      mutation : gql`
        mutation createRoom($name: String!) {
          createRoom(name: $name) {
            id
            name
            joins
            users {
              id
              name
            }
          }
        }
      `,
      variables : { name : this.roomName }
    }).subscribe(({ data }) => {
      this.rooms.push(data.createRoom);
    })

  }

  subscribe() {
    this.apollo.subscribe<JoinRoomSubscription>({
      query : gql`
        subscription {
          joinRoom {
            id
            name
            roomJoin
          }
        }
      `
    }).subscribe( result => {
      const roomId = result.data.joinRoom.roomJoin;
      const currentRoom = this.rooms.filter(room => room.id === roomId)[0];
      currentRoom.joins++;
      currentRoom.users.push(result.data.joinRoom);
    })
  }

}
