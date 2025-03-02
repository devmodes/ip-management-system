<?php

use App\Http\Controllers\UsersController;
use App\Http\Middleware\JwtMiddleware;
use Illuminate\Support\Facades\Route;

Route::post("signup", [UsersController::class, "signup"]);
Route::post("signin", [UsersController::class, "signin"]);

Route::get("refresh", [UsersController::class, "refresh"]);

Route::middleware([JwtMiddleware::class])->group(function(): void {
    Route::get("", [UsersController::class, "index"]);
    Route::get("me", [UsersController::class, "me"]);
    Route::post("signout", [UsersController::class,"signout"]);
});
