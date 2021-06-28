import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  signup(data:any){
    this.http.post('http://localhost:8000/api/register',data).subscribe(data=>{
      console.log(data);
    })
  }
}
