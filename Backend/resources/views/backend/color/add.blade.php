@extends('admin.admin_master')
@section('admin')
    <div class="content-wrapper">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                <div class="card card-primary">
                <div class="card-header">
                    <h3 class="card-title">Add Colors</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <form action = "{{ route('store.color')}}" method="post">@csrf
                    <div class="card-body">
                    <div class="form-group">
                        <label for="category_name">Color Name</label>
                        <input type="text" class="form-control" id="category_name" name="color_name" placeholder="Color Name">
                        
                    </div>
                    
                    
                    <div class="form-group">
                        <label>Color</label>
                        <input type="color" class="form-control" id="color_code" name="color_code">
                        
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