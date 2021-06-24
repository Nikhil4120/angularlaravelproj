@extends('admin.admin_master')
@section('admin')
    <div class="content-wrapper">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                <div class="card card-primary">
                <div class="card-header">
                    <h3 class="card-title">Edit Categories</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <form action = "{{ route('update.subcategory',$subcategories->id)}}" method="post">@csrf
                    <div class="card-body">
                    <div class="form-group">
                        <label for="subcategory_name">SubCategory Name</label>
                        <input type="text" class="form-control" id="subcategory_name" name="subcategory_name" placeholder="SubCategory Name" value="{{$subcategories->subcategory_name}}">
                        
                    </div>
                    
                    
                    <div class="form-group">
                        <label>Description</label>
                        <textarea class="form-control" rows="3" name="subcategory_description">{{$subcategories->subcategory_description}}</textarea>
                        
                      </div>
                      <div class="form-group">
                        <label>Category</label>
                        <select class="form-control" name="category_id">
                          
                          @foreach($categories as $row)
                            @if ($row->id == $subcategories->category_id)
                                <option value="{{ $row->id }}" selected> {{ $row->category_name }}</option>    
                            @else
                                <option value="{{ $row->id }}"> {{ $row->category_name }}</option>
                            @endif
                            
                          @endforeach
                        </select>
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