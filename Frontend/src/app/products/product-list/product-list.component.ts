import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Color } from 'src/app/models/color.model';
import { Product } from 'src/app/models/product.model';
import { Size } from 'src/app/models/size.model';
import { Subcategory } from 'src/app/models/subcategory.model';
import { CategoryService } from 'src/app/services/category.service';
import { ColorService } from 'src/app/services/color.service';
import { ProductService } from 'src/app/services/product.service';
import { SizeService } from 'src/app/services/size.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  id:number;
  Category:string = "";
  product:Product[] = [];
  filterproduct:Product[] = [];
  size:Size[];
  color:Color[];
  subcategory:Subcategory[];
  selected:string[]=[];
  price:number = 0;  
  constructor(private CategoryService:CategoryService,private route:ActivatedRoute,private router:Router,private ProductService:ProductService,private SizeService:SizeService,private SubCategoryService:SubcategoryService,private ColorService:ColorService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id = +params['id'];
      this.CategoryService.getCategories().subscribe(data=>{
        console.log(data[this.id])
        this.Category = data[this.id].category_name;
        this.getSubCategory(data[this.id].id);
        this.getproduct();
      });
      this.SizeService.getSizes().subscribe(data=>{
        this.size = data;
      });
      this.ColorService.getcolor().subscribe(data=>{
        this.color = data; 
      });
      

      

    });
    
  }
  getproduct(){
    console.log(this.Category);
    this.ProductService.GetProduct().subscribe(data=>{
      this.product = data.filter(item=>item.category_name==this.Category);
      this.filterproduct = this.product;
    });
  }
  getSubCategory(categoryid:number){
    this.SubCategoryService.getSubcategories().subscribe(data=>{
      this.subcategory = data.filter(item=>item.category_id==categoryid);
    });
  }
  sorting(e){
   console.log(e.target.value); 
   if(e.target.value == "name"){
    this.product.sort((a,b)=>(a.product_name<b.product_name)?-1:1);
    this.filterproduct.sort((a,b)=>(a.product_name<b.product_name)?-1:1);
   }
   else{
    this.product.sort((a,b)=>(a.price<b.price)?-1:1);
    this.filterproduct.sort((a,b)=>(a.price<b.price)?-1:1);
   }
    
  }

  filterbysize(e,name){
    if(this.selected.length == 0){
      
      this.filterproduct=[];
      
    }
    if(e.target.checked){
      // this.filterproduct = this.filterproduct.filter(m=>m.size_name==name);
      
      this.filterproduct.push(...this.product.filter(m=>m.size_name==name));
      this.selected.push(name);
    }
    else{
      this.filterproduct = this.filterproduct.filter(m=>m.size_name!=name);
      this.selected.splice(this.selected.indexOf(name),1);
      console.log(this.selected);
    }
    if(this.selected.length == 0){
      
      
      this.filterproduct = this.product;
    }

    
    
  }
  filterbysubcat(e,name){
    if(this.selected.length == 0){
      this.filterproduct = [];
    }
    if(e.target.checked){
      if(this.selected.length == 0){
        this.filterproduct.push(...this.product.filter(m=>m.subcategory_name==name));
      }
      else{
        
        this.filterproduct = this.filterproduct.filter(m=>m.subcategory_name==name);
      }
      
      this.selected.push(name);
    }
    else{
      this.filterproduct = this.filterproduct.filter(m=>m.subcategory_name!=name);
      this.selected.splice(this.selected.indexOf(name),1);
    }

    if(this.selected.length == 0){
      this.filterproduct = this.product;
    }
  }
  filterbyprice(e,price){
    if(this.selected.length == 0){
      this.filterproduct = this.product.filter(m=>m.price<=+price);
    }
    else{
      this.filterproduct = this.filterproduct.filter(m=>m.price<=+price);
    }
    
  }
  filterbycolor(e,name){
    if(this.selected.length == 0){
      this.filterproduct = this.product.filter(m=>m.color_name == name);
    }
    else{
      this.filterproduct = this.filterproduct.filter(m=>m.color_name == name);
    }
    
  }

  resetcolor(){
    this.filterproduct = this.product;
  }

}
