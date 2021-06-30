import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Color } from '../models/color.model';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private http:HttpClient) { }

  getcolor(){
    return this.http.get<Color[]>('http://localhost:8000/api/color');
  }
}
