import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './feature-modules/home/home.component';
import { ChatComponent } from './feature-modules/chat/chat.component';
import { ChatResolver } from '../shared/resolver/chat.resolver';
import { LoginComponent } from './feature-modules/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'chat/:id',
    component: ChatComponent,
    resolve: {
      chat: ChatResolver,
    },
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
