import { Injectable } from '@angular/core';
import { HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public baseurl = 'localhost:3000';

  constructor(private httpService: HttpService) {}

  public getChat(chatId: number): Observable<any> {
    return this.httpService.get(this.baseurl);
  }
}