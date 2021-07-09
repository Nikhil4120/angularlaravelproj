
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/services/wishlist.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  envimage = environment.image;
  isloading = true;
  id: number;
  product: any = [];
  allproduct: any;
  size: [];
  wishlist = false;
  quantity;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 4
      },
      740: {
        items: 3
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
  product_size = "";
  product_quantity = 1;
  isloggedin = false;
  userid: number;
  wishlists = [];
  constructor(private ProductService: ProductService, private route: ActivatedRoute, private AuthService: AuthService, private cartservice: CartService, private toastr: ToastrService, private wishlistservice: WishlistService) { }

  ngOnInit(): void {
    this.isloading = true;
    
    this.AuthService.authstatus.subscribe(data => {
      this.isloggedin = data;
      this.userid = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).user_id;

    });

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.product_size = "";
      this.product_quantity = 1;
      this.wishlist = false;
      
      this.ProductService.GetProduct().subscribe(data => {
        this.allproduct = data.filter(item => item.id != this.id);
        this.product = data.filter(item => item.id == this.id)[0];
        this.size = this.product.size_id.split(",");
        this.quantity = new Array(this.product.quantity);
        this.route.queryParams.subscribe((params: any) => {
          if (params.size) {
            this.product_size = params.size;
          }
        })
        window.scroll(0, 0);
        this.isloading = false;
      });
      this.wishlistservice.Wishlist().subscribe(data => {
        this.wishlists = data.data;
        if (this.wishlists.find(m => m.product_id == this.id && m.user_id == this.userid)) {
          this.wishlist = true;
        }
      });
    });
  }
  addtocart(product) {
    if (this.isloggedin) {
      product['size'] = this.product_size;
      product['product_quantity'] = this.product_quantity;
      this.cartservice.addTocart(product);
      this.toastr.success("Your item is added to cart");
    }
    else {
      this.toastr.error("you need to login first");
    }
  }

  addwishlist() {
    this.wishlistservice.Addwishlist({ user_id: this.userid, product_id: this.id }).subscribe(data => {
      this.toastr.success("Item Added to wishlist");
      this.wishlist = true;
    });
  }

  removewishlist() {
    this.wishlistservice.Addwishlist({ user_id: this.userid, product_id: this.id }).subscribe(data => {
      this.toastr.success("Item Removed to wishlist");
      this.wishlist = false;
    });

  }
  
}
