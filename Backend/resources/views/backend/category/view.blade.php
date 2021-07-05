@extends('admin.admin_master')
@section('admin')
    <div class="content-wrapper">
    <a href="{{URL::previous()}}"><i class="fas fa-arrow-circle-left" style="font-size:40px;margin:10px"></i></a>
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
                            Subcategories
                        </div>
                        
                        <div class="col-md-6">
                            @foreach ($subcategories as $row )

                                <span class="badge badge-info">{{ $row->subcategory_name }}</span>
                                
                            @endforeach
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
                        @if ($categories->updated_at)
                        {{Carbon\Carbon::parse($categories->updated_at)->diffForHumans()}}
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