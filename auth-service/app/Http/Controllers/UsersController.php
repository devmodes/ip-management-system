<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserSigninRequest;
use App\Http\Requests\UserSignupRequest;
use App\Http\Requests\VerificationRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;

class UsersController extends Controller
{
    public function signup(UserSignupRequest $request) {
        return DB::transaction(function() use ($request) {
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

    public function signin(UserSigninRequest $request) {
        $credentials = $request->only('email','password');
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return $this->unauthorized(message: "Incorrect email or password");
            }

            $user = Auth::user();
            $userModel = User::where('id', $user->id)->first();

            $token = JWTAuth::claims([
                'user' => $userModel,
                'permissions' => $userModel->getAllPermissions()->pluck('name'),
                'roles' => $userModel->getRoleNames(),
            ])->fromUser($user);

            return $this->success(
                user: $userModel,
                permissions: $userModel->getAllPermissions()->pluck('name'),
                roles: $userModel->getRoleNames(),
                token: $token,
            );
        } catch (JWTException $e) {
            return $this->serverError();
        }
    }

    public function me() {
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
            return $this->serverError();
        }
    }

    public function refresh() {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (Exception $e) {
            if ($e instanceof TokenInvalidException) {
                return $this->unauthorized(message: "Invalid Token");
            } else if ($e instanceof TokenExpiredException) {
                // If the token is expired, then it will be refreshed and added to the headers
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

    public function index(VerificationRequest $request) {
        try {
            $user = User::where('id', Auth::user()->id)->first();

            if ($request->get('type') === 'permission' && !$user->hasPermissionTo($request->get('key'))) {
                return $this->unauthorized();
            }

            if ($request->get('type') === 'role' && !$user->hasRole($request->get('key'))) {
                return $this->unauthorized();
            }

            return $this->success(
                user: $user,
                permissions: $user->getAllPermissions()->pluck('name'),
                roles: $user->getRoleNames(),
            );
        } catch (Exception $e) {
            return $this->serverError(error: $e->getMessage());
        }
    }

    public function signout() {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());

            return $this->success(message: "Signed out successfully");
        } catch (JWTException $e) {
            return $this->serverError(error: $e->getMessage());
        }
    }
}
