<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;



class RegisterController extends Controller
{
    public function register(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email', 'max:255', 'unique:users'],
            'name' => 'required',
            'password' => 'nullable',
            'role' => 'required',

        ])->validate();

        if ($request->get('role') == 1) {
            $role = 'Admin';
        } else {
            $role = 'Customer';
        }


        //STORE IN DB
        $params = [
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
            'role' => $role,
        ];

        $user = User::create($params);

        $token = JWTAuth::fromUser($user);

        if (!$token) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'role' => $user['role']

        ]);
    }
}
