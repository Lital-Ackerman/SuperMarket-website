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
  checkOut:boolean=false;
  constructor(private http:HttpClient) { }
  productsEmitter= new EventEmitter<any>();
  editProductEmitter= new EventEmitter<any>();
  modificationEmitter= new EventEmitter<any>();
  searchEmitter= new EventEmitter<any>();
  clearEmitter= new EventEmitter<any>();


  getAmountOfProducts():Observable<number>{
    return this.http.get <number>(`${this.BASE_URL}/public`);
  }

  getProductsByCategory(categoryId:number|string): Observable<Product[]>{
    console.log("bycat")
    return this.http.get<Product[]>(`${this.BASE_URL}/productsByCategory/${categoryId}`)
    // .pipe(tap((products)=>{
    //   this.productsEmitter.emit(products)
    // }))
  }

  getProductBySearch(productName:string): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.BASE_URL}/productsBySearch/${productName}`)
    .pipe(tap((products)=>{
      this.productsEmitter.emit(products)
    }))
  }

  productDataToEdit(productInfo:Product){
    this.productData= productInfo;
    this.editProductEmitter.emit(productInfo)
  }

  postNewProduct(newProduct:FormData, categoryId:number|string): Observable<any>{
    return this.http.post<any>(`${this.BASE_URL}/postNewProduct`, newProduct)
    .pipe(tap(()=>{
      this.modificationEmitter.emit(categoryId)
    }))
  }

  editThisProduct(modifiedProduct:FormData, categoryId:number|string): Observable<Product>{
    return this.http.put<Product>(`${this.BASE_URL}/editProduct`, modifiedProduct)
    .pipe(tap(()=>{
      this.modificationEmitter.emit(categoryId)
    }))
  }

  searchInReceipt(searchText:string){
    this.searchEmitter.emit(searchText)
  }

}
