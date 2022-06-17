<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'phone',
        'email'
    ];

    public function note()
    {
        return $this->hasMany(App\Models\Note::class);
    }

    public function image()
    {
        return $this->image(App\Models\Image::class);
    }

    public function offer()
    {
        return $this->hasMany(App\Models\Offer::class);
    }

    public function quotation()
    {
        return $this->hasMany(App\Models\Quotation::class);
    }
}
