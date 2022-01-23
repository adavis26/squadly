import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateChatDTO, IShortChat } from 'libs/core/src';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public baseurl = '/api/chat';

  constructor(private http: HttpClient) {}

  public getChat(chatId: number): Observable<any> {
    return this.http.get(`${this.baseurl}/${chatId}`);
  }

  public createChat(chat: CreateChatDTO): Observable<IShortChat> {
    return this.http.post<IShortChat>(`${this.baseurl}`, chat);
  }
}
