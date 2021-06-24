<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Carbon;

class SubcategoryController extends Controller
{
    //

    public function __construct(){

        $this->middleware('auth');
    }
    public function Index(){

        $subcategories = DB::table('subcategories')->join('categories','categories.id','subcategories.category_id')->select('subcategories.*','categories.category_name')->where('subcategories.status','<>',-1)->where('categories.status',1)->orderBy('subcategories.id','desc')->get();
        return view('backend.subcategory.index',compact('subcategories'));

    }
    public function AddSubCategory(){
        $categories = DB::table('categories')->where('status',1)->orderBy('id','desc')->get();
        return view('backend.subcategory.add',compact('categories'));
    }
    public function StoreSubCategory(Request $request){
        $data = array();
        $data['subcategory_name'] = $request->subcategory_name;
        $data['subcategory_description'] = $request->subcategory_description;
        $data['category_id'] = $request->category_id;
        $data['status'] = 1;
        $data['created_at'] = Carbon::now();
        DB::table('subcategories')->insert($data);
        return Redirect()->route('subcategories');
    }

    public function EditSubCategory($id){
        $categories = DB::table('categories')->where('status',1)->orderBy('id','desc')->get();
        $subcategories = DB::table('subcategories')->where('id',$id)->first();
        return view('backend.subcategory.edit',compact('categories','subcategories'));
    }

    public function UpdateSubCategory(Request $request,$id){
        $data = array();        
        $data['subcategory_name'] = $request->subcategory_name;
        $data['subcategory_description'] = $request->subcategory_description;
        $data['category_id'] = $request->category_id;
        $data['updated_at'] = Carbon::now();
        DB::table('subcategories')->where('id',$id)->update($data);
        return Redirect()->route('subcategories');

    }
    public function DeleteSubCategory($id){
        $data = array();
        $data['status'] = -1;
        $data['updated_at'] = Carbon::now();
        DB::table('subcategories')->where('id',$id)->update($data);
        return Redirect()->route('subcategories');
    }

    public function ActiveSubCategory($id){
        $data = array();
        $data['status'] = 1;
        $data['updated_at'] = Carbon::now();
        DB::table('subcategories')->where('id',$id)->update($data);
        return Redirect()->route('subcategories');
    }
    public function DeactiveSubCategory($id){
        $data = array();
        $data['status'] = 0;
        $data['updated_at'] = Carbon::now();
        DB::table('subcategories')->where('id',$id)->update($data);
        return Redirect()->route('subcategories');
    }

    public function ViewSubCategory($id){
        $subcategories = DB::table('subcategories')->join('categories','categories.id','subcategories.category_id')->select('subcategories.*','categories.category_name')->where('subcategories.id',$id)->first();        
        return view('backend.subcategory.view',compact('subcategories'));
    }
}
