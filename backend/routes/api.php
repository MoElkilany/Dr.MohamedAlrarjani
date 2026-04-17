<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AvailabilityController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ServiceController;

// Public routes
Route::post('/login', [AuthController::class, 'login']);

// Availability (public read)
Route::get('/availability', [AvailabilityController::class, 'index']);
Route::get('/availability/{date}', [AvailabilityController::class, 'show']);

// Bookings (public create)
Route::post('/bookings', [BookingController::class, 'store']);

// Reviews (public read + create)
Route::get('/reviews', [ReviewController::class, 'publicIndex']);
Route::post('/reviews', [ReviewController::class, 'store']);

// Services (public read)
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{id}', [ServiceController::class, 'show']);

// Authenticated admin routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Admin-only routes
    Route::middleware('admin')->group(function () {
        // Availability management
        Route::post('/availability', [AvailabilityController::class, 'store']);
        Route::delete('/availability/{id}', [AvailabilityController::class, 'destroy']);

        // Bookings management
        Route::get('/bookings', [BookingController::class, 'index']);
        Route::get('/bookings/{id}', [BookingController::class, 'show']);
        Route::patch('/bookings/{id}/status', [BookingController::class, 'updateStatus']);

        // Reviews management
        Route::get('/admin/reviews', [ReviewController::class, 'adminIndex']);
        Route::patch('/reviews/{id}/approve', [ReviewController::class, 'approve']);
        Route::delete('/reviews/{id}', [ReviewController::class, 'destroy']);

        // Services management
        Route::post('/services', [ServiceController::class, 'store']);
        Route::put('/services/{id}', [ServiceController::class, 'update']);
        Route::patch('/services/{id}', [ServiceController::class, 'update']);
        Route::delete('/services/{id}', [ServiceController::class, 'destroy']);

        // Dashboard
        Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
    });
});