import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Cart } from '../models/cart';
import { Item } from '../models/item';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class itemsService {

constructor(
private http:HttpClient,
private usersService: UsersService) { }

BASE_URL= environment.itemsBaseUrl;
cartContent:any;
itemsEmitter= new EventEmitter<any>();

postItemToCart(itemInfo:Item): Observable<Item>{
  return this.http.post<Item>(`${this.BASE_URL}/postItem`, itemInfo)
   .pipe(tap(value=>{
    this.itemsEmitter.emit(itemInfo)
   }))
}
}


