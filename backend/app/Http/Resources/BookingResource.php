<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'phone' => $this->phone,
            'email' => $this->email,
            'service' => new ServiceResource($this->whenLoaded('service')),
            'date' => $this->date?->format('Y-m-d'),
            'time' => $this->time,
            'location_text' => $this->location_text,
            'location_lat' => $this->location_lat ? (float) $this->location_lat : null,
            'location_lng' => $this->location_lng ? (float) $this->location_lng : null,
            'status' => $this->status,
            'notes' => $this->notes,
            'attachments' => $this->attachments,
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
        ];
    }
}
