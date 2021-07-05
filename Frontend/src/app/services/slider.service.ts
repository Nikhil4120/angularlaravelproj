import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SliderService {

  constructor(private http:HttpClient) { }

  GetSlider(){
    return this.http.get<any>(environment.localapi+'/slider');
  }

}
