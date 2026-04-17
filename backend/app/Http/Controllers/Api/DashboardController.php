<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function stats(Request $request): JsonResponse
    {
        return response()->json([
            'total_bookings' => Booking::count(),
            'pending_bookings' => Booking::where('status', 'pending')->count(),
            'confirmed_bookings' => Booking::where('status', 'confirmed')->count(),
            'cancelled_bookings' => Booking::where('status', 'cancelled')->count(),
            'total_reviews' => Review::count(),
            'approved_reviews' => Review::where('approved', true)->count(),
            'pending_reviews' => Review::where('approved', false)->count(),
            'recent_bookings' => Booking::with('service')
                ->orderBy('created_at', 'desc')
                ->take(10)
                ->get(),
        ]);
    }
}
