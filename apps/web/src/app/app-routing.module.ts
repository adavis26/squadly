import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './feature-modules/home/home.component';
import { ChatComponent } from './feature-modules/chat/chat.component';
import { ChatResolver } from '../shared/resolver/chat.resolver';
import { LoginComponent } from './feature-modules/login/login.component';
import { SignUpComponent } from './feature-modules/login/sign-up/sign-up.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'chat/:id',
    component: ChatComponent,
    resolve: {
      chat: ChatResolver,
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
