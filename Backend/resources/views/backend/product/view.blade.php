@extends('admin.admin_master')
@section('admin')
    <div class="content-wrapper">
        <div class="card">
            <div class="card-body">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <img src="{{ asset($products->product_image) }}" style="height:300px;width:300px"> 
                        </div>
                        <hr><br>
                        <div class="col-md-6">
                            Product Name
                        </div>
                        <div class="col-md-6">
                            {{ $products->product_name }}
                        </div>
                        <hr>
                        <div class="col-md-6">
                            Product Description
                        </div>
                        
                        <div class="col-md-6">
                            {{ $products->product_description }}
                        </div>
                        <hr>
                        <div class="col-md-6">
                            Category Name
                        </div>
                        
                        <div class="col-md-6">
                            {{ $products->category_name }}
                        </div>
                        <hr>
                        <div class="col-md-6">
                            SubCategory Name
                        </div>
                        
                        <div class="col-md-6">
                            {{ $products->subcategory_name }}
                        </div>
                        <hr>
                        <div class="col-md-6">
                            Color
                        </div>
                        
                        <div class="col-md-6">
                            {{ $products->color_name }}
                        </div>
                        <hr>
                        <div class="col-md-6">
                            Size
                        </div>
                        
                        <div class="col-md-6">
                            {{ $products->size_id }}
                        </div>
                        <hr>
                        <div class="col-md-6">
                            Sku ID
                        </div>
                        
                        <div class="col-md-6">
                            {{ $products->sku_id }}
                        </div>
                        <hr>
                        <div class="col-md-6">
                            Price
                        </div>
                        
                        <div class="col-md-6">
                            {{ $products->price }}
                        </div>
                        <hr>
                        <div class="col-md-6">
                            Created Date
                        </div>
                        <div class="col-md-6">
                        {{Carbon\Carbon::parse($products->created_at)->diffForHumans()}}
                        </div>
                        <hr>
                        <div class="col-md-6">
                            Modified Date
                        </div>
                        <div class="col-md-6">
                        {{Carbon\Carbon::parse($products->updated_at)->diffForHumans()}}
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection