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
                            <div class="form-group">
                                <label for="title">Title</label>
                                <input type="text" class="form-control" id="title" name="title"
                                    placeholder="Enter a Title" value="{{ $about->title }}">

                            </div>
                            <div class="form-group">
                                <label for="developed_by">Developed By</label>
                                <input type="text" class="form-control" id="developed_by" name="developed_by"
                                    placeholder="Developed By" value="{{ $about->developed_by }}">

                            </div>
                            <div class="form-group">
                                <label>Description</label>
                                <textarea class="form-control" rows="3" name="description">{{ $about->description}}</textarea>

                            </div>
                        
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" class="form-control" id="email" name="email" placeholder="Enter Email" value="{{ $about->email}}">

                        </div>
                        <div class="form-group">
                            <label for="contact">Contact No.</label>
                            <input type="text" class="form-control" id="contact" name="contact"
                                placeholder="Contact No." value="{{ $about->contact }}">

                        </div>
                        <div class="form-group">
                            <label for="facebookurl">Facebook Url</label>
                            <input type="text" class="form-control" id="facebookurl" name="facebookurl"
                                placeholder="Enter Facebook URL" value="{{ $about->facebookurl }}">

                        </div>
                        <div class="form-group">
                            <label for="instagramurl">Instagram URL</label>
                            <input type="text" class="form-control" id="instagramurl" name="instagramurl"
                                placeholder="Instagram URL" value="{{ $about->instagramurl }}">

                        </div>
                        <div class="form-group">
                            <label for="twitterurl">Twitter URL</label>
                            <input type="text" class="form-control" id="twitterurl" name="twitterurl"
                                placeholder="Twitter URL" value="{{ $about->twitterurl }}">

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