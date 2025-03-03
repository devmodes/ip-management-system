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

            return response()->json([
                'user' => $user,
                'token' => $token,
            ], 201);
        });
    }

    public function signin(UserSigninRequest $request) {
        $credentials = $request->only('email','password');
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'message' => 'Invalid Credentials',
                ], 401);
            }

            $user = Auth::user();
            $userModel = User::where('id', $user->id)->first();

            $token = JWTAuth::claims([
                'user' => $userModel,
                'permissions' => $userModel->getAllPermissions()->pluck('name'),
                'roles' => $userModel->getRoleNames(),
            ])->fromUser($user);

            return response()->json([
                'user' => $userModel,
                'permissions' => $userModel->getAllPermissions()->pluck('name'),
                'roles' => $userModel->getRoleNames(),
                'token' => $token,
            ], 200);
        } catch (JWTException $e) {
            return response()->json([
                'message' => 'Invalid Credentials',
                'error' => $e->getMessage(),
            ], 401);
        }
    }

    public function me() {
        try {
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json([
                    'message' => 'Unauthorized',
                    'error' => null,
                ], 401);
            }

            $userModel = User::where('id', $user->id)->first();

            return response()->json([
                'user' => $user,
                'permissions' => $userModel->getAllPermissions()->pluck('name'),
                'roles' => $userModel->getRoleNames(),
            ], 200);
        } catch (JWTException $e) {
            return response()->json([
                'message' => 'Unauthorized',
                'error' => $e->getMessage(),
            ], 401);
        }
    }

    public function refresh() {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (Exception $e) {
            if ($e instanceof TokenInvalidException){
                $status     = 401;
                $message    = 'This token is invalid. Please Login';
                return response()->json(compact('status','message'),401);
            } else if ($e instanceof TokenExpiredException) {
                // If the token is expired, then it will be refreshed and added to the headers
                try {
                    $refreshed = JWTAuth::refresh(JWTAuth::getToken());
                    $user = JWTAuth::setToken($refreshed)->toUser();
                    $userModel = User::where('id', $user->id)->first();

                    return response()->json([
                        'user' => $user,
                        'permissions' => $userModel->getAllPermissions()->pluck('name'),
                        'roles' => $userModel->getRoleNames(),
                        'token' => $refreshed,
                    ], 200);
                } catch (JWTException $e) {
                    return response()->json([
                        'code'   => 401,
                        'message' => 'Token cannot be refreshed, please Login again'
                    ]);
                }
            }else{
                $message = 'Authorization Token not found';
                return response()->json(compact('message'), 401);
            }
        }
    }

    public function index(VerificationRequest $request) {
        try {
            $user = User::where('id', Auth::user()->id)->first();

            if ($request->get('type') === 'permission' && !$user->hasPermissionTo($request->get('key'))) {
                return response()->json([
                    'message' => 'Unauthorized',
                    'error' => null,
                ], 401);
            }

            if ($request->get('type') === 'role' && !$user->hasRole($request->get('key'))) {
                return response()->json([
                    'message' => 'Unauthorized',
                    'error' => null,
                ], 401);
            }

            return response()->json([
                'user' => $user,
                'permissions' => $user->getAllPermissions()->pluck('name'),
                'roles' => $user->getRoleNames(),
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Unauthorized',
                'error' => $e->getMessage(),
            ], 401);
        }
    }

    public function signout() {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());

            return response()->json([
                'message' => 'Successfully logged out!',
            ], 200);
        } catch (JWTException $e) {
            return response()->json([
                'message' => 'Unauthorized',
                'error' => $e->getMessage(),
            ], 401);
        }
    }
}
