<?php

use App\Http\Controllers\AuthController;
use App\Http\Middleware\JwtMiddleware;
use Illuminate\Support\Facades\Route;

Route::post("signup", [AuthController::class, "signup"]);
Route::post("signin", [AuthController::class, "signin"]);
Route::get("refresh", [AuthController::class, "refresh"]);

Route::middleware([JwtMiddleware::class])->group(function(): void {
    Route::get("", [AuthController::class, "index"]);
    Route::get("me", [AuthController::class, "me"]);
    Route::post("signout", [AuthController::class,"signout"]);
});
