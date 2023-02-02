import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Item } from '../models/item';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  BASE_URL= environment.productsBaseUrl;
  productData:Product;
  constructor(private http:HttpClient) { }
  productsEmitter= new EventEmitter<any>();
  editProductEmitter= new EventEmitter<any>();


  getAmountOfProducts():Observable<number>{
    return this.http.get <number>(`${this.BASE_URL}/public`);
  }

  getProductsByCategory(categoryId:number): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.BASE_URL}/productsByCategory/${categoryId}`);
  }

  getProductBySearch(productName:string): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.BASE_URL}/productsBySearch/${productName}`)
    .pipe(tap((product)=>{
      this.productsEmitter.emit(product)
    }))
  }

  productDataToEdit(productInfo:Product){
    this.productData= productInfo;
    this.editProductEmitter.emit(productInfo)
  }

  postNewProduct(productName:string): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.BASE_URL}/productsBySearch/${productName}`)
    .pipe(tap((product)=>{
      this.productsEmitter.emit(product)
    }))
  }

}
