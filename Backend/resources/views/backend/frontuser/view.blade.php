@extends('admin.admin_master')
@section('admin')
<div class="content-wrapper">
<a href="{{URL::previous()}}"><i class="fas fa-arrow-circle-left" style="font-size:40px;margin:10px"></i></a>
    <div class="card">
        <div class="card-body">
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        User Name
                    </div>
                    <div class="col-md-6">
                        {{ $user->username }}
                    </div>
                    <hr>
                    <div class="col-md-6">
                        FirstName
                    </div>

                    <div class="col-md-6">
                        {{ $user->firstname }}
                    </div>
                    <hr>
                    <div class="col-md-6">
                        lastname
                    </div>

                    <div class="col-md-6">
                        {{ $user->lastname }}
                    </div>
                    <hr>
                    <div class="col-md-6">
                        Email
                    </div>

                    <div class="col-md-6">
                        {{ $user->email }}
                    </div>
                    <hr>
                    <div class="col-md-6">
                        Mobileno.
                    </div>

                    <div class="col-md-6">
                        {{ $user->mobileno }}
                    </div>
                    <hr>
                    <div class="col-md-6">
                        Phoneno.
                    </div>

                    <div class="col-md-6">
                        {{ $user->phoneno }}
                    </div>
                    <hr>
                    <div class="col-md-6">
                        Gender
                    </div>

                    <div class="col-md-6">
                        {{ $user->gender }}
                    </div>
                    <hr>
                    <div class="col-md-6">
                        intrest
                    </div>

                    <div class="col-md-6">
                        {{ $user->intrest }}
                    </div>
                    <hr>

                </div>
            </div>
        </div>
    </div>
</div>
@endsection