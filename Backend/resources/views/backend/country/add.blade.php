@extends('admin.admin_master')
@section('admin')
    <div class="content-wrapper">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                <div class="card card-primary">
                <div class="card-header">
                    <h3 class="card-title">Add Countries</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <form action = "{{ route('store.country')}}" method="post">@csrf
                    <div class="card-body">
                    <div class="form-group">
                        <label for="country_name">Country Name</label>
                        <input type="text" class="form-control" id="country_name" name="country_name" placeholder="Country Name">
                        
                    </div>
                    
                    
                    <div class="form-group">
                        <label>Country Code</label>
                        <input type="text" class="form-control" id="country_code" name="country_code" placeholder="Country Code">
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