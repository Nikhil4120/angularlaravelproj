import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order.model';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  userid: number;
  order: Order[] = [];
  filterorder = [];
  orderfilters = [];
  allorderfilters = [];
  selecteditem;
  isloading: boolean = false;
  search: string = '';

  no_of_records: number = 10;

  orderstatus = [
    { id: 1, name: 'Placed', checkeditem: 0 },
    { id: 2, name: 'Paked', checkeditem: 0 },
    { id: 3, name: 'Shipped', checkeditem: 0 },
    { id: 4, name: 'Delievered', checkeditem: 0 },
    { id: 5, name: 'Cancelled', checkeditem: 0 },
    { id: 6, name: 'Return', checkeditem: 0 },
  ];

  datestatus = [
    {
      min: new Date().getTime() - 7 * 24 * 60 * 60 * 1000,
      max: new Date().getTime(),
      name: 'Last 7 days',
      checkeditem: 0,
    },
    {
      min: new Date().getTime() - new Date(2021, 0, 1).getTime(),
      max: new Date().getTime(),
      name: '2021-now',
      checkeditem: 0,
    },
    {
      min: new Date().getTime() - new Date(2020, 0, 1).getTime(),
      max: new Date().getTime() - new Date(2021, 0, 1).getTime(),
      name: '2020-2021',
      checkeditem: 0,
    },
    {
      min: new Date().getTime() - new Date(1970, 0, 1).getTime(),
      max: new Date().getTime() - new Date(2020, 0, 1).getTime(),
      name: 'old',
      checkeditem: 0,
    },
  ];

  constructor(private orderservice: OrdersService) {}

  ngOnInit(): void {
    this.orderservice.orderobs.subscribe((data) => {
      this.selecteditem = data;
    });
    this.userid = JSON.parse(
      atob(localStorage.getItem('token').split('.')[1])
    ).user_id;
    this.isloading = true;
    this.orderservice.Allorder(this.userid).subscribe((data) => {
      this.order = data;
      let result = [];
      this.filterorder = this.order.reduce((temp, value) => {
        if (!result.includes(value.order_id)) {
          result.push(value.order_id);
          const orderfilter = this.order.filter((m) =>
            m.order_id.includes(value.order_id)
          );
          temp.push(orderfilter);
        }

        return temp;
      }, []);
      this.allorderfilters = this.filterorder;
      this.orderfilters = this.filterorder.slice(0, this.no_of_records);
      this.selecteditem = data[0];

      this.isloading = false;
    });
  }

  MainFunctionForFilter() {
    let product_length = this.orderstatus.filter(
      (m) => m.checkeditem != 0
    ).length;
    let orderstore = [];
    if (product_length == 0) {
      orderstore = this.filterorder;
    } else {
      for (let index = 0; index < this.orderstatus.length; index++) {
        const element = this.orderstatus[index].checkeditem;
        if (element != 0) {
          const order = this.filterorder.filter((value) => {
            if (
              value.filter(
                (m) => m.delievery_status == this.orderstatus[index].id
              ).length != 0
            ) {
              return true;
            } else {
              return false;
            }
          });
          orderstore.push(...order);
        }
      }
    }

    product_length = this.datestatus.filter((m) => m.checkeditem != 0).length;

    let storeorder = [];
    if (product_length == 0) {
      storeorder = orderstore;
    } else {
      for (let index = 0; index < this.datestatus.length; index++) {
        const element = this.datestatus[index].checkeditem;
        if (element != 0) {
          const order = orderstore.filter((value) => {
            let temp4 = value.filter((m) => {
              const time = new Date(m.created_at).getTime();

              return (
                time > this.datestatus[index].min &&
                time <= this.datestatus[index].max
              );
            });
            return temp4.length != 0;
          });
          storeorder.push(...order);
        }
      }
    }

    let storebysearch = [];
    if (this.search == '') {
      storebysearch = storeorder;
    } else {
      storebysearch = storeorder.filter((value) => {
        return (
          value.filter((m) =>
            m.product_name.toLowerCase().includes(this.search.toLowerCase())
          ).length != 0
        );
      });
    }

    this.allorderfilters = storebysearch;
    this.orderfilters = storebysearch.slice(0, this.no_of_records);
  }

  ChangeStatus(e, i) {
    this.no_of_records = 10;
    if (e.target.checked) {
      this.orderstatus[i].checkeditem = 1;
      this.MainFunctionForFilter();
    } else {
      this.orderstatus[i].checkeditem = 0;
      this.MainFunctionForFilter();
    }
  }
  ChangeDate(e, i) {
    this.no_of_records = 10;
    if (e.target.checked) {
      this.datestatus[i].checkeditem = 1;
      this.MainFunctionForFilter();
    } else {
      this.datestatus[i].checkeditem = 0;
      this.MainFunctionForFilter();
    }
  }

  filtersearch() {
    this.no_of_records = 10;
    this.MainFunctionForFilter();
  }

  moreorder() {
    this.no_of_records = this.no_of_records + 10;
    this.MainFunctionForFilter();
  }
}
