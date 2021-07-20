import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartChanged = new Subject<any>();
  private AddtoCartSubject = new BehaviorSubject<any>([]);
  private cartItems:Array<object> = [];

  constructor(private toastr:ToastrService) { 
    if(localStorage.getItem('cart')){
      this.cartItems = JSON.parse(localStorage.getItem('cart'));
    }
    this.AddtoCartSubject = new BehaviorSubject<any>(this.cartItems);
  }
  getCartProducts():Observable<any>{
    return this.AddtoCartSubject.asObservable();
  }
  addTocart(product){
      let products = [];
      if(localStorage.getItem('cart')){

        products = JSON.parse(localStorage.getItem('cart'));
        
      }
      
      let productexist = false;
      let product_avail = true;
      
      if(product['size']){
        var size = product['size'];  
      }
      else{
        var size = product.size_id.split(",")[0];
      }
      
      for (let index = 0; index < products.length; index++) {
        if(products[index].id == product.id && products[index].size == size){
          if(product['product_quantity']){
            if(parseInt(products[index].quantity) - parseInt(products[index].product_quantity) >= parseInt(product['product_quantity']) ){
              products[index].product_quantity = parseInt(products[index].product_quantity);
              products[index].product_quantity += parseInt(product['product_quantity']);  
              products[index].isshown = 0;
            }
            else{
              
              product_avail = false;
            }
            
          }
          else{
            if(parseInt(products[index].quantity) - parseInt(products[index].product_quantity) >= 1 ){
              products[index].product_quantity = parseInt(products[index].product_quantity);
              products[index].product_quantity += 1;
              products[index].isshown = 0;
            }
            else{
              product_avail = false;
            }
            
          }
          
          productexist = true;
          break;
        }

        
      }
      if(!productexist){
        product['size'] = size;
        if(!product['product_quantity']){
          product['product_quantity'] = 1;
        } 
        product['isshown'] = 0;
      products.push(product)
      }
      this.cartItems = products;
      localStorage.setItem('cart',JSON.stringify(this.cartItems));
      product_avail ? this.toastr.success("Item added to cart") : this.toastr.warning("Item out of stock");
      
    this.AddtoCartSubject.next(this.cartItems);
  }

  removeitem(id,size){
    let products = JSON.parse(localStorage.getItem('cart'));
    this.cartItems = products.filter(m=>m.id!=id || m.size!=size);
    localStorage.setItem('cart',JSON.stringify(this.cartItems));
    this.AddtoCartSubject.next(this.cartItems);

  }

  clearall(){
    if(localStorage.getItem('cart')){
      localStorage.removeItem('cart');
      this.cartItems = [];
      this.AddtoCartSubject.next(this.cartItems);
    }
    
  }

  UpdateCart(products){
    this.cartItems = products;
    localStorage.setItem('cart',JSON.stringify(this.cartItems));
    this.AddtoCartSubject.next(this.cartItems);
  }

  ChangeShown(products){

    this.cartItems = products;
    localStorage.setItem('cart',JSON.stringify(this.cartItems));
    this.AddtoCartSubject.next(this.cartItems);

  }

  

  
  
}
