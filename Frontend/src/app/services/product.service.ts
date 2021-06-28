import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  product:Product[] = [];
  constructor(private http:HttpClient) { }

  GetProduct(){
      return this.http.get<Product[]>('http://127.0.0.1:8000/api/product')
  }

  

}
