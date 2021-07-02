import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor(private http:HttpClient) { }

  NewsletterSubscribe(email){
    return this.http.post<any>(environment.localapi+'/newsletter',{
      email:email
    });
  }
}
