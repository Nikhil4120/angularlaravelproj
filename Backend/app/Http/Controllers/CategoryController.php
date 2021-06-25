<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Carbon;
class CategoryController extends Controller
{
    //
    public function __construct(){

        $this->middleware('auth');
    }
    public function index(){
        $categories = DB::table('categories')->where('status','<>',-1)->orderBy('id','desc')->get();
        return view('backend.category.index',compact('categories'));
    }

    public function AddCategory(){
        return view('backend.category.add');
    }

    public function StoreCategory(Request $request){
        $validatedata = $request->validate([

    		'category_name' => 'required|unique:categories|max:255',
    		'category_description' => 'required|unique:categories|max:255',

    	]);
        $data = array();
        $data['category_name'] = $request->category_name;
        $data['category_description'] = $request->category_description;
        $data['created_at'] = Carbon::now();
        DB::table('categories')->insert($data);
        return Redirect()->route('categories');
    }

    public function EditCategory($id){
        $categories = DB::table('categories')->where('id',$id)->first();
        return view('backend.category.edit',compact('categories'));
    }

    public function UpdateCategory(Request $request,$id){
        $data = array();
        $data['category_name'] = $request->category_name;
        $data['category_description'] = $request->category_description;
        $data['updated_at'] = Carbon::now();
        DB::table('categories')->where('id',$id)->update($data);
        
        return Redirect()->route('categories');

    }

    public function DeleteCategory($id){
        $data = array();
        $data['updated_at'] = Carbon::now();
        $data['status'] = -1;
        DB::table('categories')->where('id',$id)->update($data);
        
        return Redirect()->route('categories');
    }

    public function ActiveCategory($id){
        $data = array();
        $data['updated_at'] = Carbon::now();
        $data['status'] = 1;
        DB::table('categories')->where('id',$id)->update($data);
        
        return Redirect()->route('categories');
    }
    public function DeactiveCategory($id){
        $data = array();
        $data['updated_at'] = Carbon::now();
        $data['status'] = 0;
        DB::table('categories')->where('id',$id)->update($data);
        
        return Redirect()->route('categories');
    }

    public function ViewCategory($id){
        $categories = DB::table('categories')->where('id',$id)->first();
        $subcategories = DB::table('subcategories')->where('category_id',$id)->get();
        return view('backend.category.view',compact('categories','subcategories'));        
    }
}
