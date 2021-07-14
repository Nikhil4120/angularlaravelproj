<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\controllers\ApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('register', [ApiController::class, 'register']);
Route::post('login', [ApiController::class, 'authenticate']);
Route::get('getuser',[ApiController::class,'getuser']);
Route::put('updateuser',[ApiController::class,'updateuser']);

Route::get('/category',[ApiController::class,'GetCategory'])->name('api.category');
Route::get('/subcategory',[ApiController::class,'GetSubCategory'])->name('api.subcategory');
Route::get('/product',[ApiController::class,'GetProduct'])->name('api.product');
Route::get('/size',[ApiController::class,'GetSize'])->name('api.size');
Route::get('/color',[ApiController::class,'GetColor'])->name('api.color');

Route::get('/country',[ApiController::class,'GetCountry']);
Route::get('/state',[ApiController::class,'GetState']);
Route::get('/city',[ApiController::class,'GetCity']);

Route::post('/newsletter',[ApiController::class,'AddSubscriber']);
Route::post('/emailcheck',[ApiController::class,'EmailCheck']);
Route::post('/useremailcheck',[ApiController::class,'UserEmailCheck']);

Route::post('/contact',[ApiController::class,'Contactus']);
Route::post('/addwishlist',[ApiController::class,'AddWishList']);
Route::get('/wishlist',[ApiController::class,'WishList']);
Route::post('/removelist',[ApiController::class,'RemoveWishList']);

Route::get('/testimonial',[ApiController::class,'Testimonial']);
Route::get('/slider',[ApiController::class,'Slider']);

Route::get('/taxamount',[ApiController::class,'Taxamount']);
Route::post('/orders',[ApiController::class,'Order']);
Route::post('/checkout',[ApiController::class,'Charge']);


Route::get('/about',[ApiController::class,'about']);
Route::get('/allorders/{id}',[ApiController::class,'allorder']);
Route::get('/CancelOrder/{id}',[ApiController::class,'cancelorder']);
Route::get('/ReturnOrder/{id}',[ApiController::class,'returnorder']);

Route::post('/addreview',[ApiController::class,'AddReview']);
Route::get('/allreview/{id}',[ApiController::class,'AllReview']);
Route::get('/refresh',[ApiController::class,'Refresh']);