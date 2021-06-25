@extends('admin.admin_master')
@section('admin')
    <div class="content-wrapper">
        <div class="card">
            <div class="card-body">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            Size Name
                        </div>
                        <div class="col-md-6">
                            {{ $size->size_name }}
                        </div>
                        <hr>
                        
                        
                        <div class="col-md-6">
                            Created Date
                        </div>
                        <div class="col-md-6">
                        {{Carbon\Carbon::parse($size->created_at)->diffForHumans()}}
                        </div>
                        <hr>
                        <div class="col-md-6">
                            Modified Date
                        </div>
                        <div class="col-md-6">
                        @if ($size->updated_at)
                        {{Carbon\Carbon::parse($size->updated_at)->diffForHumans()}}
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