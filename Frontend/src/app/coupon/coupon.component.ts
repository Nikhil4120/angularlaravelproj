import { Component, OnInit } from '@angular/core';
import { Coupon } from '../models/coupon.model';
import { CouponService } from '../services/coupon.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css'],
})
export class CouponComponent implements OnInit {
  userid: number = JSON.parse(atob(localStorage.getItem('token').split('.')[1]))
    .user_id;
  coupons: Coupon[] = [];
  expirecoupons: Coupon[] = [];

  constructor(private couponservice: CouponService) {}

  ngOnInit(): void {
    this.couponservice.Getcoupons(this.userid).subscribe((data) => {
      this.coupons = data;
    });

    this.couponservice.expirecoupons(this.userid).subscribe((data) => {
      this.expirecoupons = data;
    });
  }
}
