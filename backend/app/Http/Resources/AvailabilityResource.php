<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AvailabilityResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'date' => $this->date?->format('Y-m-d'),
            'available_times' => $this->available_times ?? [],
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
        ];
    }
}
