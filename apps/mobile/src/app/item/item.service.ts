import { Injectable } from '@angular/core';

import { Item } from './item';
import { Http } from '@nativescript/core';
import { from, Observable } from 'rxjs';
import { IShortChat } from '../../../../../libs/core/src';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private readonly http: HttpClient) {}
  private items = new Array<Item>(
    { id: 1, name: 'Ter Stegen', role: 'Goalkeeper' },
    { id: 3, name: 'Piqué', role: 'Defender' },
    { id: 4, name: 'I. Rakitic', role: 'Midfielder' },
    { id: 5, name: 'Sergio', role: 'Midfielder' }
  );

  getItems(): Array<Item> {
    return this.items;
  }

  getItem(id: number): Item {
    return this.items.filter((item) => item.id === id)[0];
  }

  public getChats() {
    const options = this.getHeaders()
    return this.http.get<IShortChat>('http://localhost:4200/api/user/1/chats', {headers: options});
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjUwODI4OTY1fQ.pTNOLjPDd__sjlw3_KjkDFNx8l4Cl8AxNM9g7F3VOnw',
    });
    console.log(headers)
    return headers;
  }
}
