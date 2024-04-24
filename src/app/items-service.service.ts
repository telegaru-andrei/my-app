import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import Item from './types/Item';


//@Injectable ~ @Service java
@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  // http: HttpClient;
  // constructor(http: HttpClient) { 
  //   this.http = http;
  // }

  private url = "http://localhost:8080/items";

  constructor(private http: HttpClient) { }

  //promise - iti promit ca iti intorc niste date in scurt timp
  //observable
  public getItems() {
    return this.http.get<Item[]>(this.url);
  }

  public saveItem(item: Item) {
    return this.http.post<Item>(this.url, item);
  }

}
