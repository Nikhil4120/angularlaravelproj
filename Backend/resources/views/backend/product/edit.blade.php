@extends('admin.admin_master')
@section('admin')

@php
    $subcat = DB::table('subcategories')->where('category_id',$products->category_id)->get();
@endphp
<div class="content-wrapper">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card card-primary">
                    <div class="card-header">
                        <h3 class="card-title">Edit Products</h3>
                    </div>
                    <!-- /.card-header -->
                    <!-- form start -->
                    <form action="{{ route('update.product',$products->id)}}" method="post" enctype="multipart/form-data">@csrf
                        <div class="card-body">
                            <div class="form-group">
                                <label for="product_name">Product Name</label>
                                <input type="text" class="form-control" id="product_name" name="product_name"
                                    placeholder="Product Name" value="{{ $products->product_name }}">

                            </div>


                            <div class="form-group">
                                <label>Description</label>
                                <textarea class="form-control" rows="3" name="product_description">{{ $products->product_description }}</textarea>

                            </div>
                            <div class="row">
                                <div class="form-group col-md-6">
                                    <label for="exampleInputFile">File input</label>
                                    <div class="input-group">
                                        <div class="custom-file">
                                            <input type="file" class="custom-file-input" id="exampleInputFile" name="product_image">
                                            <label class="custom-file-label" for="exampleInputFile">Choose file</label>
                                        </div>
                                        <div class="input-group-append">
                                            <span class="input-group-text">Upload</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group col-md-6">
                                    <img src="{{ URL::to($products->product_image) }}" style="width:70px;height:50px;">
                                    <input type="hidden" name="oldimage" value="{{ $products->product_image }}">
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Category</label>
                                        <select class="form-control" name="category_id">
                                        
                                        @foreach ($categories as $row )

                                            @if($row->id == $products->category_id) 
                                            <option value="{{ $row->id}}" selected>{{ $row->category_name}}</option>    
                                            @else
                                            <option value="{{ $row->id}}">{{ $row->category_name}}</option>    
                                            @endif
                                          
                                        @endforeach
                                        
                                        
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>SubCategory</label>
                                        <select class="form-control" id="subcategory_id" name="subcategory_id">
                                            @foreach ($subcat as $row )
                                                @if($row->id == $products->subcategory_id)
                                                    <option value="{{ $row->id}}" selected>{{ $row->subcategory_name}}</option>    
                                                @else
                                                    <option value="{{ $row->id}}">{{ $row->subcategory_name}}</option>    
                                                @endif
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Color</label>
                                        <select class="form-control" name="color_id">
                                        
                                        @foreach ($colors as $row )
                                        @if ($row->id == $products->color_id)
                                            <option value="{{ $row->id}}" selected>{{ $row->color_name}}</option>    
                                        @else
                                            <option value="{{ $row->id}}">{{ $row->color_name}}</option>    
                                        @endif
                                          
                                        @endforeach
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Size</label>
                                        <select class="form-control" name="size_id[]" multiple>
                                        <option disabled>---Select Size---</option>
                                        @php
                                            $size_id = explode(",",$products->size_id);
                                        @endphp
                                        @foreach ($size as $row )
                                            @if(in_array($row->size_name,$size_id))
                                            <option value="{{ $row->size_name}}" selected>{{ $row->size_name}}</option>    
                                            @else
                                            <option value="{{ $row->size_name}}">{{ $row->size_name}}</option>    
                                            @endif
                                          
                                        @endforeach
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Sku id</label>
                                        <input type="text" class="form-control" id="product_name" name="sku_id"
                                    placeholder="Product SKUid" value="{{ $products->sku_id}}">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Price</label>
                                        <input type="number" class="form-control" id="product_name" name="price"
                                    placeholder="Product Price" min="0" value="{{ $products->price}}">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Quantity</label>
                                        <input type="number" class="form-control" id="quantity" name="quantity"
                                    placeholder="quantity" min="0" value="{{$products->quantity}}">
                                   
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    
                                </div>
                            </div>
                            <div class="form-group">

                                    <div class="custom-control custom-checkbox">
                                        <input class="custom-control-input" type="checkbox" id="customCheckbox1" value="1" name="istrending" @if ($products->istrending == 1)
                                            checked
                                        @endif>
                                        <label for="customCheckbox1" class="custom-control-label" >istrending</label>
                                    </div>
                                    
                            </div>

                        </div>
                        <!-- /.card-body -->

                        <div class="card-footer">
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</script>
  <script type="text/javascript">
   $(document).ready(function() {
         $('select[name="category_id"]').on('change', function(){
             var category_id = $(this).val();
             if(category_id) {
                 $.ajax({
                     url: "{{  url('/get/subcategory/') }}/"+category_id,
                     type:"GET",
                     dataType:"json",
                     success:function(data) {
                       console.log("hii");
                        $("#subcategory_id").empty();
                              $.each(data,function(key,value){
                                  $("#subcategory_id").append('<option value="'+value.id+'">'+value.subcategory_name+'</option>');
                              });
                              
                     
                      },
                      error:function(res){
                        console.log(res);
                      }
                     
                    
                 });
             } else {
                 alert('danger');
             }
         });
     });
</script>
@endsection