<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Complaint;
use Illuminate\Support\Facades\Validator;


class ComplaintController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = auth('api')->user();

        if ($user->role === "Admin") {
            $all = Complaint::select('id', 'title', 'status', 'urgent', 'description')->paginate(10);
            return $all;
        } else if ($user->role === "Customer") {
            $myComplaint = Complaint::select('id', 'title', 'status', 'urgent', 'description')
                ->where('user_id', $user->id)
                ->paginate(10);
            return $myComplaint;
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $user = auth('api')->user();

        Validator::make($request->all(), [
            'title' =>    'required',
            'description' =>    'required',
            'urgent' => 'required',
        ])->validate();

        if ($request->get('urgent') == 1) {
            $role = 'yes';
        } else {
            $role = 'no';
        }

        $newComplaint = [
            'user_id' => $user->id,
            'title' => $request['title'],
            'description' => $request['description'],
            'urgent' => $request['urgent'],
            'status' => "1",
        ];


        $addedComplaint =  Complaint::create($newComplaint);

        return response()->json([
            'message' => 'Done',
            'data' => $addedComplaint
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Complaint $complaint)
    {
        $comp = Complaint::where('id', '=', $complaint->id)->get();
        return $comp;
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Complaint $complaint)
    {
        $user = auth('api')->user();

        Validator::make($request->all(), [
            'title' =>    'required',
            'description' =>    'required',
            'urgent' => 'required',
            'status' => 'required',
        ])->validate();

        if (auth('api')->user()->id == $complaint->user_id) {
            $complaint->update(['title' => $request->title, 'description' => $request->description, 'urgent' => $request->urgent, 'status' => $request->status]);
            return response()->json([
                'message' => 'Done',
                'data' => $complaint
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Complaint $complaint)
    {
        $complaint->delete();
        return response()->json([
            'message' => 'Done',
            'data' => $complaint
        ]);
    }
}
