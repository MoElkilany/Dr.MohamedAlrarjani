<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAvailabilityRequest;
use App\Http\Resources\AvailabilityResource;
use App\Models\Availability;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AvailabilityController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Availability::query()->orderBy('date');

        if ($request->has('month') && $request->has('year')) {
            $query->whereMonth('date', $request->month)
                  ->whereYear('date', $request->year);
        } elseif ($request->has('month')) {
            $query->whereMonth('date', $request->month);
        }

        $availabilities = $query->get();

        return response()->json(AvailabilityResource::collection($availabilities));
    }

    public function show(string $date): JsonResponse
    {
        $availability = Availability::whereDate('date', $date)->first();

        if (!$availability) {
            return response()->json([
                'message' => 'لا توجد أوقات متاحة لهذا التاريخ',
                'data' => null,
            ], 200);
        }

        return response()->json(new AvailabilityResource($availability));
    }

    public function store(StoreAvailabilityRequest $request): JsonResponse
    {
        $availability = Availability::updateOrCreate(
            ['date' => $request->date],
            ['available_times' => $request->available_times]
        );

        return response()->json(new AvailabilityResource($availability), 201);
    }

    public function destroy(int $id): JsonResponse
    {
        $availability = Availability::findOrFail($id);
        $availability->delete();

        return response()->json(['message' => 'تم حذف المواعيد المتاحة بنجاح']);
    }
}
