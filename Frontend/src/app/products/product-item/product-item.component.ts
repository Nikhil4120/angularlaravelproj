import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product:Product;
  @Input() Index:number;
  isloggedin = false;
  constructor(private AuthService:AuthService) { }

  ngOnInit(): void {
    
    this.AuthService.authstatus.subscribe(value=>{
      this.isloggedin  = value;
    })
  }
  addcart(product){
    if(this.isloggedin){
      let products = [];
      if(localStorage.getItem('cart')){
        products = JSON.parse(localStorage.getItem('cart'));
      }
      products.push(product)
      localStorage.setItem('cart',JSON.stringify(products));
      
      alert("Your item is added to cart..");
    }
    else{
      alert("You need to login first...");
    }

  }

}
