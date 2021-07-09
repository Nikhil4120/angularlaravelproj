<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class ContactController extends Controller
{
    //
    public function Index(){
        $contact = DB::table('contacts')->get();
        return view('backend.contact.index',compact('contact'));
    }
    

}
