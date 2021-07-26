import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../models/category.model';
import { Subcategory } from '../models/subcategory.model';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { CategoryService } from '../services/category.service';
import { SubcategoryService } from '../services/subcategory.service';
import { TokenService } from '../services/token.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
import { HeaderService } from '../services/header.service';
import { LocationService } from '../services/location.service';
import { CurrencyService } from '../services/currency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public loggedIn: boolean;
  envimage = environment.image;
  username: string;
  category: Category[] = [];
  subcategory: Subcategory[] = [];
  cartitems = [];
  issubcategory = [];
  total = 0;
  settingopen = false;
  currencytoggle = false;
  currency = 'inr';
  @ViewChild('closecart',{static:true}) closecart:ElementRef;

  constructor(
    private CategoryService: CategoryService,
    private SubcategoryService: SubcategoryService,
    private AuthService: AuthService,
    private router: Router,
    private tokenservice: TokenService,
    private cartService: CartService,
    private toastr: ToastrService,
    private headerService: HeaderService,
    private route:ActivatedRoute,
    private locationservice:LocationService,
    private currencyservice:CurrencyService
  ) {}

  ngOnInit(): void {
    
    this.AuthService.authstatus.subscribe((value) => {
      this.loggedIn = value;
      if (this.loggedIn) {
        const token = localStorage.getItem('token');
        this.AuthService.getuser(token).subscribe(
          (data) => {
            this.username = data['user'].username;
          },
          (error) => {
            this.toastr.error(
              error.error.message
            );
            this.logout();
          }
        );
      }
    });
    this.currencyservice.obs.subscribe(data=>{
      this.currency = data;
    })
    this.CategoryService.getCategories().subscribe((data) => {
      this.category = data;
    });
    this.SubcategoryService.getSubcategories().subscribe((data) => {
      this.subcategory = data;
      this.issubcategories();
    });
    this.cartService.getCartProducts().subscribe((data) => {
      this.cartitems = data;
      this.grandtotal();
    });
    this.cartitem();
  }

  issubcategories() {
    for (let index = 0; index < this.category.length; index++) {
      const element = this.category[index].id;
      const len = this.subcategory.filter(
        (m) => m.category_id == element
      ).length;
      this.issubcategory.push(len);
    }
  }

  cartitem() {
    if (localStorage.getItem('cart')) {
      this.cartitems = JSON.parse(localStorage.getItem('cart'));
      this.grandtotal();
    }
  }

  grandtotal() {
    this.total = 0;
    if (localStorage.getItem('cart')) {
      let products = JSON.parse(localStorage.getItem('cart'));

      for (let index = 0; index < products.length; index++) {
        this.total += products[index].price * products[index].product_quantity;
      }
    }
  }

  removeitem(id, size) {
    this.cartService.removeitem(id, size);
  }

  onSearch(search: NgForm) {
    if (search.value.searchtext) {
      const value = search.value.searchtext;
      this.router.navigate(['/productsearch/' + value]);
    }
  }

  currencysetting(){
    this.currencytoggle = !this.currencytoggle;
  }

  logout() {
    this.tokenservice.remove();
    localStorage.removeItem('cart');
    this.AuthService.changeAuthStatus(false);
    this.router.navigate(['/']);
  }

  subcategorychange(name) {
    this.headerService.Storesubcategory(name);
    
  }

  categorychange() {
    this.headerService.Storesubcategory('');
  }

  hidecart(){
    this.closecart.nativeElement.click();
  }

  setting(){
    this.settingopen = !this.settingopen;
  }

  dropclose(){
    this.settingopen = false;
  }

  
  currencychange(name){
    this.currencyservice.Storecurrency(name);
  }
}
