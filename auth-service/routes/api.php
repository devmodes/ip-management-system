<?php

use App\Http\Controllers\AuthController;
use App\Http\Middleware\JwtMiddleware;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function() {
    Route::post("signup", "signup");
    Route::post("signin", "signin");
    Route::get("refresh", "refresh");

    Route::middelware([JwtMiddleware::class])->group(function() {
        Route::get("me", "me");
        Route::post("signout", "signout");
    });
});
