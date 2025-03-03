<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserSigninRequest;
use App\Http\Requests\UserSignupRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function signup(UserSignupRequest $request): JsonResponse {
        return DB::transaction(function() use ($request): JsonResponse {
            $user = User::create([
                'id' => Str::uuid(),
                'name' => $request->get('name'),
                'email' => $request->get('email'),
                'password' => Hash::make($request->get('password')),
            ]);

            $token = JWTAuth::fromUser($user);

            return $this->created(user: $user, token: $token);
        });
    }

    public function signin(UserSigninRequest $request): JsonResponse {
        $credentials = $request->only('email','password');
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return $this->unauthorized(message: "Incorrect email or password");
            }

            $user = Auth::user();
            $userModel = User::where('id', $user->id)->first();

            $token = JWTAuth::claims([
                'user' => $user,
                'permissions' => $userModel->getAllPermissions()->pluck('name'),
                'roles' => $userModel->getRoleNames(),
            ])->fromUser($user);

            return $this->success(
                user: $user,
                permissions: $userModel->getAllPermissions()->pluck('name'),
                roles: $userModel->getRoleNames(),
                token: $token,
            );
        } catch (JWTException $e) {
            return $this->serverError(error: $e->getMessage());
        }
    }

    public function me(): JsonResponse {
        try {
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return $this->unauthorized();
            }

            $userModel = User::where('id', $user->id)->first();

            return $this->success(
                user: $user,
                permissions: $userModel->getAllPermissions()->pluck('name'),
                roles: $userModel->getRoleNames(),
            );

        } catch (JWTException $e) {
            return $this->serverError(error: $e->getMessage());
        }
    }

    public function refresh(): JsonResponse {
        try {
            $user = JWTAuth::parseToken()->authenticate();

            return $this->success(message: "You do not need to refresh your token yet!");
        } catch (Exception $e) {
            if ($e instanceof TokenInvalidException) {
                return $this->unauthorized(message: "Invalid Token");
            } else if ($e instanceof TokenExpiredException) {
                try {
                    $refreshed = JWTAuth::refresh(JWTAuth::getToken());
                    $user = JWTAuth::setToken($refreshed)->toUser();
                    $userModel = User::where('id', $user->id)->first();

                    return $this->success(
                        user: $user,
                        permissions: $userModel->getAllPermissions()->pluck('name'),
                        roles: $userModel->getRoleNames(),
                        token: $refreshed,
                    );
                } catch (JWTException $e) {
                    return $this->unauthorized(message: "Token cannot be refreshed, please Signin again");
                }
            } else {
                return $this->unauthorized(message: "Token not found");
            }
        }
    }

    public function signout(): JsonResponse {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());

            return $this->success(message: "Signed out successfully");
        } catch (JWTException $e) {
            return $this->serverError(error: $e->getMessage());
        }
    }
}
