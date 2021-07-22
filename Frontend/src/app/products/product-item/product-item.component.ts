import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product:Product;
  @Input() Index:number;
  isloggedin = false;
  envimage = environment.image;
  currency="inr";
  
  
  constructor(private AuthService:AuthService,private cartservice:CartService,private toastr:ToastrService,private currencyservice:CurrencyService) { }
  
  ngOnInit(): void {
    this.AuthService.authstatus.subscribe(value=>{
      this.isloggedin  = value;
    });
    this.currencyservice.obs.subscribe(data=>{
      this.currency = data;
      
    })
  }
  
  addcart(product){
    if(this.isloggedin){
      this.cartservice.addTocart(product);
      
    }
    

  }

}
