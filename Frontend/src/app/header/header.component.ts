import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { Subcategory } from '../models/subcategory.model';
import { CategoryService } from '../services/category.service';
import { SubcategoryService } from '../services/subcategory.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  category:Category[] = [];
  subcategory:Subcategory[] = [];
  constructor(private CategoryService:CategoryService,private SubcategoryService:SubcategoryService) { }

  ngOnInit(): void {
    this.CategoryService.getCategories().subscribe(data=>{
      this.category = data;
    });

    this.SubcategoryService.getSubcategories().subscribe(data=>{
      this.subcategory = data;
      
    })
  }

}
