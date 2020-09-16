import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './item.model';
@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private httpClient: HttpClient) {}

  getItems$(): Observable<Item[]> {
    return this.httpClient.get<Item[]>('/api/hiring.json');
  }
}
