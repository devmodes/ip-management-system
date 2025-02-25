<?php

use App\Http\Controllers\UsersController;
use App\Http\Middleware\JwtMiddleware;
use Illuminate\Support\Facades\Route;

Route::post("signup", [UsersController::class, "signup"]);
Route::post("signin", [UsersController::class, "signin"]);

Route::middleware([JwtMiddleware::class])->group(function() {
    Route::get("verify-permission", [UsersController::class,"verify_permission"]);
    Route::get("verify-role", [UsersController::class,"verify_role"]);
    Route::get("me", [UsersController::class, "me"]);
    Route::post("signout", [UsersController::class,"signout"]);
});
