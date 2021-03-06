import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  product:Product[] = [];
  constructor(private http:HttpClient) { }

  GetProduct(){
      return this.http.get<Product[]>(environment.localapi+'/product')
  }

  

}
