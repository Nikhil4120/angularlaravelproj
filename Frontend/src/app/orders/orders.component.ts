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
  orderfilters = [];
  temp = [];
  selecteditem;
  isloading = false;
  search = "";
  page = 1;
  i =10;

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
      this.temp = this.filterorder;
      this.orderfilters = this.filterorder.slice(0,this.i);
      this.selecteditem = data[0];
      
      this.isloading = false;
      
    });
    
  }

  MainFunctionForFilter(){
    var len = this.orderstatus.filter(m => m.checkeditem != 0).length;
    var temp = [];
    if (len == 0) {
      temp = this.filterorder;
    }

    else {
      for (let index = 0; index < this.orderstatus.length; index++) {
        const element = this.orderstatus[index].checkeditem;
        if (element != 0) {

          const order = this.filterorder.filter((value)=>{
            if((value.filter(m=>m.delievery_status == this.orderstatus[index].id)).length!=0){
              return true;
            }
            else{
              return false;
            }
          });
          temp.push(...order);

        }

      }

    }

    len = this.datestatus.filter(m => m.checkeditem != 0).length;

    var temp1 = [];
    if (len == 0) {

      temp1 = temp;
    }
    else {
      for (let index = 0; index < this.datestatus.length; index++) {
        const element = this.datestatus[index].checkeditem;
        if (element != 0) {
          const order = temp.filter((value)=>{
            let temp4 = value.filter((m)=>{
              const time = new Date(m.created_at).getTime();
             
              return (time > this.datestatus[index].min && time <= this.datestatus[index].max);
              
            });
            return temp4.length!=0;
            
          })
          temp1.push(...order);
        }
      }
    }

    var temp2  = [];
    if(this.search == ""){
      temp2 = temp1;
    }
    else{

      temp2 = temp1.filter((value)=>{
         return (value.filter(m=>(m.product_name.toLowerCase()).includes(this.search.toLowerCase())).length !=0);
           
         
      })

    }
    
    this.temp = temp2;    
    this.orderfilters = temp2.slice(0,this.i);
  }

  ChangeStatus(e,i){
    this.i = 10;
    if(e.target.checked){
      this.orderstatus[i].checkeditem = 1;
      this.MainFunctionForFilter();
    }
    else{
      this.orderstatus[i].checkeditem = 0;
      this.MainFunctionForFilter();
    }

  }
  ChangeDate(e,i){
    this.i = 10;    
    if(e.target.checked){
      this.datestatus[i].checkeditem = 1;
      this.MainFunctionForFilter();
    }
    else{
      this.datestatus[i].checkeditem = 0;
      this.MainFunctionForFilter();
    }

  }

  filtersearch(){
    this.i = 10;
    this.MainFunctionForFilter();
  }


  moreorder(){
    this.i = this.i + 10;        
    this.MainFunctionForFilter();
  }

}
