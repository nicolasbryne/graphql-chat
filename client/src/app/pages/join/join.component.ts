import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { JoinRoomMutation } from 'src/app/interfaces/room.interface';
import { uuid } from 'uuidv4';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

  public roomId: string;
  public userId: string;
  public userName: string;

  constructor(private apollo: Apollo) { 
    this.userId = uuid();
  }

  ngOnInit() {
  }

  joinRoom() {
    this.userName = this.userName || prompt('Enter your nickname');
    this.apollo.mutate<JoinRoomMutation>({
      mutation : gql`
        mutation joinRoom($id: String!, $userId: String!, $name: String!) {
          joinRoom(id: $id, userId: $userId, name: $name) {
            id
            name
            joins
            users {
              name
              id
            }
          }
        }
      `,
      variables : { id : this.roomId, userId : this.userId, name: this.userName }
    }).subscribe( result => result.data.joinRoom)
  }

}
