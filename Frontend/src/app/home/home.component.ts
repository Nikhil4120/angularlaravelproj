import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  product:Product[] = [];
  filterproduct = [];
  i = 8;
  constructor(private ProductService:ProductService ) { }


  ngOnInit(): void {
    this.ProductService.GetProduct().subscribe(data=>{
      this.product = data;
      this.filterproduct = this.product.filter(m=>m.istrending == 1).slice(0,this.i);
      
    });
   
    
  }

}
