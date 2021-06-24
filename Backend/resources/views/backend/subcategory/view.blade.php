@extends('admin.admin_master')
@section('admin')
    <div class="content-wrapper">
        <div class="card">
            <div class="card-body">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            SubCategory Name
                        </div>
                        <div class="col-md-6">
                            {{ $subcategories->subcategory_name }}
                        </div>
                        <hr>
                        <div class="col-md-6">
                            subCategory Description
                        </div>
                        
                        <div class="col-md-6">
                        {{ $subcategories->subcategory_description }}
                        </div>
                        <hr>
                        <div class="col-md-6">
                            Category Name
                        </div>
                        
                        <div class="col-md-6">
                        {{ $subcategories->category_name }}
                        </div>
                        <hr>
                        <div class="col-md-6">
                            Status
                        </div>
                        
                        <div class="col-md-6">
                            @if($subcategories->status == 1)
                                <span class="badge badge-success">Active</span>
                            @elseif ($subcategories->status == 0)
                                <span class="badge badge-danger">Active</span>
                            @endif
                        </div>
                        <hr>
                        <div class="col-md-6">
                            Created Date
                        </div>
                        <div class="col-md-6">
                        {{Carbon\Carbon::parse($subcategories->created_at)->diffForHumans()}}
                        </div>
                        <hr>
                        <div class="col-md-6">
                            Modified Date
                        </div>
                        <div class="col-md-6">
                        {{Carbon\Carbon::parse($subcategories->updated_at)->diffForHumans()}}
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection