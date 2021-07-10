import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { About } from '../models/about.model';
@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(private Http:HttpClient) { }

  GetAbout(){
    return this.Http.get<About[]>(environment.localapi+'/about');
  }
}
