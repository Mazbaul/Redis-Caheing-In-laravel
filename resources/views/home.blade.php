@extends('layouts.app')
<script type="text/javascript"
  src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"
  ></script>


@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <!-- <div class="card-header">Dashboard</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    You are logged in!
                </div> -->

                <div class="card-body">
                  <div class="float-right" style="padding-bottom: 10px;">
                    <!-- <a href="#" class="btn btn-success ">ADD NEW</a>
                     <br> -->
                     <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                     ADD NEW
                    </button>
                  </div>
                  <br>
                <table class="table table-striped display" id="example"style="width:100%">
                  <thead>
                    <tr>
                      <th>SL</th>
                      <th>Name</th>
                      <th>Roll</th>
                      <th>Department</th>
                      <th>Courses</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                <?php
                $i=1;
                foreach ($result as $r) {?>
                  <tr>
                    <td>{{ $i }}</td>
                    <td><img src="#" alt="" width="50" height="60"></img> {{ $r->name}}</td>
                    <td>{{ $r->roll}}</td>
                    <td>{{ $r->department->name}}</td>
                    <td><?php foreach ($r->studentcourse as $course) {?>
                      {{ $course->course->name}},
                    <?php } ?></td>
                    <td>
                         <a class="btn btn-success btn-small" href="#">E</a>
                         <a class="btn btn-danger btn-small" href="#">D</a>
                    </td>
                  </tr>
                 <?php
                   $i++;
               }?>
               </tbody>
             </table>
             <div class="row">
               <div class="col-md-6">

               </div>
               <div class="col-md-6">

               </div>

             </div>
           </div>
                <!--

                    <tr>
                      <td></td>
                    </tr>
                   -->

                <div class="col-md-12" id="wraper">

                </div>
            </div>
        </div>
    </div>
</div>
<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add New Student</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">


            <div class="form-group row">
                <label for="name" class="col-md-4 col-form-label text-md-right">{{ __('Name') }}</label>

                <div class="col-md-6">
                    <input id="name" type="text" class="form-control " name="name"  required autocomplete="name" autofocus>

                </div>
            </div>

            <div class="form-group row">
                <label for="roll" class="col-md-4 col-form-label text-md-right">{{ __('ROll') }}</label>

                <div class="col-md-6">
                    <input id="roll" type="text" class="form-control " name="roll"  required autocomplete="roll">


                </div>
            </div>

            <div class="form-group row">
                <label for="department" class="col-md-4 col-form-label text-md-right">{{ __('DEPARTMENT') }}</label>

                <div class="col-md-6">
                  <select name="department" id="department" class="form-control ">
                    <option value="">Select Department</option>
                    <?php foreach ($departments as $department){ ?>
                      <option value="{{$department->id }}">{{$department->name}}</option>

                    <?php } ?>

                  </select>
                </div>
            </div>

            <div class="form-group row">
                <label for="course" class="col-md-4 col-form-label text-md-right">{{ __('Course') }}</label>

                <div class="col-md-6">
                  <select class="form-control" name="course" id="course" >
                    <option>Mustard</option>
                    <option>Ketchup</option>
                    <option>Barbecue</option>
                 </select>
                </div>
            </div>
            <div class="form-group row">
                <label for="image" class="col-md-4 col-form-label text-md-right">{{ __('Image') }}</label>

                <div class="col-md-6">
                    <input class="form-control " name="name" type='file' id="imgInp" />
                       <img id="blah" src="#" alt="your image" width="200" height="180" />

                </div>
            </div>


      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" id="save" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

@endsection


<script type="text/javascript">
$(document).ready(function() {
// $('#example').DataTable();
// console.log('pp');
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$("#imgInp").change(function(){
    readURL(this);
});
$("#save").on('click',function(){

console.log($("#imgInp").val());

var name= $("#name").val();
var roll= $("#roll").val();
var dept= $("#department").val();
var course= $("#course").val();
var image= $("#imgInp").val();

$.ajax({
         url  : "{{ url('/student/store')}}",
         type : 'get',
         data : {name:name,roll:roll,dept:dept,course:course,image:image},
         success  : function(response) {
           // jQuery("input[name=hearingtestId]:hidden").val(response);
           // document.getElementById("exampleModal").style.display = "none";

         }
       });
});
} );

</script>
