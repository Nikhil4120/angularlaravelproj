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
import { Options } from 'ng5-slider';
import { HeaderService } from 'src/app/services/header.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  value: number = 0;
  highValue: number = 2000;
  options: Options = {
    floor: 0,
    ceil: 2000,
  };
  isloading = false;
  category_name;
  checkedsubcat;
  checkedsize;
  checkedcolor:string = '';
  Category: string = '';
  product: Product[] = [];
  filterproduct: Product[] = [];
  size: Size[] = [];
  color: Color[] = [];
  subcategory: Subcategory[] = [];
  selected: string[] = [];
  price: number = 0;
  countsubcategory = [];
  countsize = [];
  countcolor = [];
  no_of_records = 8;
  selectedsubcategory = '';
  currency = 'inr';

  constructor(
    private CategoryService: CategoryService,
    private route: ActivatedRoute,
    private toastr:ToastrService,
    private ProductService: ProductService,
    private SizeService: SizeService,
    private SubCategoryService: SubcategoryService,
    private ColorService: ColorService,
    private headerservice: HeaderService,
    private currencyservice: CurrencyService
  ) {}

  ngOnInit(): void {
    this.headerservice.obs.subscribe((data) => {
      this.selectedsubcategory = data;
      if (this.checkedsubcat) {
        this.countsubcategories();
        this.mainFunctionForFilter();
      }
    },(error)=>{
      this.toastr.error("Something went wrong!!!")
    });

    this.currencyservice.obs.subscribe((data) => {
      this.currency = data;
      if (this.currency != 'inr') {
        this.highValue = 30;
        this.options = {
          floor: 0,
          ceil: 30,
        };
      } else {
        this.highValue = 2000;
        this.options = {
          floor: 0,
          ceil: 2000,
        };
      }
    },(error)=>{
      this.toastr.error("Something went wrong!!!")
    });
    this.route.params.subscribe((params: Params) => {
      this.filterproduct = [];
      this.category_name = params['id'];
      this.selected = [];
      this.countsubcategory = [];
      this.countsize = [];
      this.countcolor = [];
      this.isloading = true;
      window.scroll(0, 0);
      this.selectedsubcategory = this.headerservice.Getsubcategory();

      this.CategoryService.getCategories().subscribe((data) => {
        this.Category = this.category_name;
        const category = data.find(
          (m) => m.category_name.toLowerCase() == this.Category
        );
        this.getSubCategory(category.id);
        this.getproduct();
      },(error)=>{
        this.toastr.error("Something went wrong!!!");
      });
    });
  }

  getproduct() {
    this.ProductService.GetProduct().subscribe((data) => {
      this.product = data.filter(
        (item) => item.category_name.toLowerCase() == this.Category
      );
      if (this.selectedsubcategory != '') {
        this.filterproduct = this.product.filter(
          (m) => m.subcategory_name == this.selectedsubcategory
        );
      } else {
        this.filterproduct = this.product.slice(0, 8);
      }

      this.SizeService.getSizes().subscribe((data) => {
        this.size = data;
        this.countsizes();
      },(error)=>{
        this.toastr.error("Something went wrong!!!");
      });
      this.ColorService.getcolor().subscribe((data) => {
        this.color = data;
        this.countcolors();
      },(error)=>{
        this.toastr.error("Something went wrong!!!");
      });

      this.countsubcategories();
      this.isloading = false;
    },(error)=>{
      this.toastr.error("Something went wrong!!!");
    });
  }

  getSubCategory(categoryid: number) {
    this.SubCategoryService.getSubcategories().subscribe((data) => {
      this.subcategory = data.filter((item) => item.category_id == categoryid);
      this.countsubcategories();
    },(error)=>{
      this.toastr.error("Something went wrong!!!");
    });
  }

  sorting(e) {
    if (e.target.value == 'name') {
      this.filterproduct.sort((a, b) =>
        a.product_name < b.product_name ? -1 : 1
      );
    } else {
      this.filterproduct.sort((a, b) => (a.price < b.price ? -1 : 1));
    }
  }

  mainFunctionForFilter() {
    let product_length = this.checkedsubcat.filter((m) => m != 0).length;
    let storeproduct = [];
    if (product_length == 0) {
      storeproduct = this.product;
    } else {
      for (let index = 0; index < this.subcategory.length; index++) {
        const element = this.checkedsubcat[index];
        if (element != 0) {
          const prod = this.product.filter(
            (m) =>
              m.subcategory_name == this.subcategory[index].subcategory_name
          );
          storeproduct.push(...prod);
        }
      }
    }

    product_length = this.checkedsize.filter((m) => m != 0).length;

    let productbysize = [];
    if (product_length == 0) {
      productbysize = storeproduct;
    } else {
      for (let index = 0; index < this.size.length; index++) {
        const element = this.checkedsize[index];
        if (element != 0) {
          const prod = storeproduct.filter((m, i) => {
            const t = m.size_id.split(',');
            if (t.includes(this.size[index].size_name)) {
              if (!productbysize.includes(m)) {
                return true;
              } else {
                return false;
              }
            } else {
              return false;
            }
          });
          productbysize.push(...prod);
        }
      }
    }

    product_length = this.checkedcolor;

    let productstore = [];
    if (product_length == '') {
      productstore = productbysize;
    } else {
      productstore = productbysize.filter((m) => m.color_name == product_length);
    }
    if (this.currency == 'inr') {
      productstore = productstore.filter(
        (m) => m.price >= this.value && m.price <= this.highValue
      );
    } else {
      productstore = productstore.filter(
        (m) => m.price / 70 >= this.value && m.price / 70 <= this.highValue
      );
    }

    this.filterproduct = productstore;
  }

  filterbysize(e,i) {
    if (e.target.checked) {
      this.checkedsize[i] = 1;
      this.mainFunctionForFilter();
    } else {
      this.checkedsize[i] = 0;
      this.mainFunctionForFilter();
    }
  }

  filterbysubcat(e,i) {
    if (e.target.checked) {
      this.checkedsubcat[i] = 1;
      this.mainFunctionForFilter();
    } else {
      this.checkedsubcat[i] = 0;
      this.mainFunctionForFilter();
    }
  }

  filterbyprice() {
    this.mainFunctionForFilter();
  }

  filterbycolor(name) {
    this.checkedcolor = name;
    this.mainFunctionForFilter();
  }

  resetcolor() {
    this.checkedcolor = '';
    this.mainFunctionForFilter();
  }

  countsubcategories() {
    this.checkedsubcat = this.subcategory.map((value, index) => {
      this.subcategory[index]['count'] = 0;
      if (value.subcategory_name == this.selectedsubcategory) {
        return 1;
      } else {
        return 0;
      }
    });

    for (let index = 0; index < this.subcategory.length; index++) {
      const len = this.product.filter(
        (m) => m.subcategory_name == this.subcategory[index].subcategory_name
      ).length;
      this.subcategory[index].count = len;
    }
  }

  countsizes() {
    this.checkedsize = this.size.map((value, index) => {
      this.size[index]['count'] = 0;
      return 0;
    });

    for (let index = 0; index < this.size.length; index++) {
      const len = this.product.filter((m, i) => {
        const temp = this.product[i].size_id.split(',');
        if (temp.includes(this.size[index].size_name)) {
          return true;
        } else {
          return false;
        }
      }).length;
      this.size[index].count = len;
    }
  }

  countcolors() {
    this.countcolor = this.color.map((value, index) => {
      this.color[index]['count'] = 0;
      const len = this.product.filter(
        (m) => value.color_name == m.color_name
      ).length;
      this.color[index]['count'] = len;
    });
  }

  moreproduct() {
    this.no_of_records = this.no_of_records + 4;
    this.filterproduct = this.product.slice(0, this.no_of_records);
  }

  resetsubcategory() {
    this.checkedsubcat = this.checkedsubcat.map((value, index) => {
      return 0;
    });
    this.mainFunctionForFilter();
  }

  resetsize() {
    this.checkedsize = this.checkedsize = this.checkedsize.map(
      (value, index) => {
        return 0;
      }
    );
    this.mainFunctionForFilter();
  }
}
