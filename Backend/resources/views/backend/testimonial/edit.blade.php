@extends('admin.admin_master')
@section('admin')
<div class="content-wrapper">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card card-primary">
                    <div class="card-header">
                        <h3 class="card-title">Add Testimonials</h3>
                    </div>
                    <!-- /.card-header -->
                    <!-- form start -->
                    <form action="{{ route('update.testimonial',$testimonial->id)}}" method="post" enctype="multipart/form-data">@csrf
                        <div class="card-body">
                            <div class="form-group">
                                <label for="product_name">Name</label>
                                <input type="text" class="form-control" id="name" name="name"
                                    placeholder="Name" value="{{ $testimonial->name }}">
                                

                            </div>
                            <div class="form-group">
                                <label>Designation</label>
                                <input type="text" class="form-control" id="name" name="designation"
                                    placeholder="designation" value="{{ $testimonial->designation }}">
                                
                            </div>

                            <div class="form-group">
                                <label>Description</label>
                                <textarea class="form-control" rows="3" name="description">{{ $testimonial->description }}</textarea>
                                
                            </div>
                            <div class="form-group">
                                <label for="exampleInputFile">File input</label>
                                <div class="input-group">
                                    <div class="custom-file">
                                        <input type="file" class="custom-file-input" id="exampleInputFile" name="image">
                                        <label class="custom-file-label" for="exampleInputFile">Choose file</label>
                                    </div>
                                    <div class="input-group-append">
                                        <span class="input-group-text">Upload</span>
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="form-group col-md-6">
                                    <img src="{{ URL::to($testimonial->image) }}" style="width:500px;height:300px;">
                                    <input type="hidden" name="oldimage" value="{{ $testimonial->image }}">
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

@endsection