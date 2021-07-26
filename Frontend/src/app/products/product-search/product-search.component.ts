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
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css'],
})
export class ProductSearchComponent implements OnInit {
  isloading: boolean = false;
  value: number = 0;
  highValue: number = 2000;
  options: Options = {
    floor: 0,
    ceil: 2000,
  };
  product: Product[] = [];
  filterproduct: Product[] = [];
  subcategory: Subcategory[] = [];
  product_name;
  color: Color[] = [];
  size: Size[] = [];
  countsubcategory = [];
  countsize = [];
  countcolor = [];
  checkedsubcat;
  checkedsize;
  checkedcolor: string = '';
  no_of_record: number = 8;
  currency: string = 'inr';

  constructor(
    private ProductService: ProductService,
    private Route: ActivatedRoute,
    private SubCategoryService: SubcategoryService,
    private ColorService: ColorService,
    private SizeService: SizeService,
    private currencyservice: CurrencyService
  ) {}

  ngOnInit(): void {
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
    });

    this.Route.params.subscribe((params: Params) => {
      this.isloading = true;
      this.product_name = params['id'];
      this.SubCategoryService.getSubcategories().subscribe((data) => {
        this.subcategory = data;
        this.countsubcategories();
      });
      
      this.ProductService.GetProduct().subscribe((data) => {
        this.product = data.filter((m) =>
          m.product_name.toLowerCase().includes(this.product_name.toLowerCase())
        );
        this.ColorService.getcolor().subscribe((data) => {
          this.color = data;
          this.countcolors();
        });
        this.SizeService.getSizes().subscribe((data) => {
          this.size = data;
          this.countsizes();
        });
        this.filterproduct = this.product.slice(0, 8);
        this.countsubcategories();
        
        
        this.isloading = false;
      });
    });
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
      productstore = productbysize.filter(
        (m) => m.color_name == product_length
      );
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

  filterbysize(e, name, i) {
    if (e.target.checked) {
      this.checkedsize[i] = 1;
      this.mainFunctionForFilter();
    } else {
      this.checkedsize[i] = 0;
      this.mainFunctionForFilter();
    }
  }

  filterbysubcat(e, name, i) {
    if (e.target.checked) {
      this.checkedsubcat[i] = 1;
      this.mainFunctionForFilter();
    } else {
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
    this.checkedcolor = '';
    this.mainFunctionForFilter();
  }

  countsubcategories() {
    this.checkedsubcat = this.subcategory.map((value, index) => {
      this.subcategory[index]['count'] = 0;
      return 0;
    });

    for (let index = 0; index < this.subcategory.length; index++) {
      const len = this.filterproduct.filter(
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
      const len = this.filterproduct.filter((m, i) => {
        const temp = this.filterproduct[i].size_id.split(',');
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
      const len = this.filterproduct.filter(
        (m) => value.color_name == m.color_name
      ).length;
      this.color[index]['count'] = len;
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

  moreproduct() {
    this.no_of_record = this.no_of_record + 4;
    this.filterproduct = this.product.slice(0, this.no_of_record);
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
