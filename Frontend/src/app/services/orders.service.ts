import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs'; 
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private Http:HttpClient) { }

  PlaceOrder(data){
    return this.Http.post<any>(environment.localapi+'/orders',data);
  }

  Checkout(token,amount){
    
      return this.Http.post<any>(environment.localapi+'/checkout',{'token':token['id'],'amount':amount});
  }

}
