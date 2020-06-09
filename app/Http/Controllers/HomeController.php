<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Students;
use App\Departments;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $result=Students::with('department','studentcourse','studentcourse.course')->get();
        $departments = Departments::get();
        // dd($result);exit;
        return view('home',compact('result','departments'));
    }

    public function save(Request $request){

      // dd($request->all());exit;
      $validator = Validator::make($request->all(), [
            'name' => 'required',
            'roll' => 'required',
            'dept' => 'required',
            'course' => 'required',
            'image' => 'required'


        ]);
        if ($validator->fails()) {
            return response(['status' => false, 'error' => $validator->messages()->first()]);
        }

        try{


            $student = new Students();
            $student->name = $request->name;
            $student->roll = $request->roll;
            $student->dept_id = $request->dept;
            // $student->course = $request->course;
            $student->image = $request->image;
            $student->save();





            return response(['status' => true]);
        }catch (\Exception $e) {
            $bug = $e->getMessage();
            return response(['status' => false, 'error' => $bug]);
        }
      // $image = $request->file('image');
      // // $new_name = rand() . '.' . $image->getClientOriginalExtension();
      // $image->move(public_path('images'), $image);


    }
}
