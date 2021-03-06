<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ComplaintController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::group([
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('me', [AuthController::class, 'me'])->middleware('auth:api');
    Route::post('register', [RegisterController::class, 'register']);
});

Route::post('complaint', [ComplaintController::class, 'index']);
Route::post('resolved/complaint/{complaint}', [ComplaintController::class, 'update']);
Route::post('store/complaint', [ComplaintController::class, 'store']);