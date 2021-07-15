import { Route } from '@angular/compiler/src/core';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order.model';
import { OrdersService } from 'src/app/services/orders.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  Order = [];
  envimage = environment.image;
  id:any;
  userid:any;
  isloading = false;
  selecteditem;
  @ViewChild('modal', { static: true }) modal;
  constructor(private OrderService:OrdersService,private toastr:ToastrService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.isloading = true;
    this.route.params.subscribe((param:Params)=>{
    
     this.id = param['id'];
     this.userid = JSON.parse(
      atob(localStorage.getItem('token').split('.')[1])
    ).user_id;
     this.OrderService.Allorder(this.userid).subscribe(data=>{
       this.isloading=false;
      this.Order = data.filter(m=>m.order_id == this.id);
      this.selecteditem = this.Order[0];
     })
    })
  }

  CancelOrder(form:NgForm){


    this.OrderService.cancelorder({id:this.selecteditem.id,reason:form.value.reason,description:form.value.description}).subscribe(data=>{

      this.toastr.success("Order Cancelled Successfully");
      this.modal.nativeElement.click();
      this.router.navigate(['/']);
    })
  }

  ReturnOrder(id){
    this.OrderService.returnorder(id).subscribe(data=>{
      this.toastr.success("Order Returned Successfully");
      this.router.navigate(['/']);
    })
  }

  itemchange(item){
    this.selecteditem = item;
  }

}
