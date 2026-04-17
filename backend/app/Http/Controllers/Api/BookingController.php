<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookingRequest;
use App\Http\Resources\BookingResource;
use App\Models\Availability;
use App\Models\Booking;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function store(StoreBookingRequest $request): JsonResponse
    {
        $date = $request->date;
        $time = $request->time;
        $serviceId = $request->service_id;

        $availability = Availability::whereDate('date', $date)->first();

        if ($availability) {
            $availableTimes = $availability->available_times;

            if (!in_array($time, $availableTimes)) {
                return response()->json([
                    'message' => 'هذا الموعد غير متاح للحجز',
                ], 409);
            }

            $existingBooking = Booking::where('date', $date)
                ->where('time', $time)
                ->where('service_id', $serviceId)
                ->whereIn('status', ['pending', 'confirmed'])
                ->exists();

            if ($existingBooking) {
                return response()->json([
                    'message' => 'هذا الموعد محجوز بالفعل',
                ], 409);
            }

            $availableTimes = array_values(array_diff($availableTimes, [$time]));
            $availability->update(['available_times' => $availableTimes]);
        }

        $booking = Booking::create($request->validated());

        return response()->json(new BookingResource($booking->load('service')), 201);
    }

    public function index(Request $request): JsonResponse
    {
        $query = Booking::with('service')->orderBy('created_at', 'desc');

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $bookings = $query->paginate(15);

        return response()->json($bookings);
    }

    public function show(int $id): JsonResponse
    {
        $booking = Booking::with('service')->findOrFail($id);

        return response()->json(new BookingResource($booking));
    }

    public function updateStatus(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled',
        ]);

        $booking = Booking::findOrFail($id);
        $booking->update(['status' => $request->status]);

        if ($request->status === 'cancelled' && $booking->date && $booking->time) {
            $availability = Availability::whereDate('date', $booking->date)->first();
            if ($availability) {
                $times = $availability->available_times;
                $times[] = $booking->time;
                sort($times);
                $availability->update(['available_times' => array_values($times)]);
            }
        }

        return response()->json(new BookingResource($booking->load('service')));
    }
}
