import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUserDTO, LoginDTO, User } from 'libs/core/src/lib/interfaces';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authurl = '/api/auth';
  public userurl = '/api/user';
  constructor(
    private http: HttpClient,
    private readonly router: Router,
    private readonly jwtHelper: JwtHelperService
  ) {}

  public loadUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.userurl}/${userId}`);
  }

  public login(data: LoginDTO): Observable<User> {
    return this.http
      .post<{ user: User; access_token: string }>(`${this.authurl}/login`, data)
      .pipe(
        map((data) => {
          localStorage.setItem('access_token', data.access_token);
          return data.user;
        })
      );
  }

  public validateLocalToken(): boolean {
    const accessToken = localStorage.getItem('access_token');
    try {
      return !this.jwtHelper.isTokenExpired(accessToken);
    } catch {
      return false;
    }
  }

  public createUser(user: CreateUserDTO): Observable<User> {
    return this.http.post<User>(this.userurl, user).pipe(map((data) => data));
  }

  public verify(): Observable<User>{
    return this.http.get<User>(`${this.authurl}/verify`)
  }

  public logout(): Observable<any> {
    localStorage.removeItem('access_token');
    this.router.navigate(['login']);


    return of(true)
  }
}
