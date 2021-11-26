import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'libs/core/src/lib/interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public baseurl = '/api/user';
  constructor(private http: HttpClient) {}

  public loadUser(userId: number): Observable<User> {
    console.log(userId)
    return this.http.get<User>(`${this.baseurl}/${userId}`);
  }
}
