<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class OrderController extends Controller
{
   
    public function Index(){
        $orders = DB::table('orders')->join('frontusers','frontusers.id','orders.user_id')->join('products','products.id','orders.product_id')->select('orders.*','frontusers.username','products.product_name')->get();
        return view('backend.orders.index',compact('orders'));

    }
}
