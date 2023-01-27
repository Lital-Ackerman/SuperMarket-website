import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http:HttpClient) { }
  BASE_URL= environment.categoriesBaseUrl;

  getCategories(): Observable <Category[]>{
    return this.http.get <Category[]> (`${this.BASE_URL}`);
  }

}
