@extends('admin.admin_master')
@section('admin')
    <div class="content-wrapper">
    <a href="{{URL::previous()}}"><i class="fas fa-arrow-circle-left" style="font-size:40px;margin:10px"></i></a>
        <div class="card">
            <div class="card-body">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            Color Name
                        </div>
                        <div class="col-md-6">
                            {{ $color->color_name }}
                        </div>
                        <hr>
                        <div class="col-md-6">
                            Color Image
                        </div>
                        
                        <div class="col-md-6">
                        <i class="fas fa-circle" style="color:{{ $color->color_code }};border-radius:50%;text-align:center" ></i>
                        </div>
                        <hr>
                        
                        <div class="col-md-6">
                            Created Date
                        </div>
                        <div class="col-md-6">
                        {{Carbon\Carbon::parse($color->created_at)->diffForHumans()}}
                        </div>
                        <hr>
                        <div class="col-md-6">
                            Modified Date
                        </div>
                        <div class="col-md-6">
                        @if ($color->updated_at)
                        {{Carbon\Carbon::parse($color->updated_at)->diffForHumans()}}
                        @else
                        -
                            
                        @endif
                        
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection