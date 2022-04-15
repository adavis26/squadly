import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateChatDTO, DeleteChatResponse, IShortChat } from 'libs/core/src';
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

  public deleteChat(chatId: number): Observable<DeleteChatResponse> {
    return this.http.delete<DeleteChatResponse>(`${this.baseurl}/${chatId}`);
  }

  public getChatsUser(userId: number) {
    return this.http.get<IShortChat[]>(`/api/user/${userId}/chats`);
  }
}
