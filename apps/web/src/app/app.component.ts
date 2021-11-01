import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../../../../libs/core/src/';

@Component({
  selector: 'squadly-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private http: HttpClient) {}
}
