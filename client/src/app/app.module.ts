import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { JoinComponent } from './pages/join/join.component';
import { RoomDetailComponent } from './pages/room-detail/room-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    RoomsComponent,
    JoinComponent,
    RoomDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
