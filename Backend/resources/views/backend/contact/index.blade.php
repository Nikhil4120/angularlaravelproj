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
                <h3 class="card-title"><a class="btn btn-primary" href="{{ route('add.category') }}">All Contact</a></h3>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
              @php($i=1)
                <table id="example1" class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th>SR No.</th>
                    <th> Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                    @foreach ($contact as $row )
                        <tr>
                        <td>{{ $i++ }}</td>
                        <td>{{ $row->name }}</td>
                        <td>{{ $row->email }}</td>
                        <td>{{ $row->subject }}</td>
                        <td>{{ $row->message }}</td>
                       
                        <td>
                        
                              @if($row->isreplied == 1)
                                <h3 class="text-success">Query Solved</h3>
                                @elseif ($row->isreplied == 0)
                                <a href="#" class="btn btn-success" data-toggle="modal" data-target="#modal{{$row->id}}">Reply</a>
                                @endif
                                <div class="modal fade" id="modal{{$row->id}}">
                            <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                <h4 class="modal-title">Default Modal</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <div class="form-group">
                                            <label for="reply">Reply</label>
                                            <textarea class="form-control" rows="3" name="reply"></textarea>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer justify-content-between">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                            <!-- /.modal-content -->
                            </div>
                            <!-- /.modal-dialog -->
                        </div>
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