import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http:HttpClient) { }

  Addwishlist(data){
    return this.http.post<any>(environment.localapi+'/addwishlist',data);
  }

  Wishlist(){
    return this.http.get<any>(environment.localapi+'/wishlist');
  }

  Removewishlist(data){
    return this.http.get<any>(environment.localapi+'/removelist');
  }
}
