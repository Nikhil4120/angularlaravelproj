
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/services/wishlist.service';
import { environment } from 'src/environments/environment';
import { StarRatingComponent } from 'ng-starrating';
import { NgForm } from '@angular/forms';
import { ReviewService } from 'src/app/services/review.service';
import { HeaderService } from 'src/app/services/header.service';
import { Review } from 'src/app/models/review.model';
import { newArray } from '@angular/compiler/src/util';

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
  quantity:any=[];
  toggle:boolean = false;
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
  allreviews:Review[] = [];
  filterreviews = [];
  averagerating:any = 0;
  averagestar = 0;
  cartproduct = 0;
  constructor(private ProductService: ProductService, private route: ActivatedRoute, private AuthService: AuthService, private cartservice: CartService, private toastr: ToastrService, private wishlistservice: WishlistService,private reviewservice:ReviewService,private headerService:HeaderService) { }

  ngOnInit(): void {
    this.isloading = true;
    
    this.AuthService.authstatus.subscribe(data => {
      this.isloggedin = data;
      if(this.isloggedin){
        this.userid = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).user_id;
      }
      

    });

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.product_size = "";

      

      let productavail = JSON.parse(localStorage.getItem('cart'));
      if(productavail){
        productavail = productavail.filter(m=>m.id == this.id);
        console.log(productavail.length);
        if(productavail.length !=0){
          this.cartproduct = parseInt((productavail[0])['product_quantity']);
        }
      }
      


      this.product_quantity = 1;
      this.wishlist = false;
      
      this.ProductService.GetProduct().subscribe(data => {
        this.allproduct = data.filter(item => item.id != this.id);
        this.product = data.filter(item => item.id == this.id)[0];
        this.size = this.product.size_id.split(",");
        console.log(this.product.quantity - this.cartproduct);
        if(this.product.quantity - this.cartproduct != 0){
          this.quantity = new Array(this.product.quantity - this.cartproduct);
        }
        
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
      this.reviewservice.Allreview(this.id).subscribe(data=>{
        this.allreviews = data;
        if(this.allreviews.length != 0){
          const sum = this.allreviews.reduce((sum,current)=>sum+current.review,0);
        this.averagerating = (sum/(this.allreviews.length)).toFixed(2);
        this.averagestar = Math.round(this.averagerating);
        }
        
        this.filterreviews = this.allreviews.slice(0,5);
      });
    });
  }

  addtocart(product) {
    if(this.product.quantity < this.product_quantity){
      this.toastr.warning("Out of Stock");
    }
    else{
      product['size'] = this.product_size;
      product['product_quantity'] = this.product_quantity;
      this.quantity = new Array(this.quantity.length - this.product_quantity);
      this.cartservice.addTocart(product);
      // this.toastr.success("Your item is added to cart");
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
  
  onSubmit(form:NgForm){
    this.isloading= true;
    this.reviewservice.Addreview({review:form.value.rating,description:form.value.description,user_id:this.userid,product_id:this.id}).subscribe(data=>{
      this.isloading = false;
      this.toastr.success("Review Added Successfully");
      form.reset();
      this.reviewservice.Allreview(this.id).subscribe(data=>{
        this.allreviews = data;
        const sum = this.allreviews.reduce((sum,current)=>sum+current.review,0);
        this.averagerating = (sum/(this.allreviews.length)).toFixed(2);
        this.averagestar = Math.round(this.averagerating);
        this.filterreviews = data.slice(0,5);
      })
    }
    );
  }

  subcategorychange(name) {
    this.headerService.Storesubcategory(name);
    
  }

  categorychange() {
    this.headerService.Storesubcategory('');
  }

  counter(i:number){
    return newArray(i);
  }

  viewmore(){
    this.filterreviews = this.allreviews;
  }

  reviewtoggle(){
    this.toggle = !this.toggle;
  }
  
}
