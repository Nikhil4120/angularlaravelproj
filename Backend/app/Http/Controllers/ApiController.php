<?php

namespace App\Http\Controllers;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use DB;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

use Mail;
use Illuminate\Support\Carbon;
use Stripe\Stripe;
use Stripe\Customer;
use Stripe\Charge;
use Stripe\Coupon;
use Stripe\Refund;
use Stripe\Subscription;



class ApiController extends Controller implements JWTSubject
{
    //
    public function getJWTIdentifier(){
        return $this->getKey();
    }
    public function getJWTCustomClaims(){
        return [];
    }

    
    public function register(Request $request)
    {
    	//Validate data
       
        
        
        $data =array();
        $data['firstname'] = $request->data['firstname'];
        $data['lastname'] = $request->data['lastname'];
        $data['username'] = $request->data['username'];
        $data['email'] = $request->data['email'];

        $data['password'] = Hash::make($request->data['password']);
        $data['mobileno'] = $request->data['mobileno'];
        $data['phoneno'] = $request->data['phoneno'];
        $data['intrest'] = implode(",",$request->intrest);
        $data['status'] = 1;
        $data['gender'] = $request->data['gender'];

        $emailexist = DB::table('frontusers')->where('email',$data['email'])->get();
        if(count($emailexist) != 0){
            return response()->json(['success' => false,'message' => "Email Already Exist",'data' => $data], 400);
        }

        

        DB::table('frontusers')->insert($data);
        $user['to'] = $data['email'];
            Mail::send('backend.mail.regmail',$data,function($messages) use($user){
                $messages->to($user['to']);
                $messages->subject("Registration");
            });
        //User created, return success response
        return response()->json([
            'success' => true,
            'message' => 'User created successfully',
            'data' => $data
        ], Response::HTTP_OK);
        
    }
    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');
        
        
        try {
            if (! auth()->guard('api')->attempt($credentials)) {
                return response()->json([
                	'success' => false,
                	'message' => 'Login credentials are invalid.',
                ], 400);
            }
        } catch (JWTException $e) {
    	return $credentials;
            return response()->json([
                	'success' => false,
                	'message' => 'Could not create token.',
                ], 500);
        }

        $user = DB::table('frontusers')->where('email',$request->email)->first();
        $token = auth()->guard('api')->claims([
            'user_id' => $user->id,
            'email' => $user->email
        ])->attempt($credentials);
 	
