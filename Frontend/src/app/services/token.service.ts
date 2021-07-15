import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TokenService {
  a:any;
  constructor(private http:HttpClient) { }
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
    clearInterval(this.a);
    return localStorage.removeItem('token');
  }
  isvalid(){
    const token = this.get();
    if(token){
      const payload = this.payload(token);
      if(payload){
        const diff = payload.exp - payload.iat;
        
        this.a = setInterval(()=>this.http.get(environment.localapi+'/refresh?token='+token).subscribe(data=>{
          console.log(data);
          this.set(data);
        }),(diff-60)*1000);
        
        return true;
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
