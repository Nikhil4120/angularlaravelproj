import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subcategory } from '../models/subcategory.model';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(private http:HttpClient) { }

  getSubcategories(){
    return this.http.get<Subcategory[]>('http://localhost:8000/api/subcategory');
  }

}
