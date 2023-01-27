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

constructor(
private http:HttpClient,
private usersService: UsersService) { }

BASE_URL= environment.cartsBaseUrl;
cartContent:any;
cartId:number;
statusEmitter= new EventEmitter<any>();
// cartIdEmitter= new EventEmitter<any>();


getStatus(id:number, firstName:string): Observable<any>{
  console.log("getStatus");
  return this.http.get(`${this.BASE_URL}/orderStatus/${id}`)
    .pipe(tap((value)=>{
      console.log(value);
      this.statusEmitter.emit({value, firstName});
      }))
    }

openNewCart(): Observable<Cart>{
  console.log(this.usersService.myUser.userId)
  return this.http.post<Cart>(`${this.BASE_URL}`, {userId: this.usersService.myUser.userId})
    .pipe(tap((value)=>{
      this.cartId= value.cartId;
      // this.cartIdEmitter.emit(value.cartId);
    }))
}

findOpenCart(): Observable<any>{
  return this.http.get<any>(`${this.BASE_URL}/openCart/${this.usersService.myUser.userId}`)
     .pipe(tap((value)=>{
      this.cartContent= value;
      this.cartId= value[0].cartId;

     }))
}
}
