<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Stripe\Stripe;
use Illuminate\Support\Carbon;
use Stripe\Coupon;

class CouponController extends Controller
{
    //

    public function AddCoupon(){
        return view('backend.coupon.add');
    }
    
    public function StoreCoupon(Request $request){
        Stripe::setApiKey(env('STRIPE_SECRET'));
        $coupon = Coupon::create([
            'percent_off'=>$request->discount,
            'duration'=>'once',
        ]);
        DB::table('coupons')->insert([
            'coupon_id'=>$coupon->id,
            'user_id'=>0,
            'type'=>1,
            'discount'=>$request->discount,
            'isvalid'=>1,
            'expired_at'=>$request->expired_at,
            'created_at'=>Carbon::now()
        ]);
        return redirect()->route('dashboard');
        
    }

}


/*
    first check coupon code is exist and not expired,
        1)local or global
            i)in local user can only be used
            ii)in global every one use not used before same user




*/