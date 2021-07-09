<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail;
use DB;

class newscontroller extends Controller
{
    //
    public function AddNews(){
        return view('backend.newsletter.add');
    }

    public function StoreNews(Request $request){
        $data = array();
        $data['title'] = $request->title;
        $data['description'] = $request->description;

        DB::table('newsletters')->insert($data);
        $emails = DB::table('newsletterusers')->select('email')->get();
        $email = Array();
        for ($i=0; $i <count($emails) ; $i++) { 
            # code...
            array_push($email,$emails[$i]->email);
        }
        $user['to'] = $email;
            Mail::send('backend.mail.newsmail',$data,function($messages) use($user){
                $messages->to($user['to']);
                $messages->subject("Update Eshopper site");
            });
            $notification = array(
                'message' => 'News Mail Sent Successfully to All user',
                'alert-type' => 'success'
                );
            return redirect()->back()->with($notification);
        

    }

    public function Newsuser(){
        $newsuser = DB::table('newsletterusers')->get();
        return view('backend.newsletter.index',compact('newsuser'));
    }

}
