import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order.model';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  userid;
  order:Order[] = [];
  selecteditem;
  isloading = false;
  search = "";
  page = 1;
  
  constructor(private orderservice:OrdersService) { }

  ngOnInit(): void {
    this.orderservice.orderobs.subscribe(data=>{
      this.selecteditem = data;
    })
    this.userid = JSON.parse(
      atob(localStorage.getItem('token').split('.')[1])
    ).user_id;
    this.isloading = true;
    this.orderservice.Allorder(this.userid).subscribe(data=>{
      this.order = data;
      this.selecteditem = data[0];
      
      this.isloading = false;
      
    });
    
  }

  pagechange(name){
    const len = this.order.length;
    const pagecount = Math.ceil(len/5);
    if(name == "previous"){
      if(this.page != 1){
        this.page = this.page-1;
      }      
    }
    else if(name  == "next"){
      if(this.page != pagecount){
        this.page = this.page + 1;
      }
    }
  }

}
