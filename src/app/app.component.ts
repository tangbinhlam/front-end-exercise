import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemService } from './item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'front-end-exercise';
  items$: Observable<any>;

  groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue,
      );
      console.log(result);
      return result;
    }, {});
  };

  constructor(private service: ItemService) {}

  ngOnInit() {
    this.items$ = this.service.getItems$().pipe(
      map((items) => {
        return items.filter(
          (item) => item.name !== null && item.name.length > 0,
        );
      }),
      map((items) => {
        return this.groupBy(items, 'listId');
      }),
      map((item) => {
        for (let k in item) {
          item[k].sort((a, b) => (a.name > b.name ? 1 : -1));
        }
        return item;
      }),
    );
  }
}
