<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class AboutController extends Controller
{
    //

    public function Index(){
        
        $about = DB::table('abouts')->first();
        return view('backend.aboutus.add',compact('about'));
    }

    public function Store(Request $request){

        $data = array();
        $data['title'] = $request->title;
        $data['developed_by'] = $request->developed_by;
        $data['description'] = $request->description;
        $data['email'] = $request->email;
        $data['contact'] = $request->contact;
        $data['facebookurl'] = $request->facebookurl;
        $data['instagramurl'] = $request->instagramurl;
        $data['twitterurl'] = $request->twitterurl;

        DB::table('abouts')->update($data);
        $notification = array(
            'message' => 'Aboutus Updated Successfully',
            'alert-type' => 'success'
            );

        return redirect()->back()->with($notification);

    }

    
}
