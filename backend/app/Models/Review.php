<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['name', 'rating', 'comment', 'role', 'approved'])]
class Review extends Model
{
    protected function casts(): array
    {
        return [
            'approved' => 'boolean',
        ];
    }

    public function scopeApproved($query)
    {
        return $query->where('approved', true);
    }
}
