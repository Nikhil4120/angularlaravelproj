<?php

namespace App\Http\Controllers;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use DB;

class ApiController extends Controller
{
    //

    public function register(Request $request)
    {
    	//Validate data
        
        
        $data =array();
        $data['firstname'] = $request->firstname;
        $data['lastname'] = $request->lastname;
        $data['username'] = $request->username;
        $data['email'] = $request->email;

        $data['password'] = $request->password;
        $data['mobileno'] = $request->mobileno;
        $data['phoneno'] = $request->phoneno;
        $data['intrest'] = "jeans";
        $data['status'] = 1;
        $data['gender'] = $request->gender;
        DB::table('frontusers')->insert($data);

        //User created, return success response
        return response()->json([
            'success' => true,
            'message' => 'User created successfully',
            'data' => $data
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
        ->join('sizes','sizes.id','products.size_id')
        ->select('products.id','products.product_name','products.product_description','products.product_image','products.sku_id','products.price','categories.category_name','subcategories.subcategory_name','colors.color_name','sizes.size_name')
        ->where('products.status',1)
        ->orderBy('products.id','desc')
        ->get();
        return $product;
    }
}
