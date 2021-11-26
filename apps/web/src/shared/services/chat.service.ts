import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public baseurl = '/api';

  constructor(private http: HttpClient,) {}

  public getChat(chatId: number): Observable<any> {
    return this.http.get(`${this.baseurl}/chat/${chatId}`);
  }
}