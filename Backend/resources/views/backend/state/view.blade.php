@extends('admin.admin_master')
@section('admin')
    <div class="content-wrapper">
        <div class="card">
            <div class="card-body">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            State Name
                        </div>
                        <div class="col-md-6">
                            {{ $state->state_name }}
                        </div>
                        <hr>
                        <div class="col-md-6">
                            Country Name
                        </div>
                        
                        <div class="col-md-6">
                            {{ $state->country_name }}
                        </div>
                        <hr>
                        <div class="col-md-6">
                            Cities
                        </div>
                        
                        <div class="col-md-6">
                            @foreach ($cities as $row )

                                <span class="badge badge-info">{{ $row->city_name }}</span>
                                
                            @endforeach
                        </div>
                        <hr>
                        <div class="col-md-6">
                            Created Date
                        </div>
                        <div class="col-md-6">
                        {{Carbon\Carbon::parse($state->created_at)->diffForHumans()}}
                        </div>
                        <hr>
                        <div class="col-md-6">
                            Modified Date
                        </div>
                        <div class="col-md-6">
                        @if ($state->updated_at)
                            {{Carbon\Carbon::parse($state->updated_at)->diffForHumans()}}
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