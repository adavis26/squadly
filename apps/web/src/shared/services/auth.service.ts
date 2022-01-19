import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserDTO, LoginDTO, User } from 'libs/core/src/lib/interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authurl = '/api/auth';
  public userurl = '/api/user'
  constructor(private http: HttpClient) {}

  public loadUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.userurl}/${userId}`);
  }

  public login(data: LoginDTO): Observable<User> {
    return this.http
      .post<User>(`${this.authurl}/login`, data)
      .pipe(map((data) => data));
  }

  public createUser(user: CreateUserDTO) {
    return this.http
      .post<User>(this.userurl, user)
      .pipe(map((data) => data));
  }
}
