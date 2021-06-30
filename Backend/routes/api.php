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