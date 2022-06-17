<?php

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('customers', 'App\Http\Controllers\CustomerController');
Route::apiResource('notes', 'App\Http\Controllers\NoteController');
Route::apiResource('images', 'App\Http\Controllers\ImageController');
Route::apiResource('offers', 'App\Http\Controllers\OfferController');
Route::apiResource('quotations', 'App\Http\Controllers\QuotationController');