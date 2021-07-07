@extends('admin.admin_master')
@section('admin')
    <div class="content-wrapper">
    <a href="{{URL::previous()}}"><i class="fas fa-arrow-circle-left" style="font-size:40px;margin:10px"></i></a>
        <div class="card">
            <div class="card-body">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            Country Name
                        </div>
                        <div class="col-md-6">
                            {{ $tax->country_name }}
                        </div>
                        <hr>
                        <div class="col-md-6">
                            State Name
                        </div>
                        
                        <div class="col-md-6">
                        {{ $tax->state_name }}
                        </div>
                        <hr>
                        <div class="col-md-6">
                            Tax Amount
                        </div>
                        
                        <div class="col-md-6">
                        {{ $tax->tax_amount }}
                        </div>
                        <hr>
                        
                        
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection