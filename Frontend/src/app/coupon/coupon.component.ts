import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  isloading:boolean = false;

  constructor(private couponservice: CouponService,private toastr:ToastrService) {}

  ngOnInit(): void {
    this.isloading = true;
    this.couponservice.Getcoupons(this.userid).subscribe((data) => {
      this.coupons = data;
    },(error)=>{
      this.toastr.error("Something went wrong...");
    });

    this.couponservice.expirecoupons(this.userid).subscribe((data) => {
      this.isloading = false;
      this.expirecoupons = data;
    },(error)=>{
      this.toastr.error("Something went wrong...");
    });
  }
}
