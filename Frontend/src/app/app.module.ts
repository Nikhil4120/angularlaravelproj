import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { HomeComponent } from './home/home.component';
import { ProductItemComponent } from './products/product-item/product-item.component';
import { RegisterComponent } from './register/register.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FooterComponent } from './footer/footer.component';
import { Ng5SliderModule } from 'ng5-slider';
import { CartComponent } from './cart/cart.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { ToastrModule } from 'ngx-toastr';
import { ContactusComponent } from './contactus/contactus.component';

import { ProductSearchComponent } from './products/product-search/product-search.component';
import { RatingModule } from 'ng-starrating';
import { OrdersComponent } from './orders/orders.component';
import { OrderItemsComponent } from './orders/order-items/order-items.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { SlicePipe } from './pipes/slice.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { PaginationPipe } from './pipes/pagination.pipe';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    ProductListComponent,
    HomeComponent,
    ProductItemComponent,
    RegisterComponent,
    AboutusComponent,
    ProductDetailsComponent,
    LoadingSpinnerComponent,
    LoginComponent,
    UserProfileComponent,
    FooterComponent,
    CartComponent,
    TestimonialComponent,
    ContactusComponent,
    
    ProductSearchComponent,
    OrdersComponent,
    OrderItemsComponent,
    OrderDetailsComponent,
    SlicePipe,
    SearchPipe,
    PaginationPipe,
    ChangepasswordComponent,
    ForgetpasswordComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    Ng5SliderModule,
    CarouselModule,
    ToastrModule.forRoot(),
    RatingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
