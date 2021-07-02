<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Image;
use Illuminate\Support\Carbon;

class ProductController extends Controller
{
    //

    public function __construct(){

        $this->middleware('auth');
    }

    public function Index(){
        $products = DB::table('products')->join('categories','categories.id','products.category_id')
                    ->join('subcategories','subcategories.id','products.subcategory_id')
                    ->join('colors','colors.id','products.color_id')
                    
                    ->select('products.*','categories.category_name','subcategories.subcategory_name','colors.color_name')
                    ->where('products.status','<>',-1)
                    ->orderBy('products.id','desc')
                    ->get();
        return view('backend.product.index',compact('products'));
    }
    public function AddProduct(){
        $categories = DB::table('categories')->where('status',1)->get();
        $colors = DB::table('colors')->where('status',1)->get();
        $size = DB::table('sizes')->where('status',1)->get();

        return view('backend.product.add',compact('categories','colors','size'));
    }
    public function GetSubcategory($id){
        $subcategory = DB::table('subcategories')->where('category_id',$id)->where('status',1)->get();
        return response()->json($subcategory);
    }

    public function StoreProduct(Request $request){
        $validatedata = $request->validate([

    		'product_name' => 'required',
    		'product_description' => 'required',
            'category_id' => 'required',
            'subcategory_id' => 'required',
            'color_id' => 'required',
            'size_id' => 'required',
            'sku_id' => 'required',
            'price' => 'required',
            'product_image' => 'required|mimes:jpg,jpeg,png,gif|max:2048'

    	]);
        $data = array();
        $data['product_name'] = $request->product_name;
        $data['product_description'] = $request->product_description;
        $data['category_id'] = $request->category_id;
        $data['subcategory_id'] = $request->subcategory_id;
        $data['color_id'] = $request->color_id;
        $data['size_id'] = implode(',',$request->size_id);
        $data['sku_id'] = $request->sku_id;
        $data['price'] = $request->price;
        $data['istrending'] = $request->istrending;
        $data['quantity'] = $request->quantity;
        $data['status'] = 1;
        $data['created_at'] = Carbon::now();
        $image = $request->product_image;
        if($image){

            $image_one = uniqid().'.'.$image->getClientOriginalExtension();
            Image::make($image)->save('image/products/'.$image_one);
            $data['product_image'] = 'image/products/'.$image_one;
            DB::table('products')->insert($data);
            $notification = array(
                'message' => 'Product Inserted Successfully',
                'alert-type' => 'success'
                );
            return redirect()->route('product')->with($notification);

        } 
        else{
            return redirect()->back();
        }
    }

    public function EditProduct($id){
        $categories = DB::table('categories')->where('status',1)->get();
        $colors = DB::table('colors')->where('status',1)->get();
        $size = DB::table('sizes')->where('status',1)->get();
        $products = DB::table('products')->where('status',1)->where('id',$id)->first();
        return view('backend.product.edit',compact('products','size','colors','categories'));
    }

    public function UpdateProduct(Request $request,$id){
        $data = array();
        $data['product_name'] = $request->product_name;
        $data['product_description'] = $request->product_description;
        $data['category_id'] = $request->category_id;
        $data['subcategory_id'] = $request->subcategory_id;
        $data['color_id'] = $request->color_id;
        $data['size_id'] = implode(',',$request->size_id);
        $data['sku_id'] = $request->sku_id;
        $data['price'] = $request->price;
        $data['istrending'] = $request->istrending;
        $data['quantity'] = $request->quantity;
        $data['updated_at'] = Carbon::now();
        $oldimage = $request->oldimage;
        $image = $request->product_image;
        if($image){

            $image_one = uniqid().'.'.$image->getClientOriginalExtension();
            Image::make($image)->save('image/products/'.$image_one);
            $data['product_image'] = 'image/products/'.$image_one;
            DB::table('products')->where('id',$id)->update($data);
            $notification = array(
                'message' => 'Product Updated Successfully',
                'alert-type' => 'success'
                );
            return redirect()->route('product')->with($notification);

        } 
        else{
            $data['product_image'] = $oldimage;
            DB::table('products')->where('id',$id)->update($data);
            $notification = array(
                'message' => 'Product Updated Successfully',
                'alert-type' => 'success'
                );
            return redirect()->route('product')->with($notification);

        }

    }
    public function DeleteProduct($id){
        $data = array();
        $data['updated_at'] = Carbon::now();
        $data['status'] = -1;
        DB::table('products')->where('id',$id)->update($data);
        $notification = array(
            'message' => 'Product Deleted Successfully',
            'alert-type' => 'success'
            );
        return Redirect()->route('product')->with($notification);
    }

    public function ActiveProduct($id){
        $data = array();
        $data['updated_at'] = Carbon::now();
        $data['status'] = 1;
        DB::table('products')->where('id',$id)->update($data);
        $notification = array(
            'message' => 'Product Activated Successfully',
            'alert-type' => 'success'
            );
        return Redirect()->route('product')->with($notification);
    }
    public function DeactiveProduct($id){
        $data = array();
        $data['updated_at'] = Carbon::now();
        $data['status'] = 0;
        DB::table('products')->where('id',$id)->update($data);
        $notification = array(
            'message' => 'Product Deactivated Successfully',
            'alert-type' => 'success'
            );
        
        return Redirect()->route('product')->with($notification);
    }
    public function ViewProduct($id){
        $products = DB::table('products')->join('categories','categories.id','products.category_id')
                    ->join('subcategories','subcategories.id','products.subcategory_id')
                    ->join('colors','colors.id','products.color_id')
                    ->join('sizes','sizes.id','products.size_id')
                    ->select('products.*','categories.category_name','subcategories.subcategory_name','colors.color_name','sizes.size_name')
                    ->where('products.id',$id)
                    ->first();
                    
        return view('backend.product.view',compact('products'));        
    }

}
