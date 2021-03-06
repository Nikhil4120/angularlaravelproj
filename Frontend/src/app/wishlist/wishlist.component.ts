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
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  envimage = environment.image;
  wishlists = [];
  userid = JSON.parse(atob(localStorage.getItem('token').split('.')[1]))
    .user_id;
  isloading: boolean = false;
  currency: string = 'inr';
  constructor(
    private wishlistservice: WishlistService,
    private toastr: ToastrService,
    private currencyservice: CurrencyService
    
  ) {}

  ngOnInit(): void {
    this.isloading = true;
    this.wishlistservice.Userwishlist(this.userid).subscribe(
      (data) => {
        this.isloading = false;
        this.wishlists = data;
      },
      (error) => {
        this.toastr.error('Something went wrong!!!');
      }
    );
    this.currencyservice.obs.subscribe((data) => {
      this.currency = data;
    });
  }

  removewishlist(id) {

    if(confirm("Are you sure want to delete")){
      this.isloading = true;
    this.wishlistservice.Removewishlist(id).subscribe((data) => {
      this.isloading = false;
      let index = this.wishlists.findIndex((m) => m.id == id);
      this.wishlists.splice(index, 1);
      this.toastr.success('item removed to wishlist');
    },(error)=>{
      this.toastr.error("Something went wrong....");
    });
    }
    
  }
}
