<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Carbon;

class StateController extends Controller
{
    //
    public function __construct(){

        $this->middleware('auth');
    }
    public function index(){
        $states = DB::table('states')->join('countries','countries.id','states.country_id')->select('states.*','countries.country_name')->where('states.status','<>',-1)->orderBy('states.id','desc')->get();
        return view('backend.state.index',compact('states'));
    }

    public function AddState(){
        $countries = DB::table('countries')->where('status',1)->get();
        return view('backend.state.add',compact('countries'));
    }

    public function StoreState(Request $request){
        
        $data = array();
        $data['state_name'] = $request->state_name;
        $data['country_id'] = $request->country_id;
        $data['status'] = 1;
        $data['created_at'] = Carbon::now();
        DB::table('states')->insert($data);
        return Redirect()->route('state');
    }

    public function EditState($id){
        $countries = DB::table('countries')->where('status',1)->get();
        $states = DB::table('states')->where('id',$id)->first();
        return view('backend.state.edit',compact('countries','states'));
    }
    public function UpdateState(Request $request,$id){
        $data = array();
        $data['state_name'] = $request->state_name;
        $data['country_id'] = $request->country_id;
        
        $data['updated_at'] = Carbon::now();
        DB::table('states')->where('id',$id)->update($data);
        return Redirect()->route('state');
    }

    public function DeleteState($id){
        $data = array();
        $data['status'] = -1;
        $data['updated_at'] = Carbon::now();
        DB::table('states')->where('id',$id)->update($data);
        return Redirect()->route('state');
    }

    public function ActiveState($id){
        $data = array();
        $data['status'] = 1;
        $data['updated_at'] = Carbon::now();
        DB::table('states')->where('id',$id)->update($data);
        return Redirect()->route('state');
    }

    public function DeactiveState($id){
        $data = array();
        $data['status'] = 0;
        $data['updated_at'] = Carbon::now();
        DB::table('states')->where('id',$id)->update($data);
        return Redirect()->route('state');
    }

    public function ViewState($id){

        $state = DB::table('states')->join('countries','countries.id','states.country_id')->select('states.*','countries.country_name')->where('states.id',$id)->first();
        $cities = DB::table('cities')->where('state_id',$id)->get();
        return view('backend.state.view',compact('state','cities'));
    }

}
