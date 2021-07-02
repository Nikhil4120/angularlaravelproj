import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  
  constructor(private http:HttpClient) { }

  getCategories(){
    return this.http.get<Category[]>(environment.localapi+'/category');
  }


}
