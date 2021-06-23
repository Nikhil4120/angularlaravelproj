@extends('admin.admin_master')
@section('admin')
    <div class="content-wrapper">
        <div class="card">
            <div class="card-body">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            Category Name
                        </div>
                        <div class="col-md-6">
                            {{ $categories->category_name }}
                        </div>
                        <hr>
                        <div class="col-md-6">
                            Category Description
                        </div>
                        
                        <div class="col-md-6">
                        {{ $categories->category_description }}
                        </div>
                        <hr>
                        <div class="col-md-6">
                            Created Date
                        </div>
                        <div class="col-md-6">
                        {{Carbon\Carbon::parse($categories->created_at)->diffForHumans()}}
                        </div>
                        <hr>
                        <div class="col-md-6">
                            Modified Date
                        </div>
                        <div class="col-md-6">
                        {{Carbon\Carbon::parse($categories->updated_at)->diffForHumans()}}
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection