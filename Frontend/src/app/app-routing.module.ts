import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { RegisterComponent } from './register/register.component';
import { AfterloginService } from './services/afterlogin.service';
import { BeforeloginService } from './services/beforelogin.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CartComponent } from './cart/cart.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ProductSearchComponent } from './products/product-search/product-search.component';
import { OrdersComponent } from './orders/orders.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'register',component:RegisterComponent,canActivate:[BeforeloginService]},
  {path:'about',component:AboutusComponent},
  {path:'products/detail/:id',component:ProductDetailsComponent},
  {path:'products/:id',component:ProductListComponent},
  {path:'userprofile',component:UserProfileComponent,canActivate:[AfterloginService]},
  {path:'cart',component:CartComponent,canActivate:[AfterloginService]},
  {path:'contact',component:ContactusComponent},
  {path:'productsearch/:id',component:ProductSearchComponent},
  {path:'orders',component:OrdersComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
