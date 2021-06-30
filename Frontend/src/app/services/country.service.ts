import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http:HttpClient) { }
  
  getcountry(){
    return this.http.get<Country[]>('http://localhost:8000/api/country');
  }
}
