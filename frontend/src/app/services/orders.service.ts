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


  /**
   *Get amount of orders
   * @returns object with the relvant number
   */
  getAmountOfOrders(): Observable<object>{
    return this.http.get<object>(`${this.BASE_URL}/public/ordersAmount`);
  }


  /**
   *Open new Order after user filled all details.
   * @param orderInfo
   * @returns {Order} order details
   */
  openNewOrder(orderInfo:Order): Observable<Order>{
    return this.http.post<Order>(`${this.BASE_URL}/newOrder`, orderInfo);
  }


/**
 *Get days that have 3 orders or more.
 * @returns array with dates
 */
  busyDates(): Observable<any[]>{
    return this.http.get<any[]>(`${this.BASE_URL}/busyDates`);
  }
}
