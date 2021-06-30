<?php

namespace App\Http\Controllers;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use DB;
use Tymon\JWTAuth\Contracts\JWTSubject;

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

        $data['password'] = $request->data['password'];
        $data['mobileno'] = $request->data['mobileno'];
        $data['phoneno'] = $request->data['phoneno'];
        $data['intrest'] = implode(",",$request->intrest);
        $data['status'] = 1;
        $data['gender'] = $request->data['gender'];
        DB::table('frontusers')->insert($data);

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
        
        //valid credential
        // $validator = Validator::make($credentials, [
        //     'email' => 'required|email',
        //     'password' => 'required|string|min:6|max:50'
        // ]);

        // //Send failed response if request is not valid
        // if ($validator->fails()) {
        //     return response()->json(['error' => $validator->messages()], 200);
        // }

        //Request is validated
        //Crean token
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

    public function getuser(Request $request){
        $user = auth()->guard('api')->authenticate($request->token);
        return response()->json(['user' => $user]);
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
        ->join('sizes','sizes.id','products.size_id')
        ->select('products.id','products.product_name','products.product_description','products.product_image','products.sku_id','products.price','categories.category_name','subcategories.subcategory_name','colors.color_name','sizes.size_name')
        ->where('products.status',1)
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
}
