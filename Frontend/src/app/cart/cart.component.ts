import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartitems = [];
  constructor(private cartservice:CartService) { }

  ngOnInit(): void {
    this.cartservice.getCartProducts().subscribe(data=>{
      this.cartitems = data;
      window.scroll(0,0);
    })
  }
  clearall(){
    this.cartservice.clearall();
  }
  removeitem(id,size){
    this.cartservice.removeitem(id,size);
  }

}
