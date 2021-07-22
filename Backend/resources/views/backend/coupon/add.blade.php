@extends('admin.admin_master')
@section('admin')
    <div class="content-wrapper">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                <div class="card card-primary">
                <div class="card-header">
                    <h3 class="card-title">Add Coupons</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <form action = "{{ route('store.coupon')}}" method="post">@csrf
                    <div class="card-body">
                    <div class="form-group">
                        <label>Discount</label>
                        <input type="number" class="form-control" min="0" max="99"  name="discount" placeholder="Discount">
                        
                    </div>
                    
                    
                    <div class="form-group">
                        <label>expired_at</label>
                        <input type="datetime-local" class="form-control" name="expired_at">
                        
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