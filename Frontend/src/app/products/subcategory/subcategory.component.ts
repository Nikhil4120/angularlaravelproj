import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Color } from 'src/app/models/color.model';
import { Product } from 'src/app/models/product.model';
import { Size } from 'src/app/models/size.model';
import { ColorService } from 'src/app/services/color.service';
import { ProductService } from 'src/app/services/product.service';
import { SizeService } from 'src/app/services/size.service';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {
  isloading = false;
  product:Product[] = [];
  filterproduct:Product[] = [];
  size:Size[] = [];
  color:Color[] = [];
  category = "";
  subcategory = "";
  value: number = 0;
  highValue: number = 2000;
  options: Options = {
    floor: 0,
    ceil: 2000
  }

  constructor(private router:ActivatedRoute,private ProductService:ProductService,private SizeService:SizeService,private ColorService:ColorService) { }

  ngOnInit(): void {
    this.router.params.subscribe((params:Params)=>{
      this.isloading = true;
      this.category = params['category'];
      this.subcategory = params['subcategory'];
      this.ProductService.GetProduct().subscribe(data=>{
        this.product = data.filter(m=>m.subcategory_name.toLowerCase() == this.subcategory && m.category_name.toLowerCase() == this.category);
        this.filterproduct = this.product.slice(0,8);
        this.isloading = false;
      });
      this.SizeService.getSizes().subscribe(data => {
        this.size = data;

      });
      this.ColorService.getcolor().subscribe(data => {
        this.color = data;
      });

    });
  }

}
