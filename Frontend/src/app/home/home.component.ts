import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SliderService } from '../services/slider.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  customOptions:OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

  product:Product[] = [];
  filterproduct = [];
  i = 8;

  sliders = [];
  
  
  
  constructor(private ProductService:ProductService,private sliderservice:SliderService) { }


  ngOnInit(): void {
    
    window.scroll(0,0);
    
    this.ProductService.GetProduct().subscribe(data=>{
      this.product = data.filter(m=>m.istrending == 1);
      this.filterproduct = this.product.slice(0,this.i);
      
    });
    this.sliderservice.GetSlider().subscribe(data=>{
      this.sliders = data.data.slice(0,3);
    })
   
    
  }
  moreproduct(){
    this.i = this.i + 4; 
   this.filterproduct =  this.product.slice(0,this.i);
  }

}
