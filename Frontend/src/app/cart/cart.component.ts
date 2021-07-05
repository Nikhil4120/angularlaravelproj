import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CountryService } from '../services/country.service';
import { StateService } from '../services/state.service';
import { TaxService } from '../services/tax.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartitems = [];
  alertitems = [];
  total = 0;
  allcountry = [];
  allstate = [];
  statefilter = [];
  taxamounts = [];
  taxamount = 0;
  country = "";
  state = "";

  constructor(private cartservice:CartService,private Toastr:ToastrService,private CountryService:CountryService,private StateService:StateService,private taxservice:TaxService) { }

  ngOnInit(): void {

    this.CountryService.getcountry().subscribe(data=>{
      this.allcountry = data;
    });

    this.StateService.getstate().subscribe(data=>{
      this.allstate = data;
    });

    this.taxservice.GetTax().subscribe(data=>{
      this.taxamounts = data;
    })

    this.cartservice.getCartProducts().subscribe(data=>{
      this.cartitems = data;
      this.alertitems = data;
      setTimeout(() => {
        this.alertitems = [];
      }, 60000);
      this.grandtotal();
      window.scroll(0,0);
    });
  }
  clearall(){
    this.cartservice.clearall();
  }
  removeitem(id,size){
    this.cartservice.removeitem(id,size);
  }
  quantitychange(e,id,size){
    
    var productindex = this.cartitems.findIndex(m=>m.id==id && m.size==size);
    this.cartitems[productindex].product_quantity = e.target.value;
    this.grandtotal();
    console.log(this.cartitems);
  }
  updatecart(){
    this.cartservice.UpdateCart(this.cartitems);
    this.Toastr.success("Your Cart is Updated");
  }

  grandtotal(){
    this.total = 0;
    for (let index = 0; index < this.cartitems.length; index++) {
      const element = this.cartitems[index];
      this.total += (element.product_quantity *  element.price);
      
    }
  }

  filterstate(e){
    this.statefilter = this.allstate.filter(m=>m.country_id == e.target.value);
    
  }

  filtertax(){
    console.log(this.country);
    console.log(this.state);
    var amount = this.taxamounts.filter(m=>m.country_id==this.country && m.state_id==this.state);
    this.taxamount = amount[0].tax_amount;
  }
}
