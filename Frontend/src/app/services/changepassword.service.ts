import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChangepasswordService {

  constructor(private http:HttpClient) { }

  PasswordChange(data){
    return this.http.post<any>(environment.localapi+'/passwordchange',data);
  }

 PasswordForget(data){
  return this.http.post<any>(environment.localapi+'/passwordforget',data);
 }

 PasswordReset(data){
  return this.http.post<any>(environment.localapi+'/passwordreset',data);
 }

}
