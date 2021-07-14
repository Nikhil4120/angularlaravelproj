import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  @Input() selecteditem:Order;
  envimage = environment.image;
  constructor(private OrderService:OrdersService,private toastr:ToastrService,private router:Router) { }

  ngOnInit(): void {
  }

  CancelOrder(id){
    this.OrderService.cancelorder(id).subscribe(data=>{
      this.toastr.success("Order Cancelled Successfully");
      this.router.navigate(['/']);
    })
  }

  ReturnOrder(id){
    this.OrderService.returnorder(id).subscribe(data=>{
      this.toastr.success("Order Returned Successfully");
      this.router.navigate(['/']);
    })
  }

}
