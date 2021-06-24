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
                <form action = "{{ route('store.size')}}" method="post">@csrf
                    <div class="card-body">
                    <div class="form-group">
                        <label for="size_name">Size Name</label>
                        <input type="text" class="form-control" id="size_name" name="size_name" placeholder="Size Name">
                        
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