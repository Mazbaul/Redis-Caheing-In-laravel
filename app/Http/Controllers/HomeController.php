<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Redis;

use App\Students;
use App\Departments;
use App\Courses;
use App\StudentCourses;

use \Cache;


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
    public function index(Request $request)
    {
        $departments = Departments::get();
        $courses = Courses::get();

        $page = $request->has('page') ? $request->query('page') : 1;

        $result = Cache::remember('students_'. $page, 600, function() use($page){
            return Students::with('department','studentcourse','studentcourse.course')
                   ->paginate(10);
        });


        return view('home',compact('result','departments','courses'));
    }

    public function getbyId(Request $request){
     // dd($request->all());exit;
     return Students::where('id',$request->id)->with('department','studentcourse')
            ->get();
    }
    public function save(Request $request){

      // dd($request->all());exit;
      $validator = Validator::make($request->all(), [
            'name' => 'required',
            'roll' => 'required',
            'dept' => 'required',
            'courses' => 'required'
            // 'image' => 'required'


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
            $student->image = '';
            $student->save();

            foreach ($request->courses as $course) {
              $studentCourses = new StudentCourses();
              $studentCourses->student_id = $student->id;
              $studentCourses->course_id = $course;
              $studentCourses->save();
            }

            $page = $request->has('page') ? $request->query('page') : 1;


            Cache::flush();


            Cache::remember('students_'.$page, 600, function() use($page){
                return Students::with('department','studentcourse','studentcourse.course')
                       ->paginate(10)
                       ->setPath(route('home'));
            });

            return response(['status' => true]);
        }catch (\Exception $e) {
            $bug = $e->getMessage();
            return response(['status' => false, 'error' => $bug]);
        }
      // $image = $request->file('image');
      // // $new_name = rand() . '.' . $image->getClientOriginalExtension();
      // $image->move(public_path('images'), $image);


    }

    public function saveedit(Request $request){

      // dd($request->all());exit;
      $validator = Validator::make($request->all(), [
            'name' => 'required',
            'roll' => 'required',
            'dept' => 'required',
            'courses' => 'required',
            'id' =>'required'
            // 'image' => 'required'


        ]);

        // dd($request->all());exit;
        if ($validator->fails()) {
            return response(['status' => false, 'error' => $validator->messages()->first()]);
        }

        try{


            $student = Students::where('id',$request->id)
                ->update([
                  'name' => $request->name,
                  'roll' => $request->roll,
                  'dept_id' => $request->dept,
                  'image' => ''
                ]);
            // $student->name = $request->name;
            // $student->roll = $request->roll;
            // $student->dept_id = $request->dept;
            // // $student->course = $request->course;
            // $student->image = '';
            // $student->save();

            // dd($student);exit;
            $stdcrs = StudentCourses::where('student_id',$request->id)->delete();

            foreach ($request->courses as $course) {
              $studentCourses = new StudentCourses();
              $studentCourses->student_id = $request->id;
              $studentCourses->course_id = $course;
              $studentCourses->save();
            }

            $page = $request->has('page') ? $request->query('page') : 1;


            Cache::flush();


            Cache::remember('students_'.$page, 600, function() use($page){
                return Students::with('department','studentcourse','studentcourse.course')
                       ->paginate(10)
                       ->setPath(route('home'));
            });

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
