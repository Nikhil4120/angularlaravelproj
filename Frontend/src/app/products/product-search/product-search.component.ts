import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ColorService } from 'src/app/services/color.service';
import { ProductService } from 'src/app/services/product.service';
import { SizeService } from 'src/app/services/size.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { Options } from 'ng5-slider';
import { Product } from 'src/app/models/product.model';
import { Subcategory } from 'src/app/models/subcategory.model';
import { Color } from 'src/app/models/color.model';
import { Size } from 'src/app/models/size.model';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  isloading = false;
  value: number = 0;
  highValue: number = 2000;
  options: Options = {
    floor: 0,
    ceil: 2000
  }
  product:Product[] = [];
  filterproduct:Product[] = [];
  subcategory:Subcategory[] = [];
  id;
  color:Color[] = [];
  size:Size[] = [];
  countsubcategory = [];
  countsize = [];
  countcolor = [];
  checkedsubcat;
  checkedsize;
  checkedcolor = "";
  i = 8;
  constructor(private ProductService:ProductService,private Route:ActivatedRoute,private SubCategoryService:SubcategoryService,private ColorService:ColorService,private SizeService:SizeService) { }
  
  ngOnInit(): void {
    
    
    
    this.Route.params.subscribe((params:Params)=>{
      this.isloading = true;
      this.id = params['id'];
      this.SubCategoryService.getSubcategories().subscribe(data => {
        this.subcategory = data;
        this.countsubcategories();
      });
      this.ColorService.getcolor().subscribe(data => {
        this.color = data;
      });
      this.SizeService.getSizes().subscribe(data => {
        this.size = data;

      });
      this.ProductService.GetProduct().subscribe(data=>{
        this.product = data.filter(m=>m.product_name.toLowerCase().includes(this.id.toLowerCase()));;
        
        this.filterproduct = this.product.slice(0,8);
        this.countsubcategories();
        this.countsizes();
        this.countcolors();
        this.isloading  = false;
      });
      
    });
  }

  mainFunctionForFilter() {
    var len = this.checkedsubcat.filter(m => m != 0).length;
    var temp = [];
    if (len == 0) {
      temp = this.product;
    }

    else {
      for (let index = 0; index < this.subcategory.length; index++) {
        const element = this.checkedsubcat[index];
        if (element != 0) {

          const prod = this.product.filter(m => m.subcategory_name == this.subcategory[index].subcategory_name);
          temp.push(...prod);

        }

      }

    }

    len = this.checkedsize.filter(m => m != 0).length;

    var temp1 = [];
    if (len == 0) {

      temp1 = temp;
    }
    else {
      for (let index = 0; index < this.size.length; index++) {
        const element = this.checkedsize[index];
        if (element != 0) {
          const prod = temp.filter((m, i) => {
            const t = m.size_id.split(",");
            if (t.includes(this.size[index].size_name)) {
              if (!temp1.includes(m)) {
                return true;
              }
              else {
                return false;
              }
            }
            else {
              return false;
            }
          });
          temp1.push(...prod);
        }
      }
    }

    len = this.checkedcolor;
    console.log(len);
    var temp2 = [];
    if (len == "") {
      temp2 = temp1;
    }
    else {
      temp2 = temp1.filter(m => m.color_name == len);
    }
    temp2 = temp2.filter(m => m.price >= this.value && m.price <= this.highValue);
    this.filterproduct = temp2;
  }

  filterbysize(e, name, i) {
    if (e.target.checked) {
      this.checkedsize[i] = 1;
      this.mainFunctionForFilter();
    }
    else {
      this.checkedsize[i] = 0;
      this.mainFunctionForFilter();
    }
  }

  filterbysubcat(e, name, i) {

    if (e.target.checked) {
      this.checkedsubcat[i] = 1;
      this.mainFunctionForFilter();
    }
    else {
      this.checkedsubcat[i] = 0;
      this.mainFunctionForFilter();
    }
  }

  filterbyprice(e) {
    this.mainFunctionForFilter();
  }

  filterbycolor(e, name) {
    this.checkedcolor = name;
    this.mainFunctionForFilter();

  }

  resetcolor() {

    this.checkedcolor = ""
    this.mainFunctionForFilter();
  }

  countsubcategories() {
    this.checkedsubcat = this.subcategory.map((value, index) => {
      this.subcategory[index]['count'] = 0;
      return 0;
    });

    for (let index = 0; index < this.subcategory.length; index++) {
      const len = (this.filterproduct.filter(m => m.subcategory_name == this.subcategory[index].subcategory_name)).length;
      this.subcategory[index].count = len;
    }
  }

  countsizes() {
    
    this.checkedsize = this.size.map((value, index) => {
      (this.size[index])['count'] = 0;
      return 0;
    });

    for (let index = 0; index < this.size.length; index++) {
      const len = (this.filterproduct.filter((m, i) => {
        const temp = this.filterproduct[i].size_id.split(",");
        if (temp.includes(this.size[index].size_name)) {
          return true;
        }
        else {
          return false;
        }
      })).length;
      this.size[index].count = len;
    }

  }

  countcolors() {
    this.countcolor = this.color.map((value, index) => {
      (this.color[index])['count'] = 0;
      const len = this.filterproduct.filter(m => value.color_name == m.color_name).length;
      this.color[index]['count'] = len;
    });

  }

  sorting(e) {

    if (e.target.value == "name") {
      this.filterproduct.sort((a, b) => (a.product_name < b.product_name) ? -1 : 1);
    }
    else {
      this.filterproduct.sort((a, b) => (a.price < b.price) ? -1 : 1);
    }

  }
  
  moreproduct(){
    this.i = this.i + 4; 
   this.filterproduct =  this.product.slice(0,this.i);
  }

}
