@extends('admin.admin_master')
@section('admin')
    <div class="content-wrapper">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                <div class="card card-primary">
                <div class="card-header">
                    <h3 class="card-title">Add City</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <form action = "{{ route('store.city')}}" method="post">@csrf
                    <div class="card-body">
                    <div class="form-group">
                        <label for="city_name">City Name</label>
                        <input type="text" class="form-control" id="city_name" name="city_name" placeholder="City Name">
                        @error('city_name')

                            <span class="text-danger">{{ $message }}</span>
                            
                        @enderror
                    </div>
                    
                    
                    <div class="form-group">
                        <label>Country</label>
                        <select class="form-control" name="state_id">
                          <option selected disabled>--Select State--</option>
                          @foreach($states as $row)
                            <option value="{{ $row->id }}"> {{ $row->state_name }}</option>
                          @endforeach
                        </select>
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