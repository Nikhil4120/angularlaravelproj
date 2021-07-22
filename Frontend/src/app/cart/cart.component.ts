import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CountryService } from '../services/country.service';
import { StateService } from '../services/state.service';
import { TaxService } from '../services/tax.service';
import { OrdersService } from '../services/orders.service';
import {  environment } from 'src/environments/environment';
import { CurrencyService } from '../services/currency.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit,OnDestroy {
  stripekey = environment.stripekey;
  envimage = environment.image;
  cartitems = [];
  alertitems = [];
  total = 0;
  allcountry = [];
  allstate = [];
  statefilter = [];
  taxamounts = [];
  taxamount = 0;
  country = '';
  state = '';
  isloading = false;
  strikeCheckout: any = null;
  selectedsize = "";
  editingmode = false;
  editingitem;
  sizeid = [];
  discount = 0;
  couponerror = "";
  couponsuccess = "";
  quantityunavail = -1;
  coupon = "";
  currency = 'inr';

  constructor(
    private cartservice: CartService,
    private Toastr: ToastrService,
    private CountryService: CountryService,
    private StateService: StateService,
    private taxservice: TaxService,
    private Orderservice: OrdersService,
    private router: Router,
    private currencyservice:CurrencyService
    
  ) {}

  ngOnInit(): void {
    this.CountryService.getcountry().subscribe((data) => {
      this.allcountry = data;
    });

    this.StateService.getstate().subscribe((data) => {
      this.allstate = data;
    });

    this.taxservice.GetTax().subscribe((data) => {
      this.taxamounts = data;
    });

    this.cartservice.getCartProducts().subscribe((data) => {
      this.cartitems = data;
      this.alertitems = data.filter(m=>m.isshown == 0);
      
      setTimeout(() => {
        this.alertitems = [];
      }, 10000);
      this.grandtotal();
      window.scroll(0, 0);
    });

    this.currencyservice.obs.subscribe(data=>{
      this.currency = data;
    })

    this.stripePaymentGateway();
  }

  clearall() {
    this.cartservice.clearall();
  }

  removeitem(id, size) {
    this.cartservice.removeitem(id, size);
  }

  quantitychange(e, id, size) {
    var productindex = this.cartitems.findIndex(
      (m) => m.id == id && m.size == size
    );
    this.cartitems[productindex].product_quantity = e.target.value;
    this.grandtotal();
  }

  updatecart() {
    this.cartservice.UpdateCart(this.cartitems);
    this.Toastr.success('Your Cart is Updated');
    
  }

  grandtotal() {
    this.total = 0;
    for (let index = 0; index < this.cartitems.length; index++) {
      const element = this.cartitems[index];
      this.total += element.product_quantity * element.price;
    }
  }

  applycoupon(coupon){
    this.discount = 0;
    this.coupon = "";
    this.couponerror = "";
    var userid = JSON.parse(
      atob(localStorage.getItem('token').split('.')[1])
    ).user_id;
    this.isloading = true;
    this.Orderservice.couponapply({userid:userid,coupon:coupon}).subscribe(data=>{

      this.isloading = false;
      if(data.success){
        this.coupon = coupon;
        this.Toastr.success("Your coupon code has been applied");
        this.couponsuccess = "Your coupon code has been applied";
        this.discount = data.data;
      }
      else{
        this.couponerror = data.data;
        this.coupon = "";
      }
    })
  }

  filterstate(e) {
    this.statefilter = this.allstate.filter(
      (m) => m.country_id == e.target.value
    );
  }

  filtertax() {
    
    var amount = this.taxamounts.filter(
      (m) => m.country_id == this.country && m.state_id == this.state
    );
    this.taxamount = amount[0].tax_amount;
  }

  checkout() {
    if (this.country == '' || this.state == '') {
      this.Toastr.warning('Please Select Country and State');
    } else {
      this.isloading = true;
      this.Orderservice.Availiabitycheck({cartitems:this.cartitems}).subscribe(data=>{
        this.isloading = false;
        if(data.success){
          let amount = this.total - (this.total*this.discount/100) + this.taxamount;
          if(this.currency != 'inr'){
            amount = amount/70;
          }
          this.pay(amount);
        }
        else{
          this.Toastr.warning("item is out of stock");
          let index = this.cartitems.findIndex(m=>m.id == data.data);
          this.quantityunavail = data.data;
          (this.cartitems[index]).quantity = data.quantity;
          console.log(data.data);
        }
      })
      
    }
  }

  iseditablemode(i){
    this.editingmode = true;
    this.editingitem = i;
    this.sizeid = this.cartitems[i].size_id.split(",");
    

  }

  updatesize(e,i){
    this.cartitems[i].size = e.target.value;
    
  }

  pay(amount) {
    var token;
    var ser = this.Orderservice;
    var cartitems = this.cartitems;
    var userid = JSON.parse(
      atob(localStorage.getItem('token').split('.')[1])
    ).user_id;
    var toastr = this.Toastr;
    let stripekey = this.stripekey;
    let cartservice = this.cartservice;
    let router = this.router;
    let discount = this.discount;
    let coupon =this.coupon;
    let currency = this.currency;
    const strikeCheckout = (<any>window).StripeCheckout.configure({
      key: stripekey,
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        
        token = stripeToken;
        toastr.success("payment in progress");
        ser.Checkout(stripeToken, amount,currency).subscribe((data) => {
          
          console.log(data);
          ser
            .PlaceOrder({ cartitems: cartitems, userid: userid,charge_id:data.id,discount: discount,coupon:coupon,currency:currency})
            .subscribe((data) => {
              toastr.success(data.data);
              cartservice.clearall();
              router.navigate(['/']);
            });
        });
      },
    });

    strikeCheckout.open({
      name: 'RemoteStack',
      description: 'Payment widgets',
      amount: amount * 100,
      currency: this.currency,

    });
  }

  stripePaymentGateway() {
    var stripekey = this.stripekey;
    if (!window.document.getElementById('stripe-script')) {
      const scr = window.document.createElement('script');
      scr.id = 'stripe-script';
      scr.type = 'text/javascript';
      scr.src = 'https://checkout.stripe.com/checkout.js';

      scr.onload = () => {
        this.strikeCheckout = (<any>window).StripeCheckout.configure({
          key: stripekey,
          locale: 'auto',
          token: function (token: any) {
            console.log(token);
            console.log('Payment via stripe successfull!');
            alert('Payment via stripe successfull!');
          },
        });
      };

      window.document.body.appendChild(scr);
    }
  }

  ngOnDestroy(){
    
    if(localStorage.getItem('cart')){

      let product = JSON.parse(localStorage.getItem('cart'));
      product.forEach(element => {
        element.isshown = 1;
      });
      this.cartservice.ChangeShown(product);
    }

  }
  
}
