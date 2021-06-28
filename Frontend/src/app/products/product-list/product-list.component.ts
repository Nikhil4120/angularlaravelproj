import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  id:number;
  Category:string = "";
  product:Product[] = [];
  constructor(private CategoryService:CategoryService,private route:ActivatedRoute,private router:Router,private ProductService:ProductService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id = +params['id'];
      this.CategoryService.getCategories().subscribe(data=>{
        console.log(data[this.id])
        this.Category = data[this.id].category_name;
        
        this.getproduct();
      });
      

      

    });
    
  }
  getproduct(){
    console.log(this.Category);
    this.ProductService.GetProduct().subscribe(data=>{
      this.product = data.filter(item=>item.category_name==this.Category);
      
    });
  }
  

}
