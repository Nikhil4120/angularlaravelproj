@extends('admin.admin_master')
@section('admin')
    <div class="content-wrapper">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                <div class="card card-primary">
                <div class="card-header">
                    <h3 class="card-title">Edit City</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <form action = "{{ route('update.city',$city->id)}}" method="post">@csrf
                    <div class="card-body">
                    <div class="form-group">
                        <label for="city_name">City Name</label>
                        <input type="text" class="form-control" id="city_name" name="city_name" placeholder="City Name" value="{{ $city->city_name }}">
                        
                    </div>
                    
                    
                    <div class="form-group">
                        <label>Country</label>
                        <select class="form-control" name="state_id">
                          <option selected disabled>--Select State--</option>
                          @foreach($states as $row)
                            @if ($row->id == $city->state_id)
                            <option value="{{ $row->id }}" selected> {{ $row->state_name }}</option>    
                            @else
                            <option value="{{ $row->id }}"> {{ $row->state_name }}</option>    
                            @endif
                            
                          @endforeach
                        </select>
                      </div>
                    <!-- /.card-body -->

                    <div class="card-footer">
                    <button type="submit" class="btn btn-primary">Update</button>
                    </div>
                </form>
                </div>
                </div>
            </div>
        </div>
    </div>
@endsection