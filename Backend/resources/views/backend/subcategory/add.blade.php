@extends('admin.admin_master')
@section('admin')
    <div class="content-wrapper">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                <div class="card card-primary">
                <div class="card-header">
                    <h3 class="card-title">Add Categories</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <form action = "{{ route('store.subcategory')}}" method="post">@csrf
                    <div class="card-body">
                    <div class="form-group">
                        <label for="subcategory_name">SubCategory Name</label>
                        <input type="text" class="form-control" id="subcategory_name" name="subcategory_name" placeholder="SubCategory Name">
                        
                    </div>
                    
                    
                    <div class="form-group">
                        <label>Description</label>
                        <textarea class="form-control" rows="3" name="subcategory_description"></textarea>
                        
                      </div>
                      <div class="form-group">
                        <label>Category</label>
                        <select class="form-control" name="category_id">
                          <option selected disabled>--Select Category--</option>
                          @foreach($categories as $row)
                            <option value="{{ $row->id }}"> {{ $row->category_name }}</option>
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