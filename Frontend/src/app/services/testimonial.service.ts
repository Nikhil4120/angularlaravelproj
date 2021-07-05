import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  constructor(private http:HttpClient) { }

  Gettestimonial(){
    return this.http.get<any>(environment.localapi+'/testimonial');
  }

}
