<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Students extends Model
{



    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'students';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'roll', 'image', 'dept_id', 'created_at', 'updated_at'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['created_at', 'updated_at'];

    public function department()
    {
        return $this->belongsTo('App\Departments','dept_id');
    }
    public function studentcourse()
    {
        return $this->hasMany('App\StudentCourses','student_id');
    }
}
