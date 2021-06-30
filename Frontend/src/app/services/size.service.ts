import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Size } from '../models/size.model';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  constructor(private http:HttpClient) { }

  getSizes(){
    return this.http.get<Size[]>('http://localhost:8000/api/size');
  }
}
