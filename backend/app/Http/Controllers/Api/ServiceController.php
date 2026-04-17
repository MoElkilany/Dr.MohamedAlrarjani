<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ServiceResource;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index(): JsonResponse
    {
        $services = Service::active()->get();

        return response()->json(ServiceResource::collection($services));
    }

    public function show(int $id): JsonResponse
    {
        $service = Service::findOrFail($id);

        return response()->json(new ServiceResource($service));
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'name_ar' => 'required|string|max:255',
            'description' => 'nullable|string',
            'description_ar' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'duration' => 'nullable|string|max:50',
            'icon' => 'nullable|string|max:10',
            'type' => 'required|string|in:in-person,online,phone',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $service = Service::create($validated);

        return response()->json(new ServiceResource($service), 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $service = Service::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'name_ar' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'description_ar' => 'nullable|string',
            'price' => 'sometimes|numeric|min:0',
            'duration' => 'nullable|string|max:50',
            'icon' => 'nullable|string|max:10',
            'type' => 'sometimes|string|in:in-person,online,phone',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $service->update($validated);

        return response()->json(new ServiceResource($service));
    }

    public function destroy(int $id): JsonResponse
    {
        $service = Service::findOrFail($id);
        $service->delete();

        return response()->json(['message' => 'تم حذف الخدمة بنجاح']);
    }
}
