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

  isloading= false;
  id:number;
  checkedsubcat;
  checkedsize;
  Category:string = "";
  product:Product[] = [];
  filterproduct:Product[] = [];
  size:Size[];
  color:Color[];
  subcategory:Subcategory[]=[];
  selected:string[]=[];
  price:number = 0;  
  countsubcategory = [];
  countsize = [];
  countcolor = [];
  
  constructor(private CategoryService:CategoryService,private route:ActivatedRoute,private router:Router,private ProductService:ProductService,private SizeService:SizeService,private SubCategoryService:SubcategoryService,private ColorService:ColorService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.filterproduct = [];
      this.id = +params['id'];
      this.selected = [];
      this.countsubcategory = [];
      this.countsize = [];
      this.countcolor = [];
      this.isloading = true;      
      window.scroll(0,0);
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
      this.isloading = false;
      this.countsizes();
      this.countcolors();
      this.countsubcategories();  
    });
      
     
  }
  getSubCategory(categoryid:number){
    this.SubCategoryService.getSubcategories().subscribe(data=>{
      
      this.subcategory = data.filter(item=>item.category_id==categoryid);
      this.countsubcategories();  
    });

    

    

  }
  sorting(e){
  //  console.log(e.target.value); 
   if(e.target.value == "name"){
    
    this.filterproduct.sort((a,b)=>(a.product_name<b.product_name)?-1:1);
   }
   else{
    
    this.filterproduct.sort((a,b)=>(a.price<b.price)?-1:1);
   }
    
  }

  mainFunctionForFilter(){

    //category size  product=[1,2,3,4,5,6,7,8,9,10]
    ////a=[1,0,1]   product1=[2,3,4,6,7,8,9]
      // if everry element of a is zero than prd1=prd
    // for (let index = 0; index < this.size.length; index++) {
    //   console.log(this.size[index].size_name);
      
    //   const len = (this.product.filter(m=>m.size_name == this.size[index].size_name)).length;
    //   this.countsize.push(len);
      
    // }

    //category subcategory product=[2,3,4,6,7,8,9]=prd1
    //b=[0,0,0]        prd2=[2,3,9]
    //if every b is zerothan prd2=prd1

    //prd3 
    console.log(this.checkedsubcat);
    var len = this.checkedsubcat.filter(m=>m!=0)
    var temp = [];
    if(len==0){
      temp = this.product;
    }
    else{
      for (let index = 0; index < this.subcategory.length; index++) {
        const element = this.checkedsubcat[index];
        if(element!=0){

          const prod = this.product.filter(m=>m.subcategory_name==this.subcategory[index].subcategory_name);
          temp.push(...prod);

        }
        
      }

    }
    len = this.checkedsize.filter(m=>m!=0);
    var temp1 = [];
    if(len==0){
      temp1 = temp;
    }
    else{
      for (let index = 0; index < this.size.length; index++) {
        const element = this.checkedsize[index];
        if(element!=0){

          const prod = temp.filter((m,i)=>{
            const t = m.size_id.split(",");
            if(t.includes(this.size[index].size_name)){
              if(!temp1.includes(m)){
                return true;  
              }
              else{
                return false;
              }
              
            }
            else{
              return false;
            }
            });
          temp1.push(...prod);
        }
        
      }
    }
    this.filterproduct = temp1;



    
  }
  filterbysize(e,name,i){
    // if(this.selected.length == 0){
      
    //   this.filterproduct=[];
      
    // }
    if(e.target.checked){
      // this.filterproduct = this.filterproduct.filter(m=>m.size_name==name);
      this.checkedsize[i]=1;
      // this.filterproduct.push(...this.product.filter(m=>m.size_name==name));
      // this.selected.push(name);
      this.mainFunctionForFilter();
    }
    else{
      this.checkedsize[i]=0;
      this.mainFunctionForFilter();
      // this.filterproduct = this.filterproduct.filter(m=>m.size_name!=name);
      // this.selected.splice(this.selected.indexOf(name),1);
      // console.log(this.selected);
    }
    // if(this.selected.length == 0){
      
      
    //   this.filterproduct = this.product;
    // }

    
    
  }
  filterbysubcat(e,name,i){
    // if(this.selected.length == 0){
    //   this.filterproduct = [];
    // }
    if(e.target.checked){
     
        // this.filterproduct.push(...this.product.filter(m=>m.subcategory_name==name));
        this.checkedsubcat[i] = 1;
        this.mainFunctionForFilter(); 
      
      // this.selected.push(name);
    }
    else{
      
      this.checkedsubcat[i] = 0;
      this.mainFunctionForFilter();
      // this.filterproduct = this.filterproduct.filter(m=>m.subcategory_name!=name);
      // this.selected.splice(this.selected.indexOf(name),1);
    }

    // if(this.selected.length == 0){
    //   this.filterproduct = this.product;
    // }
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

  countsubcategories(){
    this.checkedsubcat = this.subcategory.map((value,index)=>{
      this.subcategory[index]['count'] = 0;
      return 0;
    });
    
    for (let index = 0; index < this.subcategory.length; index++) {
      
      
      const len = (this.product.filter(m=>m.subcategory_name == this.subcategory[index].subcategory_name)).length;
      this.subcategory[index].count = len;
      
    }
    console.log(this.subcategory);
    
  }
  countsizes(){
    
    
    
    this.checkedsize = this.size.map((value,index)=>{
      (this.size[index])['count'] = 0;
      return 0;
    });
    console.log(this.size);
    for (let index = 0; index < this.size.length; index++) {
      // console.log(this.size[index].size_name);
      
      const len = (this.product.filter((m,i)=>{
       const temp =  this.product[i].size_id.split(",");
       if(temp.includes(this.size[index].size_name)){
        
        return true;
       }
       else{
         return false;
       }

        })).length;

      this.size[index].count = len;
      
      
    }
    console.log(this.size);
  }
  countcolors(){
    // for (let index = 0; index < this.color.length; index++) {
      
    //   console.log(this.color[index].color_name);
    //   const len = (this.product.filter(m=>m.color_name == this.color[index].color_name)).length;
    //   this.countcolor.push(len);
      
    // }
    console.log(this.color);

    this.countcolor = this.color.map((value,index)=>{
      (this.color[index])['count']= 0;
      const len = this.product.filter(m=>value.color_name == m.color_name).length;
      this.color[index]['count']=len;
    });

  }
}
