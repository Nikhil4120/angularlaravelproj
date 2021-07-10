import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  @Input() selecteditem:Order;
  envimage = environment.image;
  constructor() { }

  ngOnInit(): void {
  }

}
