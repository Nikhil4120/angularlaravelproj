import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {

  constructor(private http:HttpClient) { }
  updateuser(data,intrest){
    return this.http.put(environment.localapi+'/updateuser',{data,intrest:intrest});
  }

  emailcheck(email,id){
    return this.http.post<any>(environment.localapi+'/useremailcheck',{
      email:email,
      id:id
    })
  }
}
