<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Carbon;

class ColorController extends Controller
{
    public function __construct(){

        $this->middleware('auth');
    }
    public function Index(){
        $colors = DB::table('colors')->where('status','<>',-1)->get();
        return view('backend.color.index',compact('colors'));
    }
    public function AddColor(){
        return view('backend.color.add');
    }
    public function StoreColor(Request $request){

        $data = array();
        $data['color_name'] = $request->color_name;
        $data['color_code'] = $request->color_code;
        $data['status'] = 1;
        $data['created_at'] = Carbon::now();

        DB::table('colors')->insert($data);
        return Redirect()->route('colors');

    }

    public function EditColor($id){
        $colors = DB::table('colors')->where('id',$id)->first();
        return view('backend.color.edit',compact('colors'));
    }

    public function UpdateColor(Request $request,$id){
        $data = array();
        $data['color_name'] = $request->color_name;
        $data['color_code'] = $request->color_code;
        $data['updated_at'] = Carbon::now();
        DB::table('colors')->where('id',$id)->update($data);
        return Redirect()->route('colors');
    }
    public function DeleteColor($id){
        $data = array();
        $data['updated_at'] = Carbon::now();
        $data['status'] = -1;
        DB::table('colors')->where('id',$id)->update($data);
        
        return Redirect()->route('colors');
    }

    public function ActiveColor($id){
        $data = array();
        $data['updated_at'] = Carbon::now();
        $data['status'] = 1;
        DB::table('colors')->where('id',$id)->update($data);
        
        return Redirect()->route('colors');
    }
    public function DeactiveColor($id){
        $data = array();
        $data['updated_at'] = Carbon::now();
        $data['status'] = 0;
        DB::table('colors')->where('id',$id)->update($data);
        
        return Redirect()->route('colors');
    }

    public function ViewColor($id){
        $color = DB::table('colors')->where('id',$id)->first();
        return view('backend.color.view',compact('color'));
    }


}