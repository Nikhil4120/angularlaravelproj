@extends('admin.admin_master')
@section('admin')
    <div class="content-wrapper">
    <a href="{{URL::previous()}}"><i class="fas fa-arrow-circle-left" style="font-size:40px;margin:10px"></i></a>
        <div class="card">
            <div class="card-body">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            City Name
                        </div>
                        <div class="col-md-6">
                            {{ $city->city_name }}
                        </div>
                        <hr>
                        <div class="col-md-6">
                            State Name
                        </div>
                        
                        <div class="col-md-6">
                            {{ $city->state_name }}
                        </div>
                        <hr>
                        <div class="col-md-6">
                            Country Name
                        </div>
                        
                        <div class="col-md-6">
                            {{ $city->country_name }}
                        </div>
                        <hr>
                        <div class="col-md-6">
                            Created Date
                        </div>
                        <div class="col-md-6">
                        {{Carbon\Carbon::parse($city->created_at)->diffForHumans()}}
                        </div>
                        <hr>
                        <div class="col-md-6">
                            Modified Date
                        </div>
                        <div class="col-md-6">
                        @if ($city->updated_at)
                            {{Carbon\Carbon::parse($city->updated_at)->diffForHumans()}}
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