import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Cart } from '../models/cart';
import { Item } from '../models/item';
import { CartsService } from './carts.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class itemsService {
constructor(
private http:HttpClient,
private cartsService: CartsService) { }

BASE_URL= environment.itemsBaseUrl;
cartContent:any;
itemsEmitter= new EventEmitter<any>();


/**
 * Add new item to cart.
 * Emits event in the cart component in order to refresh the items display.
 */
postItemToCart(itemInfo:Item): Observable<Item>{
  return this.http.post<Item>(`${this.BASE_URL}/postItem`, itemInfo)
   .pipe(tap(()=>{
    this.itemsEmitter.emit()
   }))
}


/**
 *Delete item/s from cart.
 * @param deleteThis param can be string "all" or itemId
 * @returns result of request
 */
deleteItems(deleteThis:number | string): Observable<any>{
  return this.http.delete<any>(`${this.BASE_URL}/deleteItems/${this.cartsService.cartId}/${deleteThis}`)
  .pipe(tap(()=>{
    this.itemsEmitter.emit()
   }))
}
}


