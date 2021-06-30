import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {

  constructor(private http:HttpClient) { }
  updateuser(data,intrest){
    return this.http.put('http://localhost:8000/api/updateuser',{data,intrest:intrest});
  }
}
