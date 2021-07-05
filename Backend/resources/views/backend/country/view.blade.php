@extends('admin.admin_master')
@section('admin')
    <div class="content-wrapper">
    <a href="{{URL::previous()}}"><i class="fas fa-arrow-circle-left" style="font-size:40px;margin:10px"></i></a>
        <div class="card">
            <div class="card-body">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            Country Name
                        </div>
                        <div class="col-md-6">
                            {{ $country->country_name }}
                        </div>
                        <hr>
                        <div class="col-md-6">
                            Country Code
                        </div>
                        
                        <div class="col-md-6">
                            {{ $country->country_code }}
                        </div>
                        <hr>
                        <div class="col-md-6">
                            States
                        </div>
                        
                        <div class="col-md-6">
                            @foreach ($states as $row )

                                <span class="badge badge-info">{{ $row->state_name }}</span>
                                
                            @endforeach
                        </div>
                        <hr>
                        <div class="col-md-6">
                            Created Date
                        </div>
                        <div class="col-md-6">
                        {{Carbon\Carbon::parse($country->created_at)->diffForHumans()}}
                        </div>
                        <hr>
                        <div class="col-md-6">
                            Modified Date
                        </div>
                        <div class="col-md-6">
                        @if ($country->updated_at)
                            {{Carbon\Carbon::parse($country->updated_at)->diffForHumans()}}
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