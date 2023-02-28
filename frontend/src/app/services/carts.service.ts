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
export class CartsService {

constructor(private http:HttpClient) { }

BASE_URL= environment.cartsBaseUrl;
cartContent:any;
cartId:number;
cartCheckOut:boolean= false;
cartTotal:number;
statusEmitter= new EventEmitter<any>();


/**
 *Get information about user last purchase/open cart.
 * @param userId
 * @param firstName
 * @returns {Object} object with user status
 */
getStatus(userId:number, firstName:string): Observable<any>{
  return this.http.get<any>(`${this.BASE_URL}/orderStatus/${userId}`)
    .pipe(tap((value)=>{
      this.cartId= value.data.cartId;
      this.statusEmitter.emit({value, firstName});
      }))
    }


/**
 *Opens new cart after login
 * @param userId
 * @returns {any} object with new cart Id
 */
openNewCart(userId:number): Observable<any>{
  return this.http.post<any>(`${this.BASE_URL}`, {userId: userId})
    .pipe(tap((value)=>{
      this.cartId= value.cartId;
    }))
}


/**
 *Get the cart items information.
 * @returns {item[]}
 */
getCartContent(): Observable<Item[]>{
  return this.http.get<Item[]>(`${this.BASE_URL}/cartContent/${this.cartId}`)
     .pipe(tap((value)=>{
      this.cartContent= value;
     }))
}
}
