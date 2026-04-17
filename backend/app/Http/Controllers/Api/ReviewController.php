<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReviewRequest;
use App\Http\Resources\ReviewResource;
use App\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(StoreReviewRequest $request): JsonResponse
    {
        $review = Review::create($request->validated());

        return response()->json(new ReviewResource($review), 201);
    }

    public function publicIndex(Request $request): JsonResponse
    {
        $reviews = Review::approved()
            ->orderBy('created_at', 'desc')
            ->paginate(12);

        return response()->json($reviews);
    }

    public function adminIndex(Request $request): JsonResponse
    {
        $query = Review::orderBy('created_at', 'desc');

        if ($request->has('approved') && $request->approved !== null) {
            $query->where('approved', filter_var($request->approved, FILTER_VALIDATE_BOOLEAN));
        }

        $reviews = $query->paginate(15);

        return response()->json($reviews);
    }

    public function approve(int $id): JsonResponse
    {
        $review = Review::findOrFail($id);
        $review->update(['approved' => true]);

        return response()->json(new ReviewResource($review));
    }

    public function destroy(int $id): JsonResponse
    {
        $review = Review::findOrFail($id);
        $review->delete();

        return response()->json(['message' => 'تم حذف التقييم بنجاح']);
    }
}
