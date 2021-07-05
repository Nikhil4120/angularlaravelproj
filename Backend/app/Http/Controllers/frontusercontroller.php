<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
class frontuserController extends Controller
{
    //
    public function Index(){
        $users = DB::table('frontusers')->get();
        return view('backend.frontuser.index',compact('users'));
    }

    public function ViewUser($id){
        $user = DB::table('frontusers')->where('id',$id)->first();
        return view('backend.frontuser.view',compact('user'));
    }
}
