<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\JwtMiddleware;
use App\Http\Controllers\AuthController;

Route::controller(controller: AuthController::class)->group(callback: function(): void {
    Route::post(uri: "signup", action: "signup");
    Route::post(uri: "signin", action: "signin");
    Route::get(uri: "refresh", action: "refresh");
    Route::get(uri: "me", action: "me")->middleware(middleware: JwtMiddleware::class);
    Route::post(uri: "signout", action: "signout")->middleware(middleware: JwtMiddleware::class);
});
