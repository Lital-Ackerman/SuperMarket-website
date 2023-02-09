import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http:HttpClient) { }
  BASE_URL= environment.categoriesBaseUrl;
  myCategories:Category[];
  categorietsEmitter= new EventEmitter<any>();


  getCategories(): Observable <Category[]>{
    return this.http.get <Category[]> (`${this.BASE_URL}`)
    .pipe(tap((categories)=>{
      this.myCategories= categories;
      console.log(this.myCategories);
      this.categorietsEmitter.emit(categories)
    }))
}

  postNewCategory(newCategoryName:string): Observable <any>{
    return this.http.post <any>(`${this.BASE_URL}`, {newName: newCategoryName});
}
}
