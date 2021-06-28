import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  
  constructor(private http:HttpClient) { }

  getCategories(){
    return this.http.get<Category[]>('http://localhost:8000/api/category');
  }


}
