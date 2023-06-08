<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::get('/', [UserController::class, 'index']);
Route::get('/user', [UserController::class, 'user'])->middleware('auth:sanctum');


// Route::group with cors 
Route::group(['middleware' => 'jwt.auth'], function () {
});

Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'register']);



Route::middleware(['web', 'auth:sanctum'])->get('/sanctum/csrf-cookie', function (Request $request) {
    return response()->json(['message' => 'CSRF cookie set']);
});
