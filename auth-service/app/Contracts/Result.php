<?php

namespace App\Contracts;

use Illuminate\Http\JsonResponse;

class Result
{
    public function unauthorized(...$args): JsonResponse {
        return response()->json(data: [
            "message" => "You don't have permission to perform this action",
            ...[...$args],
        ], status: 401);
    }

    public function badRequest(...$args): JsonResponse {
        return response()->json(data: [
            "message" => "Bad Request",
            ...[...$args],
        ], status: 400);
    }

    public function unproccessable(...$args): JsonResponse {
        return response()->json(data: [
            "message" => "Sorry we couldn't process your transaction",
            ...[...$args],
        ], status: 500);
    }

    public function serverError(...$args): JsonResponse {
        return response()->json(data: [
            "message" => "Something went wrong!",
            ...[...$args],
        ], status: 500);
    }

    public function success(...$args): JsonResponse {
        return response()->json(data: [
            "message" => "Request Success",
            ...[...$args],
        ], status: 200);
    }

    public function created(...$args): JsonResponse {
        return response()->json([
            "message" => "Created successfully",
            ...[...$args],
        ], status: 500);
    }
}
