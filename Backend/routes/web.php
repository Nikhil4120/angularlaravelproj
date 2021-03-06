<?php

use Illuminate\Support\Facades\Route;
use App\Http\controllers\CategoryController;
use App\Http\controllers\SubcategoryController;
use App\Http\controllers\AdminController;
use App\Http\controllers\ColorController;
use App\Http\controllers\SizeController;
use App\Http\controllers\ProductController;
use App\Http\controllers\CountryController;
use App\Http\controllers\StateController;
use App\Http\controllers\CityController;
use App\Http\controllers\newsController;
use App\Http\controllers\frontuserController;
use App\Http\controllers\SliderController;
use App\Http\controllers\TestimonialController;
use App\Http\controllers\TaxAmountController;
use App\Http\controllers\OrderController;
use App\Http\controllers\AboutController;
use App\Http\controllers\ContactController;
use App\Http\controllers\CouponController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Redirect()->route('login');
});

Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    return view('admin.index');
})->name('dashboard');

Route::get('/admin/logout',[AdminController::class,'Logout'])->name('admin.logout');

Route::get('/categories',[CategoryController::class,'Index'])->name('categories');
Route::get('/add/category',[CategoryController::class,'AddCategory'])->name('add.category');
Route::post('/store/category',[CategoryController::class,'StoreCategory'])->name('store.category');
Route::get('/edit/category/{id}',[CategoryController::class,'EditCategory'])->name('edit.category');
Route::post('/update/category/{id}',[CategoryController::class,'UpdateCategory'])->name('update.category');
Route::get('/delete/category/{id}',[CategoryController::class,'DeleteCategory'])->name('delete.category');
Route::get('/active/category/{id}',[CategoryController::class,'ActiveCategory'])->name('category.active');
 Route::get('/deactive/category/{id}',[CategoryController::class,'DeactiveCategory'])->name('category.deactive');
 Route::get('/view/category/{id}',[CategoryController::class,'ViewCategory'])->name('category.view');


 Route::get('/subcategories',[SubcategoryController::class,'Index'])->name('subcategories');
 Route::get('/add/subcategory',[SubcategoryController::class,'AddSubCategory'])->name('add.subcategory');
 Route::post('/store/subcategory',[SubcategoryController::class,'StoreSubCategory'])->name('store.subcategory');
 Route::get('/edit/subcategory/{id}',[SubcategoryController::class,'EditSubCategory'])->name('edit.subcategory');
 Route::post('/update/subcategory/{id}',[SubcategoryController::class,'UpdateSubCategory'])->name('update.subcategory');
 Route::get('/delete/subcategory/{id}',[SubcategoryController::class,'DeleteSubCategory'])->name('delete.subcategory');
 Route::get('/active/subcategory/{id}',[SubcategoryController::class,'ActiveSubCategory'])->name('subcategory.active');
 Route::get('/deactive/subcategory/{id}',[SubcategoryController::class,'DeactiveSubCategory'])->name('subcategory.deactive');
 Route::get('/view/subcategory/{id}',[SubcategoryController::class,'ViewSubCategory'])->name('subcategory.view');

 Route::get('/colors',[ColorController::class,'Index'])->name('colors');
 Route::get('/add/color',[ColorController::class,'AddColor'])->name('add.color');
 Route::post('/store/color',[ColorController::class,'StoreColor'])->name('store.color');
 Route::get('/edit/color/{id}',[ColorController::class,'EditColor'])->name('edit.color');
 Route::post('/update/color/{id}',[ColorController::class,'UpdateColor'])->name('update.color');
 Route::get('/delete/color/{id}',[ColorController::class,'DeleteColor'])->name('delete.color');
 Route::get('/active/color/{id}',[ColorController::class,'ActiveColor'])->name('color.active');
 Route::get('/deactive/color/{id}',[ColorController::class,'DeactiveColor'])->name('color.deactive');
 Route::get('/view/color/{id}',[ColorController::class,'ViewColor'])->name('color.view');

 Route::get('/size',[SizeController::class,'Index'])->name('size');
 Route::get('/add/size',[SizeController::class,'AddSize'])->name('add.size');
 Route::post('/store/size',[SizeController::class,'StoreSize'])->name('store.size');
 Route::get('/edit/size/{id}',[SizeController::class,'EditSize'])->name('edit.size');
 Route::post('/update/size/{id}',[SizeController::class,'UpdateSize'])->name('update.size');
 Route::get('/delete/size/{id}',[SizeController::class,'DeleteSize'])->name('delete.size');
 Route::get('/active/size/{id}',[SizeController::class,'ActiveSize'])->name('size.active');
 Route::get('/deactive/size/{id}',[SizeController::class,'DeactiveSize'])->name('size.deactive');
 Route::get('/view/size/{id}',[SizeController::class,'ViewSize'])->name('size.view');
 

 Route::get('/get/subcategory/{id}',[ProductController::class,'GetSubCategory']);
 Route::get('/products',[ProductController::class,'Index'])->name('product');
 Route::get('/add/product',[ProductController::class,'AddProduct'])->name('add.product');
 Route::post('/store/product',[ProductController::class,'StoreProduct'])->name('store.product');
 Route::get('/edit/product/{id}',[ProductController::class,'EditProduct'])->name('edit.product');
 Route::post('/update/product/{id}',[ProductController::class,'UpdateProduct'])->name('update.product');
 Route::get('/delete/product/{id}',[ProductController::class,'DeleteProduct'])->name('delete.product');
 Route::get('/active/product/{id}',[ProductController::class,'ActiveProduct'])->name('product.active');
 Route::get('/deactive/product/{id}',[ProductController::class,'DeactiveProduct'])->name('product.deactive');
 Route::get('/view/product/{id}',[ProductController::class,'ViewProduct'])->name('product.view');
 
 Route::get('/countries',[CountryController::class,'Index'])->name('countries');
 Route::get('/add/country',[CountryController::class,'AddCountry'])->name('add.country');
 Route::post('/store/country',[CountryController::class,'StoreCountry'])->name('store.country');
 Route::get('/edit/country/{id}',[CountryController::class,'EditCountry'])->name('edit.country');
 Route::post('/update/country/{id}',[CountryController::class,'UpdateCountry'])->name('update.country');
 Route::get('/delete/country/{id}',[CountryController::class,'DeleteCountry'])->name('delete.country');
 Route::get('/active/country/{id}',[CountryController::class,'ActiveCountry'])->name('country.active');
 Route::get('/deactive/country/{id}',[CountryController::class,'DeactiveCountry'])->name('country.deactive');
 Route::get('/view/country/{id}',[CountryController::class,'ViewCountry'])->name('country.view');
 
 Route::get('/states',[StateController::class,'Index'])->name('state');
 Route::get('/add/state',[StateController::class,'AddState'])->name('add.state');
 Route::post('/store/state',[StateController::class,'StoreState'])->name('store.state');
 Route::get('/edit/state/{id}',[StateController::class,'EditState'])->name('edit.state');
 Route::post('/update/state/{id}',[StateController::class,'UpdateState'])->name('update.state');
 Route::get('/delete/state/{id}',[StateController::class,'DeleteState'])->name('delete.state');
 Route::get('/active/state/{id}',[StateController::class,'ActiveState'])->name('state.active');
 Route::get('/deactive/state/{id}',[StateController::class,'DeactiveState'])->name('state.deactive');
 Route::get('/view/state/{id}',[StateController::class,'ViewState'])->name('state.view');
 
 Route::get('/cities',[CityController::class,'Index'])->name('city');
 Route::get('/add/city',[CityController::class,'AddCity'])->name('add.city');
 Route::post('/store/city',[CityController::class,'StoreCity'])->name('store.city');
 Route::get('/edit/city/{id}',[CityController::class,'EditCity'])->name('edit.city');
 Route::post('/update/city/{id}',[CityController::class,'UpdateCity'])->name('update.city');
 Route::get('/delete/city/{id}',[CityController::class,'DeleteCity'])->name('delete.city');
 Route::get('/active/city/{id}',[CityController::class,'ActiveCity'])->name('city.active');
 Route::get('/deactive/city/{id}',[CityController::class,'DeactiveCity'])->name('city.deactive');
 Route::get('/view/city/{id}',[CityController::class,'ViewCity'])->name('city.view');
 

 Route::get('/all/newsuser',[newsController::class,'Newsuser'])->name('all.newsuser');
 Route::get('/add/news',[newsController::class,'AddNews'])->name('add.news');
 Route::post('/store/news',[newsController::class,'StoreNews'])->name('store.news');
 Route::get('/all/news',[newsController::class,'AllNews'])->name('all.newsletter');

 Route::get('/users',[frontuserController::class,'Index'])->name('all.users');
 Route::get('/view/user/{id}',[frontuserController::class,'ViewUser'])->name('user.view');
 
 Route::get('/slider',[SliderController::class,'Index'])->name('all.slider');
 Route::get('/add/slider',[SliderController::class,'AddSlider'])->name('add.slider');
 Route::post('/store/slider',[SliderController::class,'StoreSlider'])->name('store.slider');
 Route::get('/edit/slider/{id}',[SliderController::class,'EditSlider'])->name('edit.slider');
 Route::post('/update/slider/{id}',[SliderController::class,'UpdateSlider'])->name('update.slider');

 Route::get('/testimonial',[TestimonialController::class,'Index'])->name('all.testimonial');
 Route::get('/add/testimonial',[TestimonialController::class,'Addtestimonial'])->name('add.testimonial');
 Route::post('/store/testimonial',[TestimonialController::class,'Storetestimonial'])->name('store.testimonial');
 Route::get('/edit/testimonial/{id}',[TestimonialController::class,'Edittestimonial'])->name('edit.testimonial');
 Route::post('/update/testimonial/{id}',[TestimonialController::class,'Updatetestimonial'])->name('update.testimonial');

 Route::get('/tax',[TaxAmountController::class,'Index'])->name('all.tax');
 Route::get('/add/tax',[TaxAmountController::class,'Addtax'])->name('add.tax');
 Route::get('/get/state/{id}',[TaxAmountController::class,'GetState']);
 Route::post('/store/tax',[TaxAmountController::class,'Storetax'])->name('store.tax');
 Route::get('/edit/tax/{id}',[TaxAmountController::class,'Edittax'])->name('edit.tax');
 Route::post('/update/tax/{id}',[TaxAmountController::class,'Updatetax'])->name('update.tax');
 Route::get('/view/tax/{id}',[TaxAmountController::class,'Viewtax'])->name('tax.view');

 Route::get('/all/order',[OrderController::class,'Index'])->name('all.order');
 Route::get('/order/packed/{id}',[OrderController::class,'Packed'])->name('order.packed');
 Route::get('/order/shipped/{id}',[OrderController::class,'Shipped'])->name('order.shipped');
 Route::get('/order/delievered/{id}',[OrderController::class,'Delievered'])->name('order.delievered');

 Route::get('/add/about',[AboutController::class,'Index'])->name('add.about');
 Route::post('/store/about',[AboutController::class,'Store'])->name('store.about');

 Route::get('/all/contact',[ContactController::class,'Index'])->name('all.contact');
 Route::post('/give/reply/{id}',[ContactController::class,'Reply'])->name('give.reply');

 Route::get('/all/Coupon',[ContactController::class,'Coupons']);
 Route::get('/add/Coupon',[CouponController::class,'AddCoupon'])->name('add.coupon');
 Route::post('/store/coupon',[CouponController::class,'StoreCoupon'])->name('store.coupon');
