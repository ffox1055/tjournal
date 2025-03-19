<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Journal extends Model
{
    /** @use HasFactory<\Database\Factories\JournalFactory> */
    protected $fillable = [
        'token_name',
        'risk_reward_ratio',
        'trade_duration',
        'trading_date',
        'status',
        'reason',
        'image'
    ];

    use HasFactory;
}
