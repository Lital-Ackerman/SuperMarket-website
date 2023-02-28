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
  likesArray:string[]=[];
  constructor(private http:HttpClient) { }
  productsEmitter= new EventEmitter<any>();
  editProductEmitter= new EventEmitter<any>();
  modificationEmitter= new EventEmitter<any>();
  searchEmitter= new EventEmitter<any>();
  clearEmitter= new EventEmitter<any>();


  /**
   *Get amount of products in order to display in the home page
   * @returns {number} number of products
   */
  getAmountOfProducts():Observable<number>{
    return this.http.get <number>(`${this.BASE_URL}/public`);
  }


  /**
   *Get list of products that belongs to the relevant category
   * @param {number | string} categoryId
   * @returns {Product[]} list of products
   */
  getProductsByCategory(categoryId:number|string): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.BASE_URL}/productsByCategory/${categoryId}`)
  }


  /**
   *Get list of products that contains the search text.
   * @param productName the search text
   * @returns {product[]} products list
   */
  getProductBySearch(productName:string): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.BASE_URL}/productsBySearch/${productName}`)
    .pipe(tap((products)=>{
      this.productsEmitter.emit(products)
    }))
  }


  /**
   *Get the selected product details in order to inject it to the editing form inputs.
   * @param productInfo
   */
  productDataToEdit(productInfo:Product){
    this.productData= productInfo;
    this.editProductEmitter.emit(productInfo)
  }


  /**
   *Add new product and emit event in order to display the new product in the product component.
   * @param newProduct the new product details in a form data object
   * @param categoryId
   * @returns result of request
   */
  postNewProduct(newProduct:FormData, categoryId:number|string): Observable<any>{
    return this.http.post<any>(`${this.BASE_URL}/postNewProduct`, newProduct)
    .pipe(tap(()=>{
      this.modificationEmitter.emit({categoryId, status:'not'})
    }))
  }


 /**
  *Edit product and emit event in order to display the modified product in the products component.
  * @param modifiedProduct
  * @param categoryId
  * @returns result of request
  */
  editThisProduct(modifiedProduct:FormData, categoryId:number|string): Observable<Product>{
    return this.http.put<Product>(`${this.BASE_URL}/editProduct`, modifiedProduct)
    .pipe(tap(()=>{
      this.modificationEmitter.emit({categoryId, status:'not'})
    }))
  }


  /**
   *Search input call this function whenever user writes in it.
   *Emits event in the cart component when it's in 'reciept mode' in order to highlight the relevant text.
   * @param searchText
   */
  searchInReceipt(searchText:string){
    this.searchEmitter.emit(searchText)
  }

}
