<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Carbon;

class TaxAmountController extends Controller
{
    //

    public function Index(){
        $taxamounts = DB::table('taxamounts')->join('countries','taxamounts.country_id','countries.id')->join('states','taxamounts.state_id','states.id')
        ->select('taxamounts.*','countries.country_name','states.state_name')->get();
        return view('backend.taxamount.index',compact('taxamounts'));
    }

    public function Addtax(){
        $countries = DB::table('countries')->get();
        return view('backend.taxamount.add',compact('countries'));
    }
    public function GetState($id){
        $states = DB::table('states')->where('country_id',$id)->get();
        return response()->json($states);
    }

    public function Storetax(Request $request){
        $data = array();
        $data['country_id'] = $request->country_id;
        $data['state_id'] = $request->state_id;
        $data['tax_amount'] = $request->tax_amount;
        $data['status'] = 1;
        $data['created_at'] = Carbon::now();
        DB::table('taxamounts')->insert($data);
        $notification = array(
            'message' => 'TaxAmount Inserted Successfully',
            'alert-type' => 'success'
            );
        return redirect()->route('dashboard')->with($notification);
    }
}
