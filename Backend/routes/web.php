<?php

use Illuminate\Support\Facades\Route;
use App\Http\controllers\CategoryController;
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
    return view('welcome');
});

Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    return view('admin.index');
})->name('dashboard');

Route::get('/categories',[CategoryController::class,'Index'])->name('categories');
Route::get('/add/category',[CategoryController::class,'AddCategory'])->name('add.category');
Route::post('/store/category',[CategoryController::class,'StoreCategory'])->name('store.category');
Route::get('/edit/category/{id}',[CategoryController::class,'EditCategory'])->name('edit.category');
Route::post('/update/category/{id}',[CategoryController::class,'UpdateCategory'])->name('update.category');
Route::get('/delete/category/{id}',[CategoryController::class,'DeleteCategory'])->name('delete.category');
Route::get('/active/category/{id}',[CategoryController::class,'ActiveCategory'])->name('category.active');
 Route::get('/deactive/category/{id}',[CategoryController::class,'DeactiveCategory'])->name('category.deactive');
 Route::get('/view/category/{id}',[CategoryController::class,'ViewCategory'])->name('category.view');