<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Carbon;

class CityController extends Controller
{
    //
    public function __construct(){

        $this->middleware('auth');
    }
    public function index(){
        $cities = DB::table('cities')->join('states','states.id','cities.state_id')->select('cities.*','states.state_name')->where('cities.status','<>',-1)->orderBy('cities.id','desc')->get();
        return view('backend.city.index',compact('cities'));
    }

    public function AddCity(){
        $states = DB::table('states')->where('status',1)->get();
        return view('backend.city.add',compact('states'));
    }

    public function StoreCity(Request $request){
        
        $data = array();
        $data['city_name'] = $request->city_name;
        $data['state_id'] = $request->state_id;
        $data['status'] = 1;
        $data['created_at'] = Carbon::now();
        DB::table('cities')->insert($data);
        return Redirect()->route('city');
    }

    public function EditCity($id){
        $states = DB::table('states')->where('status',1)->get();
        $city = DB::table('cities')->where('id',$id)->first();
        return view('backend.city.edit',compact('city','states'));
    }
    public function UpdateCity(Request $request,$id){
        $data = array();
        $data['city_name'] = $request->city_name;
        $data['state_id'] = $request->state_id;
        
        $data['updated_at'] = Carbon::now();
        DB::table('cities')->where('id',$id)->update($data);
        return Redirect()->route('city');
    }

    public function DeleteCity($id){
        $data = array();
        $data['status'] = -1;
        $data['updated_at'] = Carbon::now();
        DB::table('cities')->where('id',$id)->update($data);
        return Redirect()->route('city');
    }

    public function ActiveCity($id){
        $data = array();
        $data['status'] = 1;
        $data['updated_at'] = Carbon::now();
        DB::table('cities')->where('id',$id)->update($data);
        return Redirect()->route('city');
    }

    public function DeactiveCity($id){
        $data = array();
        $data['status'] = 0;
        $data['updated_at'] = Carbon::now();
        DB::table('cities')->where('id',$id)->update($data);
        return Redirect()->route('city');
    }

    public function ViewCity($id){
        $city = DB::table('cities')->join('states','states.id','cities.state_id')->join('countries','states.country_id','countries.id')->select('cities.*','states.state_name','countries.country_name')->where('cities.id',$id)->first();
        return view('backend.city.view',compact('city'));

    }
}
