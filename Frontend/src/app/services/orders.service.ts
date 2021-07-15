import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs'; 
import { Order } from '../models/order.model';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  
  orderobs = new Subject<Order>();
  constructor(private Http:HttpClient) { }

  PlaceOrder(data){
    return this.Http.post<any>(environment.localapi+'/orders',data);
  }

  Checkout(token,amount){
    
      return this.Http.post<any>(environment.localapi+'/checkout',{'token':token['id'],'amount':amount});
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

}
