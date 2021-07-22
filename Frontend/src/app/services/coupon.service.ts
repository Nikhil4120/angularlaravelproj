import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Coupon } from '../models/coupon.model';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private http:HttpClient) { }

  Getcoupons(id){
    return this.http.get<Coupon[]>(environment.localapi+'/allcoupons/'+id);
  }

  globalcoupons(){
    return this.http.get<Coupon[]>(environment.localapi+'/globalcoupons');
  }

}
