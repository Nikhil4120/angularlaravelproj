<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class AboutController extends Controller
{
    //
    public function __construct(){

        $this->middleware('auth');
    }
    
    public function Index(){
        
        $about = DB::table('abouts')->first();
        return view('backend.aboutus.add',compact('about'));
    }

    public function Store(Request $request){

        $data = array();
        $data['content'] = $request->content;

        DB::table('abouts')->update($data);
        $notification = array(
            'message' => 'Aboutus Updated Successfully',
            'alert-type' => 'success'
            );

        return redirect()->back()->with($notification);

    }

    
}
