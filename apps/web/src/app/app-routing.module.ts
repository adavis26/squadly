import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './feature-modules/home/home.component';
import { ChatComponent } from './feature-modules/chat/chat.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'chat',
    component: ChatComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
