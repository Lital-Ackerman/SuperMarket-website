import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
BASE_URL= environment.ordersBaseUrl
  constructor(private http:HttpClient) { }
  myOrder:Order;

  getAmountOfOrders(): Observable<any>{
    return this.http.get<any>(`${this.BASE_URL}/public/ordersAmount`);
  }

  openNewOrder(orderInfo:Order): Observable<Order>{
    return this.http.post<Order>(`${this.BASE_URL}/newOrder`, orderInfo);
  }

  validateShipDate(shipDate:Date): Observable<any>{
    return this.http.get<any>(`${this.BASE_URL}/validateShipDate/${shipDate}`);
  }




}
