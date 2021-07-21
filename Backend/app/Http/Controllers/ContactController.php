<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Mail;
use Stripe\Stripe;
use Stripe\Customer;
use Stripe\Charge;
use Stripe\Coupon;
use Stripe\Exception\InvalidRequestException;


class ContactController extends Controller
{
    //
    public function __construct(){

        $this->middleware('auth');
    }
    public function Index(){
        $contact = DB::table('contacts')->get();
        return view('backend.contact.index',compact('contact'));
    }

    public function Reply(Request $request,$id){

        $data = array();
        $data['isreplied'] = 1;
        $data['reply'] = $request->reply;
        DB::table('contacts')->where('id',$id)->update($data);
        $query = DB::table('contacts')->where('id',$id)->first();
        $email = $query->email;
        $data['name'] = $query->name;
        $user['to'] = $email;
        Mail::send('backend.mail.replymail',$data,function($messages) use($user){
            $messages->to($user['to']);
            $messages->subject("Contactus");
        });

        $notification = array(
            'message' => 'Reply sent successfully',
            'alert-type' => 'success'
            );
        return redirect()->route('all.contact')->with($notification);
    }

    public function Coupons(){
        Stripe::setApiKey(env('STRIPE_SECRET'));
        try{

            $coupen = Coupon::retrieve('qxpvHKMR',[]);
            return response()->json($coupen);
        }
        catch(InvalidRequestException $e){
            return response()->json($e);
        }

    }
    

}
