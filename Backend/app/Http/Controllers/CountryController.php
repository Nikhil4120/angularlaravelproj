<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Carbon;

class CountryController extends Controller
{
    //
    public function __construct(){

        $this->middleware('auth');
    }
    public function index(){
        $countries = DB::table('countries')->where('status','<>',-1)->orderBy('id','desc')->get();
        return view('backend.country.index',compact('countries'));
    }

    public function AddCountry(){
        return view('backend.country.add');
    }

    public function StoreCountry(Request $request){
        
        $data = array();
        $data['country_name'] = $request->country_name;
        $data['country_code'] = $request->country_code;
        $data['status'] = 1;
        $data['created_at'] = Carbon::now();
        DB::table('countries')->insert($data);
        return Redirect()->route('countries');
    }

    public function EditCountry($id){
        $countries = DB::table('countries')->where('id',$id)->first();
        return view('backend.country.edit',compact('countries'));
    }
    public function UpdateCountry(Request $request,$id){
        $data = array();
        $data['country_name'] = $request->country_name;
        $data['country_code'] = $request->country_code;
        
        $data['updated_at'] = Carbon::now();
        DB::table('countries')->where('id',$id)->update($data);
        return Redirect()->route('countries');
    }

    public function DeleteCountry($id){
        $data = array();
        $data['status'] = -1;
        $data['updated_at'] = Carbon::now();
        DB::table('countries')->where('id',$id)->update($data);
        return Redirect()->route('countries');
    }

    public function ActiveCountry($id){
        $data = array();
        $data['status'] = 1;
        $data['updated_at'] = Carbon::now();
        DB::table('countries')->where('id',$id)->update($data);
        return Redirect()->route('countries');
    }

    public function DeactiveCountry($id){
        $data = array();
        $data['status'] = 0;
        $data['updated_at'] = Carbon::now();
        DB::table('countries')->where('id',$id)->update($data);
        return Redirect()->route('countries');
    }

    public function ViewCountry($id){
        $country = DB::table('countries')->where('id',$id)->first();
        $states = DB::table('states')->where('country_id',$id)->get();
        return view('backend.country.view',compact('country','states'));
    }
    
}
