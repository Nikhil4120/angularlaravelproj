import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrdersService } from 'src/app/services/orders.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {

  @Input() orderitem:any;
  @Input() index:number;
  @Input() selecteditem:Order;

  envimage = environment.image;
  constructor(private orderservice:OrdersService) { }

  ngOnInit(): void {
  }

  onselect(order:Order){
    this.orderservice.Selecteditem(order);
  }

}
