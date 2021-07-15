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
  filterorder = [];
  selecteditem;
  isloading = false;
  search = "";
  page = 1;

  orderstatus = [
    {id:1,name:"Placed",checkeditem:0},
    {id:2,name:"Paked",checkeditem:0},
    {id:3,name:"Shipped",checkeditem:0},
    {id:4,name:"Delievered",checkeditem:0},
    {id:5,name:"Cancelled",checkeditem:0},
    {id:6,name:"Return",checkeditem:0}
  ]

  datestatus = [
    {min:new Date().getTime()-7*24*60*60*1000,max:new Date().getTime(),name:"Last 7 days",checkeditem:0},
    {min:new Date().getTime()-new Date(2021,0,1).getTime(),max:new Date().getTime(),name:"2021-now",checkeditem:0},
    {min:new Date().getTime()-new Date(2020,0,1).getTime(),max:new Date().getTime()-new Date(2021,0,1).getTime(),name:"2020-2021",checkeditem:0},
    {min:new Date().getTime()-new Date(1970,0,1).getTime(),max:new Date().getTime()-new Date(2020,0,1).getTime(),name:"old",checkeditem:0},
  ]
  
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
      let result = [];
      this.filterorder = this.order.reduce((temp,value)=>{
         if(!result.includes(value.order_id)){
          result.push(value.order_id);
          const orderfilter = this.order.filter(m=>m.order_id.includes(value.order_id));
          temp.push(orderfilter);
         }

         return temp;
         

      },[]);
      console.log(this.filterorder);

      this.selecteditem = data[0];
      
      this.isloading = false;
      
    });
    
  }

  ChangeStatus(e,id){
    
    if(e.target.value){
      this.filterorder = this.filterorder.filter((value,index)=>{
        if((value.filter(m=>m.delievery_status == id)).length!=0){
          return true;
        }
        else{
          return false;
        }
      })
    }
    else{

    }

  }
  ChangeDate(e,max,min){
    
    if(e.target.value){
      this.filterorder = this.filterorder.filter((value,index)=>{
        const temp = value.filter((m)=>{
          const datesplit = m.created_at.split(" ")[0];
          console.log(datesplit);
        })
      })
    }
    else{

    }

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
