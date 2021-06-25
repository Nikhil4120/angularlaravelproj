@extends('admin.admin_master')
@section('admin')
    <div class="content-wrapper">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                <div class="card card-primary">
                <div class="card-header">
                    <h3 class="card-title">Add State</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <form action = "{{ route('update.state', $states->id)}}" method="post">@csrf
                    <div class="card-body">
                    <div class="form-group">
                        <label for="state_name">state Name</label>
                        <input type="text" class="form-control" id="state_name" name="state_name" placeholder="State Name" value="{{ $states->state_name }}">
                        
                    </div>
                    
                    
                    <div class="form-group">
                        <label>Country</label>
                        <select class="form-control" name="country_id">
                          <option selected disabled>--Select Country--</option>
                          @foreach($countries as $row)
                            @if ($row->id == $states->country_id)
                            <option value="{{ $row->id }}" selected> {{ $row->country_name }}</option>
                            @else
                            <option value="{{ $row->id }}"> {{ $row->country_name }}</option>
                            @endif
                            
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