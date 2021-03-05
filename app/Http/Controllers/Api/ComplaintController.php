<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Complaint;
use Illuminate\Support\Facades\Validator;


class ComplaintController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Complaint::class, 'complaint');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = auth('api')->user();

        dd($user);
        if ($user->role == "Admin") {
            $all = Complaint::select('id', 'name', 'status')->paginate(10);
            return $all;
        } else if ($user->role == "Customer") {
            $myComplaint = Complaint::select('id', 'name', 'status')
                ->where('user_id', $user->id)
                ->paginate(10);
            return $myComplaint;
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
        dd($user);
        dd($request);

        Validator::make($request->all(), [
            'title' =>    'required',
            'description' =>    'required',
            'urgent' => 'required',
            // 'status' => 'required',
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
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        Validator::make($request->all(), [
            'title' =>    'required',
            'description' =>    'required',
            'urgent' => 'required',
            'status' => 'required',
        ])->validate();

        $complaint->update(['title' => $request->title, 'description' => $request->description, 'urgent' => $request->urgent, 'status' => $request->status]);

        return response()->json([
            'message' => 'Done',
            'data' => $complaint
        ]);
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
