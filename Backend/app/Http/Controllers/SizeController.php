<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Carbon;

class SizeController extends Controller
{
    //
    public function __construct(){

        $this->middleware('auth');
    }
    public function Index(){
        $size = DB::table('sizes')->where('status','<>',-1)->get();
        return view('backend.size.index',compact('size'));
    }
    public function AddSize(){
        return view('backend.size.add');
    }
    public function StoreSize(Request $request){

        $data = array();
        $data['size_name'] = $request->size_name;
        
        $data['status'] = 1;
        $data['created_at'] = Carbon::now();

        DB::table('sizes')->insert($data);
        return Redirect()->route('size');

    }
    public function EditSize($id){
        $size = DB::table('sizes')->where('id',$id)->first();
        return view('backend.size.edit',compact('size'));
    }
    public function UpdateSize(Request $request,$id){
        $data = array();
        $data['size_name'] = $request->size_name;
        
        $data['updated_at'] = Carbon::now();
        DB::table('sizes')->where('id',$id)->update($data);
        return Redirect()->route('size');
    }
    public function DeleteSize($id){
        $data = array();
        $data['updated_at'] = Carbon::now();
        $data['status'] = -1;
        DB::table('sizes')->where('id',$id)->update($data);
        
        return Redirect()->route('size');
    }

    public function ActiveSize($id){
        $data = array();
        $data['updated_at'] = Carbon::now();
        $data['status'] = 1;
        DB::table('sizes')->where('id',$id)->update($data);
        
        return Redirect()->route('size');
    }
    public function DeactiveSize($id){
        $data = array();
        $data['updated_at'] = Carbon::now();
        $data['status'] = 0;
        DB::table('sizes')->where('id',$id)->update($data);
        
        return Redirect()->route('sizes');
    }

}
