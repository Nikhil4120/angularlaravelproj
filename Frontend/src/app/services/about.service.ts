import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(private Http:HttpClient) { }

  GetAbout(){
    return this.Http.get<any>(environment.localapi+'/about');
  }
}
