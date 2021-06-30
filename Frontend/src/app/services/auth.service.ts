import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedin = new BehaviorSubject<boolean>(this.tokenservice.loggedin());
  authstatus = this.loggedin.asObservable();
  changeAuthStatus(value:boolean){
    this.loggedin.next(value);
  }
  constructor(private http:HttpClient,private tokenservice:TokenService) { }
  
  signup(data:any,intrest:any){
    return this.http.post('http://localhost:8000/api/register',{data,intrest:intrest});
  }
  login(data:any){
    return this.http.post('http://localhost:8000/api/login',data);
  }

  getuser(token:any){
    
    return this.http.get<User[]>("http://localhost:8000/api/getuser?token="+token);
  }
}
