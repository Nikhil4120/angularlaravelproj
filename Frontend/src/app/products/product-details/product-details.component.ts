import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  id:number;
  product:any;
  allproduct:any;
  size:[];
  quantity;
  customOptions:OwlOptions = {
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
  constructor(private ProductService:ProductService,private route:ActivatedRoute,private AuthService:AuthService,private  cartservice:CartService,private toastr:ToastrService) { }

  ngOnInit(): void {
  

    this.AuthService.authstatus.subscribe(data=>{
      this.isloggedin = data;
    })
    this.route.params.subscribe((params:Params)=>{
      this.id = +params['id'];
      this.product_size = "";
      this.product_quantity = 1;
      this.ProductService.GetProduct().subscribe(data=>{
        this.allproduct = data.filter(item=>item.id!=this.id);
        this.product = data.filter(item=>item.id==this.id)[0];
        this.size = this.product.size_id.split(",");
        this.quantity = new Array(this.product.quantity);
        window.scroll(0,0);

      });

    });
  }
  addtocart(product){
    if(this.isloggedin){
      product['size']=this.product_size;
      product['product_quantity']=this.product_quantity;
      this.cartservice.addTocart(product);
    }
    else{
      this.toastr.error("you need to login first")
    }
    
   
  }
}
