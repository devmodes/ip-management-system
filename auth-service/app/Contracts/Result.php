<?php

namespace App\Contracts;

class Result
{
    public function unauthorized(...$args) {
        return response()->json([
            "message" => "You don't have permission to perform this action",
            ...[...$args],
        ], 401);
    }

    public function badRequest(...$args){
        return response()->json([
            "message" => "Bad Request",
            ...[...$args],
        ], 400);
    }

    public function unproccessable(...$args){
        return response()->json([
            "message" => "Sorry we couldn't process your transaction",
            ...[...$args],
        ], 500);
    }

    public function serverError(...$args){
        return response()->json([
            "message" => "Something went wrong!",
            ...[...$args],
        ], 500);
    }

    public function success(...$args){
        return response()->json([
            "message" => "Request Success",
            ...[...$args],
        ], 200);
    }

    public function created(...$args){
        return response()->json([
            "message" => "Created successfully",
            ...[...$args],
        ], 500);
    }
}
