import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import gql from 'graphql-tag';
import { uuid } from 'uuidv4'
import { Chat, AllChatsQuery  } from './types/chat.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'client';
  public chats: Chat[] = [];
  public textInput: string;
  private userId: string;

  constructor(private apollo: Apollo) {

  }

  ngOnInit() {
    this.apollo.watchQuery<AllChatsQuery>({
      query : gql`
        query getAllChats {
          getAllChats {
            from
            message
            sentAt
          }
        }
      `
    }).valueChanges.pipe(
      tap(console.log),
      map(results => results.data.getAllChats)
    ).subscribe( results => results.map( result => this.chats.push(result)));
 
    this.subscribe();
  }

  sendText() {
    if(!this.userId) this.userId = prompt('Enter your nickname');
    this.apollo.mutate({ 
      mutation : gql`
        mutation createMessage($from: String!, $message: String!){
          createMessage(from: $from, message: $message) {
            from
            message
            sentAt
          }
        }`,
      variables : { message : this.textInput, from : this.userId }
    }).subscribe(res => this.textInput = "");
  }

  private subscribe() {
    this.apollo.subscribe({
      query: gql`
        subscription {
          newMessage {
            from
            message
            sentAt
          }
        }
      `
    }).pipe(tap(console.log)).subscribe(results => {
      this.chats.push(results.data.newMessage)
    })
  }
}
