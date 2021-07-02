import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('slider',{static:true}) slider;
  constructor(private ProductService:ProductService ) { }


  ngOnInit(): void {
    window.scroll(0,0);
    console.log(this.slider);
    this.ProductService.GetProduct().subscribe(data=>{
      this.product = data.filter(m=>m.istrending == 1);
      this.filterproduct = this.product.slice(0,this.i);
      
    });
   
    
  }
  moreproduct(){
    this.i = this.i + 4; 
   this.filterproduct =  this.product.slice(0,this.i);
  }

}
