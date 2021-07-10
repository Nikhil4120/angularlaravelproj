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
                    <form action="{{ route('store.about')}}" method="post">@csrf
                        <div class="card-body">
                            
                        <div class="row">
                            <div class="col-md-12">
                              <div class="card card-outline card-info">
                                <div class="card-header">
                                  <h3 class="card-title">
                                    Summernote
                                  </h3>
                                </div>
                                <!-- /.card-header -->
                                <div class="card-body">
                                  <textarea id="summernote" name="content">
                                    {{ $about->content }}
                                  </textarea>
                                </div>
                                
                              </div>
                            </div>
                            <!-- /.col-->
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