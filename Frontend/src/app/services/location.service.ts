import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http:HttpClient) { }

  Getlocation(){
    return this.http.get<any>("http://ip-api.com/json");
  }
}
