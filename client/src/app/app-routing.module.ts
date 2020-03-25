import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { JoinComponent } from './pages/join/join.component';
import { RoomDetailComponent } from './pages/room-detail/room-detail.component';


const routes: Routes = [
  { path : "rooms", component : RoomsComponent },
  { path : "rooms/:id", component : RoomDetailComponent },
  { path : 'join', component: JoinComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
