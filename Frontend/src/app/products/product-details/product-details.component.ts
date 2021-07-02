import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  id:number;
  product:any;
  size:[];
  quantity;
  
  constructor(private ProductService:ProductService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    

    this.route.params.subscribe((params:Params)=>{
      this.id = +params['id'];
      this.ProductService.GetProduct().subscribe(data=>{
        
        this.product = data.filter(item=>item.id==this.id)[0];
        this.size = this.product.size_id.split(",");
        this.quantity = new Array(this.product.quantity);


      });

    });
  }

}
