import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ChatService } from './services/chat.service';
import { ChatSocketService } from './services/chat.socket.service';
import { MatCardModule } from '@angular/material/card';
import { NavComponent } from './components/nav/nav.component';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { GetUserPipe } from './pipes/get-user.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateChatComponent } from './components/create-chat/create-chat.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/auth.interceptor';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './guards/auth.guard';
import { AppRoutingModule } from '../app/app-routing.module';

const matModules = [
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatButtonModule,
  MatDividerModule,
  MatCardModule,
  MatGridListModule,
  ReactiveFormsModule,
  MatDialogModule,
];

@NgModule({
  declarations: [NavComponent, GetUserPipe, CreateChatComponent],
  imports: [
    CommonModule,
    ...matModules,
    RouterModule,
    JwtModule.forRoot({
      config: {
        allowedDomains: ['localhost:4200', 'localhost:'],
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
      },
    })
  ],
  providers: [
    ChatService,
    ChatSocketService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    JwtHelperService,
    AuthGuard,
  ],
  exports: [
    ...matModules,
    NavComponent,
    CreateChatComponent,
    GetUserPipe,
    MatDialogModule,
  ],
})
export class SharedModule {}
