import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public baseurl = '/api/user';

  constructor(private http: HttpClient) {}

  public fuzzySearchUsername(query: string): Observable<any> {
    return this.http.get<any[]>(`${this.baseurl}/search?query=${query}`);
  }
}
