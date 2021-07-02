import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '../models/city.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http:HttpClient) { }
  getcity(){
    return this.http.get<City[]>(environment.localapi+'/city');
  }
}
