import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  handle(token){
    this.set(token);
    console.log(this.isvalid());
  }

  set(token){
    localStorage.setItem('token',token);
  }

  get(){
    return localStorage.getItem('token');
  }
  remove(){
    return localStorage.removeItem('token');
  }
  isvalid(){
    const token = this.get();
    if(token){
      const payload = this.payload(token);
      if(payload){
        return (payload.iss === environment.localapi+'/login') ? true:false;
      }
    }
    return false;
  }
  payload(token){
    const payload = token.split('.')[1];
    return this.decode(payload);
    
  }
  decode(payload){
    return JSON.parse(atob(payload));
  }

  loggedin(){
    return this.isvalid();
  }
}
