<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Image;

class TestimonialController extends Controller
{
    //

    public function Index(){
        $testimonials = DB::table('testimonials')->get();
        return view('backend.testimonial.index',compact('testimonials'));
    }

    public function AddTestimonial(){
        return view('backend.testimonial.add');
    }
    public function StoreTestimonial(Request $request){
        $data = array();
        $data['name'] = $request->name;
        $data['designation'] = $request->designation;
        $data['description'] = $request->description;
        $image = $request->image;
        if($image){

            $image_one = uniqid().'.'.$image->getClientOriginalExtension();
            Image::make($image)->save('image/testimonials/'.$image_one);
            $data['image'] = 'image/testimonials/'.$image_one;
            DB::table('testimonials')->insert($data);
            $notification = array(
                'message' => 'testimonial Inserted Successfully',
                'alert-type' => 'success'
                );
            return redirect()->back()->with($notification);

        } 
        else{
            return redirect()->back();
        }
    }

    public function Edittestimonial($id){
        $testimonial = DB::table('testimonials')->where('id',$id)->first();
        return view('backend.testimonial.edit',compact('testimonial'));
    }

    public function Updatetestimonial(Request $request,$id){

        $data = array();
        $data['name'] = $request->name;
        $data['designation'] = $request->designation;
        $data['description'] = $request->description;
        $image = $request->image;
        if($image){

            $image_one = uniqid().'.'.$image->getClientOriginalExtension();
            Image::make($image)->save('image/testimonials/'.$image_one);
            $data['image'] = 'image/testimonials/'.$image_one;
            DB::table('testimonials')->where('id',$id)->update($data);
            $notification = array(
                'message' => 'testimonial Updated Successfully',
                'alert-type' => 'success'
                );
            return redirect()->route('all.testimonial')->with($notification);

        } 
        else{
            DB::table('testimonials')->where('id',$id)->update($data);
            $notification = array(
                'message' => 'testimonial Inserted Successfully',
                'alert-type' => 'success'
                );
            return redirect()->route('all.testimonial')->with($notification);
        }

    }

}
