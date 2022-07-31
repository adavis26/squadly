import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IShortChat } from '../../../../../libs/core/src';

import { Item } from './item';
import { ItemService } from './item.service';

@Component({
  selector: 'ns-items',
  templateUrl: './items.component.html',
})
export class ItemsComponent implements OnInit {
  items: Array<Item>;
  chats: Observable<IShortChat>;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.items = this.itemService.getItems();
    this.chats = this.itemService.getChats();

    this.chats.subscribe((_chats) => console.log(_chats));
  }
}
