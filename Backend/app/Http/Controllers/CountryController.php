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
}
