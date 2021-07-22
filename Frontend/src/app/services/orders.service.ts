import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs'; 
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  
  orderobs = new Subject<Order>();
  constructor(private Http:HttpClient) { }

  PlaceOrder(data){
    return this.Http.post<any>(environment.localapi+'/orders',data);
  }

  Checkout(token,amount,currency){
    
      return this.Http.post<any>(environment.localapi+'/checkout',{'token':token['id'],'amount':amount,'currency':currency});
  }

  Allorder(id){
    return this.Http.get<Order[]>(environment.localapi+'/allorders/'+id);
  }

  Selecteditem(order){
    this.orderobs.next(order);
  }

  cancelorder(data){
    return this.Http.post(environment.localapi+'/CancelOrder',data);
  }

  returnorder(data){
    return this.Http.post(environment.localapi+'/ReturnOrder',data);
  }

  ReOrder(id){
    return this.Http.get<Product[]>(environment.localapi+'/reorder/'+id);
  }

  Availiabitycheck(data){
    return this.Http.post<any>(environment.localapi+'/availiabity',data);
  }

  couponapply(id){
    return this.Http.post<any>(environment.localapi+'/couponapply',id);
  }

}
