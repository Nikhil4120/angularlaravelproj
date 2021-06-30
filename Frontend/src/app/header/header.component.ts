import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../models/category.model';
import { Subcategory } from '../models/subcategory.model';
import { AuthService } from '../services/auth.service';
import { CategoryService } from '../services/category.service';
import { SubcategoryService } from '../services/subcategory.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public loggedIn:boolean;
  username:string;
  category:Category[] = [];
  subcategory:Subcategory[] = [];
  constructor(private CategoryService:CategoryService,private SubcategoryService:SubcategoryService,private AuthService:AuthService,private router:Router,private tokenservice:TokenService) { }

  ngOnInit(): void {
    this.AuthService.authstatus.subscribe(value=>{
      this.loggedIn = value;
    });
    this.CategoryService.getCategories().subscribe(data=>{
      this.category = data;
    });

    this.SubcategoryService.getSubcategories().subscribe(data=>{
      this.subcategory = data;
      
    })
    if(this.loggedIn){
      const token = localStorage.getItem('token');
      this.AuthService.getuser(token).subscribe(data=>{
        
        this.username = data['user'].username;
      }
        
      )
    }
  }
  logout(){
    this.tokenservice.remove();
    this.AuthService.changeAuthStatus(false);
    this.router.navigate(['/']);
  }
}