 		//Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'token' => $token,
        ],200);
    }

    public function Refresh(){
        $token = auth()->guard('api')->refresh();
        return response()->json($token);
    }

    public function getuser(Request $request){
        try{
            $token=$request->token;
            $user = auth()->guard('api')->authenticate($request->token);
            $shippinginformation = DB::table('shippinginformations')->where('user_id',$user->id)->first();
            $billinginformation = DB::table('billinginformations')->where('user_id',$user->id)->first();
            return response()->json(['user' => $user,'shippinginformation'=>$shippinginformation,'billinginformation'=>$billinginformation,'token'=>$token]);
        }
        catch(JWTException $e){
            $token = auth()->guard('api')->refresh();
            $user = auth()->guard('api')->authenticate($token);
            $shippinginformation = DB::table('shippinginformations')->where('user_id',$user->id)->first();
            $billinginformation = DB::table('billinginformations')->where('user_id',$user->id)->first();
            return response()->json(['user' => $user,'shippinginformation'=>$shippinginformation,'billinginformation'=>$billinginformation,'token'=>$token]);
        }
        
        
    }

    public function updateuser(Request $request){
        $data =array();
        $shippinginformation = array();
        $billinginformation = array();
        $id = $request->data['id'];
        $data['firstname'] = $request->data['firstname'];
        $data['lastname'] = $request->data['lastname'];
        $data['username'] = $request->data['username'];
        $data['email'] = $request->data['email'];

        
        $data['mobileno'] = $request->data['mobileno'];
        $data['phoneno'] = $request->data['phoneno'];
        $data['intrest'] = implode(",",$request->intrest);
        $data['status'] = 1;
        $data['gender'] = $request->data['gender'];

        $shippinginformation['street'] = $request->data['s_street'];
        $shippinginformation['city'] = $request->data['s_city'];
        $shippinginformation['state'] = $request->data['s_state'];
        $shippinginformation['country'] = $request->data['s_country'];
        $shippinginformation['user_id'] = $id;
        $shippinginformation['status'] = 1;

        $billinginformation['street'] = $request->data['s_street'];
        $billinginformation['city'] = $request->data['s_city'];
        $billinginformation['state'] = $request->data['s_state'];
        $billinginformation['country'] = $request->data['s_country'];
        $billinginformation['user_id'] = $id;
        $billinginformation['status'] = 1;

        DB::table('frontusers')->where('id',$id)->update($data);
        
        
        
            DB::table('shippinginformations')->insert($shippinginformation);
            DB::table('billinginformations')->insert($billinginformation);
        
        return response()->json([
            'success' => true,
            'message' => 'User profile updated successfully'
            
        ], Response::HTTP_OK);


    }
    public function GetCategory(){
        return DB::table('categories')->select('id','category_name','category_description')->where('status',1)->get();
    }
    public function GetSubCategory(){
        return DB::table('subcategories')->select('id','subcategory_name','subcategory_description','category_id')->where('status',1)->get();
    }

    public function GetProduct(){
        $product = DB::table('products')->join('categories','categories.id','products.category_id')
        ->join('subcategories','subcategories.id','products.subcategory_id')
        ->join('colors','colors.id','products.color_id')
        
        ->select('products.id','products.product_name','products.product_description','products.product_image','products.sku_id','products.price','categories.category_name','subcategories.subcategory_name','colors.color_name','products.istrending','products.size_id','products.quantity')
        ->where('products.status',1)
        ->where('products.quantity','>',0)
        ->orderBy('products.id','desc')
        ->get();
        return $product;
    }
    public function GetSize(){
        $size = DB::table('sizes')->select('id','size_name')->where('status',1)->get();
        return $size;
    }
    public function GetColor(){
        $color = DB::table('colors')->select('id','color_name','color_code')->where('status',1)->get();
        return $color;
    }
    public function GetCountry(){
        $countries = DB::table('countries')->select('id','country_name')->where('status',1)->get();
        return $countries;
    }
    public function GetState(){
        $states = DB::table('states')->select('id','state_name','country_id')->where('status',1)->get();
        return $states;
    }
    public function GetCity(){
        $cities = DB::table('cities')->select('id','city_name','state_id')->where('status',1)->get();
        return $cities;
    }

    public function AddSubscriber(Request $request){
        $validator = Validator::make($request->only('email'), [
            
            'email' => 'required|email|unique:newsletterusers',
            
        ]);
        if ($validator->fails()) {
            return response()->json(['success' => false,'message' => $validator->messages()], 200);
        }
        $data = Array();
        $data['email'] = $request->email;
        DB::table('newsletterusers')->insert($data);
        return response()->json([
            'success' => true,
            'message' => 'Thanks For Subscription'
            
        ], Response::HTTP_OK);        
        

    }
    public function EmailCheck(Request $request){
        $validator = Validator::make($request->only('email'), [
            
            'email' => 'unique:frontusers',
            
        ]);
        if ($validator->fails()) {
            return response()->json(['success' => false,'message' => $validator->messages()], 200);
        }        
        else{
            return response()->json(['success' => true,'message' => ""], 200);
        }
    }

    public function UserEmailCheck(Request $request){
        $email = $request->email;
        $id = $request->id;
        $useremail = DB::table('frontusers')->where('id',$id)->first()->email;
        $emailexist = DB::table('frontusers')->where('email',$email)->get();
        if(count($emailexist)!=0){
            if($emailexist[0]->email != $useremail){
                return response()->json(['success' => false,'message' => "Email Already Exist"], 200);
            }
            else{
                return response()->json(['success' => true,'message' => "hii"], 200);
            }
        }
        else{
            return response()->json(['success' => true,'message' => $email.''.count($emailexist)], 200);
        }
    }

    public function Contactus(Request $request){

        $data = array();
        $data['name'] = $request->name;
        $data['email'] = $request->email;
        $data['subject'] = $request->subject;
        $data['message'] = $request->message;
        $data['isreplied'] = 0;
        $data['reply'] = "";
        $data['status'] = 1;
        $data['created_at'] = Carbon::now();

        DB::table('contacts')->insert($data);
        $data['comments'] = $request->message;
        $user['to'] = "admin@gmail.com";
        Mail::send('backend.mail.contactmail',$data,function($messages) use($user){
            $messages->to($user['to']);
            $messages->subject("Contactus");
        });
        return response()->json(['success' => true,'message' => "Mail Sent Successfully"], 200);
    }


    public function AddWishList(Request $request){
        $data = array();
        $data['user_id'] = $request->user_id;
        $data['product_id'] = $request->product_id;
        $data['created_at'] = Carbon::now();
        DB::table('wishlists')->insert($data);
        return response()->json(['success' => true,'message' => "Item Added to wishlist"], 200);
    }

    public function WishList(){
        $wishlist = DB::table('wishlists')->get();
        return response()->json(['success' => true,'data' => $wishlist], 200);
    }
    public function RemoveWishList($id){
        
        $wishlist = DB::table('wishlists')->where('id',$id)->delete();
        
        return response()->json(['success' => true,'data' => "Items Removed"], 200);
    }

    public function Testimonial(){
        $testimonial = DB::table('testimonials')->orderBy('id','desc')->get();
        return response()->json(['success' => true,'data' => $testimonial], 200);
    }

    public function Slider(){
        $slider = DB::table('sliders')->orderBy('id','desc')->get();
        return response()->json(['success' => true,'data' => $slider], 200);
    }

    public function TaxAmount(){

        $taxamounts = DB::table('taxamounts')->get();
        return response()->json($taxamounts);

    }

    public function Order(Request $request){
        Stripe::setApiKey(env('STRIPE_SECRET'));
        $userid = $request->userid;
        $cartitems = $request->cartitems;
        $charge_id = $request->charge_id;
        $currency = $request->currency;
        $order_id = "OD_" . uniqid();
        $won = "";
        for ($i=0; $i < count($cartitems); $i++) { 
            # code...
            $data = array();
            $data['product_id'] = ($cartitems[$i])['id'];
            $data['user_id'] = $userid;
            $data['quantity'] = ($cartitems[$i])['product_quantity'];
            $data['total_amount'] = ($cartitems[$i])['price'] * ($cartitems[$i])['product_quantity'];
            $data['delievery_status'] = 1;
            $data['order_id'] = $order_id;
            $data['charge_id'] = $charge_id;
            $data['currency'] = $currency;
            $data['status'] = 1;
            $data['created_at'] = Carbon::now();
            $product = DB::table('products')->where('id',($cartitems[$i])['id'])->first();
            $product_quantity = $product->quantity - ($cartitems[$i])['product_quantity'];
            $productupdate = array();
            $productupdate['quantity'] = $product_quantity;
            DB::table('products')->where('id',($cartitems[$i])['id'])->update($productupdate);

            DB::table('orders')->insert($data);
        }

        DB::table('orders')->where('charge_id',$charge_id)->update([
            'discount'=>$request->discount,
            'coupon'=>$request->coupon
        ]);
        $random = rand(1,6);
        // $won = $random;
        if($random == 6){
            $coupon = Coupon::create([
                'percent_off'=>10,
                'duration'=>'once',
            ]);   
            DB::table('coupons')->insert([
                'coupon_id'=>$coupon->id,
                'user_id'=>$userid,
                'discount'=>$coupon->percent_off,
                'expired_at'=>Carbon::tomorrow(),
                'type'=>0,
                'isvalid'=>1,
                'created_at'=>Carbon::now()
            ]);
            $won = " And you won the coupon";
        }

        return response()->json(['success' => true,'data' => "your order hasbeen placed".$won], 200);
        
    }

    public function charge(Request $request)
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));
        if($request->currency == 'inr'){
            $countrycode = "IN";
        }
        else{
            $countrycode = "US";
        }
         
        
        $customer = Customer::create([
            'name'=>'test',
            'description'=>'my description',
            'email'=>'admin@gmail.com',
            'source'=>$request->token,
            'address'=>["city"=>"washington","country"=>$countrycode,"line1"=>"abcdefghj","line2"=>"gjfd","postal_code"=>123456,"state"=>"washington"]
        ]);
        // $subscription = Subscription::create([
        //     'customer'=>$customer->id,
        //     'coupon' =>"qxpvHKMR",
        // ]);

        $charge = Charge::create(array(
            'customer'=>$customer->id,
            'amount'   => ceil($request->amount *100),
            'currency' => $request->currency,
            'description'=>"sadcv adff",
            // "source" => $request->token
        ));
        return response()->json($charge);
    }
    
    public function about(){
        $about = DB::table('abouts')->first();
        return response()->json($about);
    }

    public function allorder($id){
        $order = DB::table('orders')->join('products','orders.product_id','products.id')->select('orders.*','products.product_name','products.product_description','products.price','products.product_image')->where('user_id',$id)->orderBy('orders.id','desc')->get();
        return response()->json($order);
    }

    public function Addreview(Request $request){

        $data = array();
        $data['review'] = $request->review;
        $data['description'] = $request->description;
        $data['user_id'] = $request->user_id;
        $data['product_id'] = $request->product_id;
        $data['created_at'] = Carbon::now();
        DB::table('reviews')->insert($data);
        return response()->json("Review Added Successfully");
    }

    public function cancelorder(Request $request){
        Stripe::setApiKey(env('STRIPE_SECRET'));

        $id = $request->id;
        
        $data = array();
        $data['delievery_status'] = 5;

        DB::table('orders')->where('id',$id)->update($data);
        $order = DB::table('orders')->where('id',$id)->first();
        $canceldata = array();
        $canceldata['order_id'] = $id;
        $canceldata['user_id'] = $order->user_id;
        $canceldata['reason'] = $request->reason;
        $canceldata['description'] = $request->description;
        $canceldata['created_at'] = Carbon::now();
        DB::table('cancelorders')->insert($canceldata);
        $productid = $order->product_id;
        $order_quantity = $order->quantity;
        $charge_id = $order->charge_id;
        $total_amount = $order->total_amount;

        $total_amount = $total_amount - ($total_amount*$order->discount/100);
        if($order->currency != 'inr'){
            $total_amount = $total_amount/70;
        }
        $refund = Refund::create([
            'charge' => $charge_id,
            'amount' => ceil($total_amount*100)
            
        ]);
        $product = DB::table('products')->where('id',$productid)->first();
        $product_quantity  = $product->quantity;
        $dataproduct = array();
        $dataproduct['quantity'] = $product_quantity + $order_quantity;
        DB::table('products')->where('id',$productid)->update($dataproduct);
        
        

        return response()->json("Order Cancelled Successfully");
    }

    public function returnorder(Request $request){

        Stripe::setApiKey(env('STRIPE_SECRET'));
        $id = $request->id;
        $data = array();
        $data['delievery_status'] = 6;
        DB::table('orders')->where('id',$id)->update($data);
        DB::table('orders')->where('id',$id)->update($data);
        $order = DB::table('orders')->where('id',$id)->first();
        $returndata = array();
        $returndata['order_id'] = $id;
        $returndata['user_id'] = $order->user_id;
        $returndata['reason'] = $request->reason;
        $returndata['description'] = $request->description;
        $returndata['created_at'] = Carbon::now();
        DB::table('returnorders')->insert($returndata);
        $productid = $order->product_id;
        $order_quantity = $order->quantity;
        $charge_id = $order->charge_id;
        $total_amount = $order->total_amount;
        $total_amount = $total_amount - ($total_amount*$order->discount/100);
        $refund = Refund::create([
            'charge' => $charge_id,
            'amount' => $total_amount*100
            
        ]);
        $product = DB::table('products')->where('id',$productid)->first();
        $product_quantity  = $product->quantity;
        $dataproduct = array();
        $dataproduct['quantity'] = $product_quantity + $order_quantity;
        DB::table('products')->where('id',$productid)->update($dataproduct);
        return response()->json("Order returned Successfully");
    }

    public function AllReview($id){
        $reviews = DB::table('reviews')
        ->join('products','products.id','reviews.product_id')
        ->join('frontusers','frontusers.id','reviews.user_id')
        ->select('reviews.id','reviews.review','reviews.description','reviews.created_at','products.product_name','frontusers.username')
        ->where('reviews.product_id',$id)
        ->orderBy('reviews.id','desc')
        ->get();
        return response()->json($reviews);
    }

    public function passwordchange(Request $request){

        $userid = $request->userid;
        $user = DB::table('frontusers')->where('id',$userid)->first();
        $hashpassword = $user->password;
        if(Hash::check($request->current_password,$hashpassword)){

            DB::table('frontusers')->where('id',$userid)->update([
                'password'=>Hash::make($request->new_password)
            ]);
    		
            return response()->json(['success' => true,'data' => "Password has been changed"], 200);
    		
            

    		

    	}
    	else{
    		return response()->json(['success' => false,'data' => "Old passowrd is incorrect"], 200);
    	}

    }

    public function PasswordForget(Request $request){

        $email = $request->email;

        $emailexist = DB::table('frontusers')->where('email',$email)->get();

        if(count($emailexist) != 0){
            $verifyuser = $emailexist[0];
            $chars ="abc1defghij2k3lmno4pq5rs6tu7vw8xy9z@0ABCDEFGHIJK#LMNOPQRSTUVWXYZ#";
            $password = substr(str_shuffle($chars),0,8);
            $data = array();
            $data['username'] = $verifyuser->username;
            $data['password'] = $password;
            $user['to'] = $email;
            Mail::send('backend.mail.otpmail',$data,function($messages) use($user){
                $messages->to($user['to']);
                $messages->subject("Forget Password Otp mail");
            });            
            

            return response()->json(['success' => true,'data' => $password], 200);
        }
        else{
            return response()->json(['success' => false,'data' => "This Email is not Exist"], 200);
        }

    }

    public function PasswordReset(Request $request){

        $password = Hash::make($request->password);
        $email = $request->email;

        DB::table('frontusers')->where('email',$email)->update([
            'password'=>$password
        ]);

        return response()->json(['success' => true,'data' => "Password hasbeen changed"], 200);                        

    }

    public function reorder($id){

        $product = DB::table('products')->join('categories','categories.id','products.category_id')
        ->join('subcategories','subcategories.id','products.subcategory_id')
        ->join('colors','colors.id','products.color_id')
        
        ->select('products.id','products.product_name','products.product_description','products.product_image','products.sku_id','products.price','categories.category_name','subcategories.subcategory_name','colors.color_name','products.istrending','products.size_id','products.quantity')
        ->where('products.status',1)
        ->where('products.quantity','>',0)
        ->where('products.id',$id)
        ->get();
        return $product;        

    }

    public function PasswordSkip(Request $request){
        $credentials = $request->only('email');
        // $credentials['password'] = "123456";
        $user = DB::table('frontusers')->where('email',$request->email)->first();
        // $credentials['password'] = $user->password;
        $token = auth()->guard('api')->claims([
            'user_id' => $user->id,
            'email' => $user->email
        ])->attempt($credentials);
 	
 		//Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'token' => $token,
        ],200);
        return $credentials;

    }

    public function Availiabity(Request $request){
        $product_avail = true;
        $unavail_product = 0;
        $unavail_quantity = 0;
        $cartitems = $request->cartitems;
        for ($i=0; $i < count($cartitems); $i++) { 
            # code...
            
            $product_id = ($cartitems[$i])['id'];
            
            $quantity = ($cartitems[$i])['product_quantity'];
            $product = DB::table('products')->where('id',($cartitems[$i])['id'])->first();
            $product_quantity = $product->quantity - ($cartitems[$i])['product_quantity'];
            
            if($product_quantity < 0){
                $product_avail = false;
                $unavail_product = $product_id;
                $unavail_quantity = $product->quantity;
                break;
            }

            
        }

        if($product_avail){
            return response()->json(['success' => true,'data' => "Availiable Stock"], 200);
        }
        else{
            return response()->json(['success' => false,'data' => $unavail_product,'quantity'=>$unavail_quantity], 200);
        }


        
    }

    public function Couponapply(Request $request){
        Stripe::setApiKey(env('STRIPE_SECRET'));
        $id = $request->userid;
        $coupon = $request->coupon;
        // $availcoupon = DB::table('coupons')->where('user_id',$id)->where('coupon_id',$coupon)->where('isvalid',1)->where('expired_at','>=',Carbon::now())->get();
        // $countcoupon = count($availcoupon);

        // if($countcoupon != 0){
        //     $coupen = Coupon::retrieve($coupon,[]);
        //     DB::table('coupons')->where('user_id',$id)->where('coupon_id',$coupon)->update([
        //         'isvalid'=>0
        //     ]);
        //     return response()->json(['success' => true,'data' => $availcoupon[0]->discount], 200);
        // }
        // else{
        //     return response()->json(['success' => false,'data' => "Coupon code is not valid"], 200);
        // }

        $availcoupon = DB::table('coupons')->where('coupon_id',$coupon)->where('expired_at','>=',Carbon::now())->get();
        $countcoupon = count($availcoupon);
        
        if($countcoupon != 0){

            $coupontype = $availcoupon[0]->type;
            
            if($coupontype == 0){
                
                $couponuser = DB::table('coupons')->where('user_id',$id)->where('coupon_id',$coupon)->get();

                if(count($couponuser) != 0){

                    $ordercoupon = DB::table('orders')->where('user_id',$id)->where('coupon',$coupon)->get();
                    if(count($ordercoupon) == 0){
                        return response()->json(['success' => true,'data' => $availcoupon[0]->discount], 200);
                    }
                    else{
                        return response()->json(['success' => false,'data' => "Coupon code is not valid"], 200);    
                    }

                }
                else{
                    return response()->json(['success' => false,'data' => "Coupon code is not valid"], 200);
                }

            }
            else{
                $ordercoupon = DB::table('orders')->where('user_id',$id)->where('coupon',$coupon)->get();
                    if(count($ordercoupon) == 0){
                        return response()->json(['success' => true,'data' => $availcoupon[0]->discount], 200);
                    }
                    else{
                        return response()->json(['success' => false,'data' => "Coupon code is not valid"], 200);    
                    }
            }

        }
        else{
            return response()->json(['success' => false,'data' => "Coupon code is not valid"], 200);
        }


    }

    public function AllCoupons($id){

        $coupons = DB::table('coupons')->where('expired_at','>=',Carbon::now())->select('id','coupon_id','discount','isvalid','expired_at','type')->get();

        $temp = [];
        for ($i=0; $i <count($coupons);$i++) { 
            # code...
            $coupon_id = $coupons[$i]->coupon_id;
            $coupon_type = $coupons[$i]->type;

            $order = DB::table('orders')->where('user_id',$id)->where('coupon',$coupon_id)->get();

            if(count($order) == 0){
                if($coupon_type == 0){

                    $localcoupon = DB::table('coupons')->where('coupon_id',$coupon_id)->where('user_id',$id)->get();

                    if(count($localcoupon) != 0){
                        array_push($temp,$coupons[$i]);    
                    }

                }
                else{
                    array_push($temp,$coupons[$i]);
                }
                
            }

        }
        
        return $temp;
    }

    public function ExpireCoupons($id){
        $coupons = DB::table('coupons')->select('id','coupon_id','discount','isvalid','expired_at','type')->get();

        $temp = [];
        for ($i=0; $i <count($coupons);$i++) { 
            # code...
            $coupon_id = $coupons[$i]->coupon_id;
            $coupon_type = $coupons[$i]->type;

            $order = DB::table('orders')->where('user_id',$id)->where('coupon',$coupon_id)->get();

            if(count($order) != 0){
                if($coupon_type == 0){

                    $localcoupon = DB::table('coupons')->where('coupon_id',$coupon_id)->where('user_id',$id)->get();

                    if(count($localcoupon) != 0){
                        array_push($temp,$coupons[$i]);    
                    }

                }
                else{
                    array_push($temp,$coupons[$i]);
                }
                
            }
            else{
                if($coupon_type == 0){
                    $expire_coupon = DB::table('coupons')->where('coupon_id',$coupon_id)->where('expired_at','<',Carbon::now())->where('user_id',$id)->get();
                }
                else{
                    $expire_coupon = DB::table('coupons')->where('coupon_id',$coupon_id)->where('expired_at','<',Carbon::now())->get();
                }
                
                if(count($expire_coupon) != 0){
                    array_push($temp,$coupons[$i]);
                }


            }

        }
        
        return $temp;
    }

    public function Userwishlists($id){

        $wishlists = DB::table('wishlists')->join('products','products.id','wishlists.product_id')->select('wishlists.*','products.product_name','products.product_image','products.quantity','products.status','products.price')->where('wishlists.user_id',$id)->orderBy('wishlists.id','desc')->get();
        return $wishlists;
    }

}
