<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Image;

class SliderController extends Controller
{
    //

    public function Index(){
        $sliders = DB::table('sliders')->get();
        return view('backend.slider.index',compact('sliders'));
    }

    public function AddSlider(){
        return view('backend.slider.add');
    }
    public function StoreSlider(Request $request){
        $data = array();
        $image = $request->image;
        if($image){

            $image_one = uniqid().'.'.$image->getClientOriginalExtension();
            Image::make($image)->save('image/sliders/'.$image_one);
            $data['image'] = 'image/sliders/'.$image_one;
            DB::table('sliders')->insert($data);
            $notification = array(
                'message' => 'slider Inserted Successfully',
                'alert-type' => 'success'
                );
            return redirect()->back()->with($notification);

        } 
        else{
            return redirect()->back();
        }
    }

    public function EditSlider($id){
        $slider = DB::table('sliders')->where('id',$id)->first();
        return view('backend.slider.edit',compact('slider'));

    }
    public function UpdateSlider(Request $request,$id){
        $data = array();
        $image = $request->image;
        if($image){

            $image_one = uniqid().'.'.$image->getClientOriginalExtension();
            Image::make($image)->save('image/sliders/'.$image_one);
            
            $data['image'] = 'image/sliders/'.$image_one;
            DB::table('sliders')->where('id',$id)->update($data);
            $notification = array(
                'message' => 'slider Updated Successfully',
                'alert-type' => 'success'
                );
            return redirect()->route('all.slider')->with($notification);

        } 
        else{
            return redirect()->back();
        }
    }
}
