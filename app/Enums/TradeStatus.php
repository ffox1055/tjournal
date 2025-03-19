<?php

namespace App\Enums;

enum TradeStatus: string
{
    case WIN = 'win';
    case LOSS = 'loss';
    case BE = 'be';
    case ACTIVE = 'active';
}
