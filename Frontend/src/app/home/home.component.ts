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
  constructor(private ProductService:ProductService ) { }


  ngOnInit(): void {
    this.ProductService.GetProduct().subscribe(data=>{
      this.product = data.slice(0,9);
      console.log(this.product);
    });
   
    
  }

}
