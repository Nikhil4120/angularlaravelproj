import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { WishlistService } from '../services/wishlist.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { CurrencyService } from '../services/currency.service';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  envimage = environment.image;
  wishlists = [];
  userid = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).user_id;
  isloading = false;
  currency = 'inr';
  constructor(private wishlistservice:WishlistService,private toastr:ToastrService,private currencyservice:CurrencyService,private reviewservice:ReviewService) { }

  ngOnInit(): void {
    this.isloading = true;
    this.wishlistservice.Userwishlist(this.userid).subscribe(data=>{
      this.isloading = false;
      this.wishlists = data;
    });
    this.currencyservice.obs.subscribe(data=>{
      this.currency = data;
    })
  }

  

  removewishlist(id){
    this.isloading = true;
    this.wishlistservice.Removewishlist(id).subscribe(data=>{
      this.isloading = false;
      let index = this.wishlists.findIndex(m=>m.id==id);
      this.wishlists.splice(index,1);
      this.toastr.success("item removed to wishlist");
    })
  }

}
