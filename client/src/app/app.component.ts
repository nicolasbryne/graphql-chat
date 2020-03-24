import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import gql from 'graphql-tag';
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

  constructor(private apollo: Apollo) {

  }

  ngOnInit() {
    /* this.chats = this.apollo.watchQuery<AllChatsQuery>({
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
    );
 */
    this.subscribe();
  }

  sendText() {
    this.apollo.mutate({ 
      mutation : gql`
        mutation createMessage($message: String!){
          createMessage(from: "nicolas", message: $message) {
            from
            message
            sentAt
          }
        }`,
      variables : { message : this.textInput }
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
