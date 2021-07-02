import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subcategory } from '../models/subcategory.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(private http:HttpClient) { }

  getSubcategories(){
    return this.http.get<Subcategory[]>(environment.localapi+'/subcategory');
  }

}
