import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Size } from '../models/size.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  constructor(private http:HttpClient) { }

  getSizes(){
    return this.http.get<Size[]>(environment.localapi+'/size');
  }
}
