@extends('admin.admin_master')
@section('admin')
    <div class="content-wrapper">

    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>All Categories</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">DataTables</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            
            <!-- /.card -->

            <div class="card">
              <div class="card-header">
                <h3 class="card-title"><a class="btn btn-primary" href="{{ route('add.color') }}">Add Color</a></h3>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
              @php($i=1)
                <table id="example1" class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th>SR No.</th>
                    <th>Color Name</th>
                    <th>Color Image </th>
                    <th>Created Date</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                    @foreach ($colors as $row )
                        <tr>
                        <td>{{ $i++ }}</td>
                        <td>{{ $row->color_name }}</td>
                        <td style="text-align:center"><i class="fas fa-circle" style="color:{{ $row->color_code }};border-radius:50%;text-align:center" ></i></td>
                        <td>{{ $row->created_at }}</td>
                        <td>
                        <a href="{{ route('color.view',$row->id)}}" class="btn btn-info"><i class="nav-icon fas fa-eye"></i></a>
                        <a href="{{ route('edit.color',$row->id)}}" class="btn btn-info"><i class="nav-icon fas fa-edit"></i></a>
                        <a href="{{ route('delete.color',$row->id)}}" class="btn btn-danger" onclick="return confirm('Are you sure to delete')"><i class="nav-icon fas fa-trash"></i></a>
                              @if($row->status == 1)
                                <a href="{{ route('color.deactive',$row->id)}}" class="btn btn-warning"><i class="fas fa-ban"></i></a>
                                @elseif ($row->status == 0)
                                <a href="{{ route('color.active',$row->id)}}" class="btn btn-success"><i class="fas fa-check"></i></a>
                                @endif
                        </td>
                        </tr>
                    @endforeach
                  </tbody>
                      </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </section>
    </div>
@endsection