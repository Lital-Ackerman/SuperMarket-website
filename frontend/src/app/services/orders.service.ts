import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
BASE_URL= environment.ordersBaseUrl
  constructor(private http:HttpClient) { }

  getAmountOfOrders(): Observable<any>{
    return this.http.get<any>(`${this.BASE_URL}/public`);
  }


}
