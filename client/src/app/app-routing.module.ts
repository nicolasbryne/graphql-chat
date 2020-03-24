import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { JoinComponent } from './pages/join/join.component';


const routes: Routes = [
  { path : "rooms", component : RoomsComponent },
  { path : 'join', component: JoinComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
