

$(document).ready(function() {
// $('#example').DataTable();
// console.log('pp');

    const baseurl = window.location.protocol + "//" + window.location.host + "/";
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$('.courses').select2();
// $("#department").on('change',function(){
//   console.log();
//   var dept_id = $("#department").val();
//   $.ajax({
//            url  : baseurl+'courses/get',
//            type : 'get',
//            data : {dept_id:dept_id},
//            success  : function(response) {
//              // jQuery("input[name=hearingtestId]:hidden").val(response);
//              // document.getElementById("exampleModal").style.display = "none";
//
//            }
//          });
//
// });
$("#imgInp").change(function(){
    readURL(this);
});

$(".edit").on('click',function(){
  var id = $(this).data('id');
  $('#idedit').val(id);
  // console.log(id);
  $.ajax({
           url  : baseurl+'student/getbyId',
           type : 'get',
           data : {id:id},
           success  : function(response) {
             // jQuery("input[name=hearingtestId]:hidden").val(response);
             // document.getElementById("exampleModal").style.display = "none";
             console.log(response);
             // if(response.status == true){
             //
             //
             // }

             $('#nameedit').val(response[0].name);
             $('#rolledit').val(response[0].roll);
             $('#departmentedit').val(response[0].dept_id);
             var selectedValues = new Array();


       $.each(response[0].studentcourse, function(i,e){
           selectedValues[i] = e.course_id;
          });
        //console.log(selectedValues);

             $.each($("#coursesedit"), function(){
                  $(this).select2('val', selectedValues);
               });

            //    selectedValues.forEach(function(e){
            // if(!$("#coursesedit").find('option:contains(' + e + ')').length)
            //   $("#coursesedit").append($('<option>').text(e));
            //     });
           }
         });
});
$("#save").on('click',function(){

console.log($("#imgInp").val());

var name= $("#name").val();
var roll= $("#roll").val();
var dept= $("#department").val();
var courses= $("#courses").val();



$.ajax({
         url  : baseurl+'student/store',
         type : 'get',
         data : {name:name,roll:roll,dept:dept,courses:courses},
         success  : function(response) {
           // jQuery("input[name=hearingtestId]:hidden").val(response);
           // document.getElementById("exampleModal").style.display = "none";
           console.log(response);
           if(response.status == true){
             $('#exampleModal').modal('hide');

           }

         }
       });
});


$("#saveedit").on('click',function(){

console.log($("#imgInp").val());

var name= $("#nameedit").val();
var roll= $("#rolledit").val();
var dept= $("#departmentedit").val();
var courses= $("#coursesedit").val();

// setTimeout(function(){
//   var id = $('#idedit').val();
//  }, 3000);

 // console.log(id);
 var id = $('#idedit').val();
//console.log(id);
$.ajax({
         url  : baseurl+'student/storeedit',
         type : 'get',
         data : {id:id,name:name,roll:roll,dept:dept,courses:courses},
         success  : function(response) {
           // jQuery("input[name=hearingtestId]:hidden").val(response);
           // document.getElementById("exampleModal").style.display = "none";
           // console.log(response);
           if(response.status == true){
             $('#editModal').modal('hide');

           }

         }
       });
});
// $("#delete").on('click',function(){
//
// console.log($("#imgInp").val());
//
// var name= $("#nameedit").val();
// var roll= $("#rolledit").val();
// var dept= $("#departmentedit").val();
// var courses= $("#coursesedit").val();
//
// // setTimeout(function(){
// //   var id = $('#idedit').val();
// //  }, 3000);
//
//  // console.log(id);
//  var id = $('#idedit').val();
// //console.log(id);
// $.ajax({
//          url  : baseurl+'student/storeedit',
//          type : 'get',
//          data : {id:id,name:name,roll:roll,dept:dept,courses:courses},
//          success  : function(response) {
//            // jQuery("input[name=hearingtestId]:hidden").val(response);
//            // document.getElementById("exampleModal").style.display = "none";
//            // console.log(response);
//            if(response.status == true){
//              $('#editModal').modal('hide');
//
//            }
//
//          }
//        });
// });

} );
