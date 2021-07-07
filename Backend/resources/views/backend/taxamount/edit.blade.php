@extends('admin.admin_master')
@section('admin')

@php
    $states = DB::table('states')->where('country_id',$tax->country_id)->get();
@endphp
    <div class="content-wrapper">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                <div class="card card-primary">
                <div class="card-header">
                    <h3 class="card-title">Add Tax</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <form action = "{{ route('update.tax',$tax->id)}}" method="post">@csrf
                    <div class="card-body">
                    
                    
                    
                    
                      <div class="form-group">
                        <label>Countries</label>
                        <select class="form-control" name="country_id">
                          
                          @foreach($countries as $row)
                            @if ($row->id == $tax->country_id)
                                <option value="{{ $row->id }}" selected> {{ $row->country_name }}</option>
                            
                            @else
                                <option value="{{ $row->id }}"> {{ $row->country_name }}</option>
                            @endif
                            
                          @endforeach
                        </select>
                      </div>
                      <div class="form-group">
                        <label>State</label>
                        <select class="form-control" name="state_id" id="state_id">
                          @foreach ($states as $row )
                          @if ($row->id == $tax->state_id)
                                <option value="{{ $row->id }}" selected> {{ $row->state_name }}</option>
                            
                            @else
                                <option value="{{ $row->id }}"> {{ $row->state_name }}</option>
                            @endif

                          @endforeach
                          
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="tax_amount">Tax Amount</label>
                        <input type="text" class="form-control" id="tax_amount" name="tax_amount" placeholder="tax amount" value="{{ $tax->tax_amount }}">
                        
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
    <script type="text/javascript">
   $(document).ready(function() {
         $('select[name="country_id"]').on('change', function(){
             var country_id = $(this).val();
             if(country_id) {
                 $.ajax({
                     url: "{{  url('/get/state/') }}/"+country_id,
                     type:"GET",
                     dataType:"json",
                     success:function(data) {
                       console.log("hii");
                        $("#state_id").empty();
                              $.each(data,function(key,value){
                                  $("#state_id").append('<option value="'+value.id+'">'+value.state_name+'</option>');
                              });
                              
                     
                      },
                      error:function(res){
                        console.log(res);
                      }
                     
                    
                 });
             } else {
                 alert('danger');
             }
         });
     });
</script>
@endsection