<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class OrderController extends Controller
{
    public function __construct(){

        $this->middleware('auth');
    }
    public function Index(){
        $orders = DB::table('orders')->join('frontusers','frontusers.id','orders.user_id')->join('products','products.id','orders.product_id')->select('orders.*','frontusers.username','products.product_name')->get();
        return view('backend.orders.index',compact('orders'));

    }

    public function Packed($id){
        $data = array();
        $data['delievery_status'] = 2;
        DB::table('orders')->where('id',$id)->update($data);
        return redirect()->route('all.order');
    }

    public function Shipped($id){
        $data = array();
        $data['delievery_status'] = 3;
        DB::table('orders')->where('id',$id)->update($data);
        return redirect()->route('all.order');
    }

    public function Delievered($id){
        $data = array();
        $data['delievery_status'] = 4;
        DB::table('orders')->where('id',$id)->update($data);
        return redirect()->route('all.order');
    }

}
