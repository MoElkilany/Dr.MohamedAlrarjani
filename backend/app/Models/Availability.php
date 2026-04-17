<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['date', 'available_times'])]
class Availability extends Model
{
    protected function casts(): array
    {
        return [
            'date' => 'date',
            'available_times' => 'array',
        ];
    }
}
