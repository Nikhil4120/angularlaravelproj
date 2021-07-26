@extends('admin.admin_master')
@section('admin')
    <div class="content-wrapper">

    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>All Orders</h1>
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
                <h3 class="card-title">All Orders</h3>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
              @php($i=1)
                <table id="example1" class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th>SR No.</th>
                    <th>User Name</th>
                    <th>Product Name</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                    @foreach ($orders as $row )
                        <tr>
                        <td>{{ $i++ }}</td>
                        <td>{{ $row->username }}</td>
                        <td>{{ $row->product_name }}</td>
                        <td>
                          @if ($row->delievery_status == 1)
                            <span class="text-secondary">Order Has been Placed</span>
                          @elseif ($row->delievery_status == 2)
                            <span class="text-info">Order is Packed</span>
                          @elseif ($row->delievery_status == 3)
                            <span class="text-primary">Order is Shipped</span>
                          @elseif ($row->delievery_status == 4)
                            <span class="text-success">Order hasbeen delievered</span>
                          @elseif ($row->delievery_status == 5)
                            <span class="text-danger">Cancel</span>
                          @elseif ($row->delievery_status == 6)
                            <span class="text-warning">Return</span>
                          @endif
                        </td>
                        <td>
                        
                        
                              @if($row->delievery_status == 1)
                                <a href="{{ route('order.packed',$row->id)}}" class="btn btn-info">Packed</a>
                              @elseif ($row->delievery_status == 2)
                                <a href="{{ route('order.shipped',$row->id)}}" class="btn btn-primary">Shipped</a>
                              @elseif ($row->delievery_status == 3)
                                <a href="{{ route('order.delievered',$row->id)}}" class="btn btn-success">Delievered</a>
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