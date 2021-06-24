@extends('admin.admin_master')
@section('admin')
<div class="content-wrapper">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card card-primary">
                    <div class="card-header">
                        <h3 class="card-title">Add Products</h3>
                    </div>
                    <!-- /.card-header -->
                    <!-- form start -->
                    <form action="{{ route('store.product')}}" method="post" enctype="multipart/form-data">@csrf
                        <div class="card-body">
                            <div class="form-group">
                                <label for="product_name">Product Name</label>
                                <input type="text" class="form-control" id="product_name" name="product_name"
                                    placeholder="Product Name">

                            </div>


                            <div class="form-group">
                                <label>Description</label>
                                <textarea class="form-control" rows="3" name="product_description"></textarea>

                            </div>
                            <div class="form-group">
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
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Category</label>
                                        <select class="form-control" name="category_id">
                                        <option selected disabled>---Select Category---</option>
                                        @foreach ($categories as $row )
                                          <option value="{{ $row->id}}">{{ $row->category_name}}</option>    
                                        @endforeach
                                        
                                        
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>SubCategory</label>
                                        <select class="form-control" id="subcategory_id" name="subcategory_id">
                                        <option selected disabled>---Select SubCategory---</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Color</label>
                                        <select class="form-control" name="color_id">
                                        <option selected disabled>---Select Color---</option>
                                        @foreach ($colors as $row )
                                          <option value="{{ $row->id}}">{{ $row->color_name}}</option>    
                                        @endforeach
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Size</label>
                                        <select class="form-control" name="size_id">
                                        <option selected disabled>---Select Size---</option>
                                        @foreach ($size as $row )
                                          <option value="{{ $row->id}}">{{ $row->size_name}}</option>    
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
                                    placeholder="Product SKUid">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Price</label>
                                        <input type="number" class="form-control" id="product_name" name="price"
                                    placeholder="Product Price" min="0">
                                    </div>
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