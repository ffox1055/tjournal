<?php

namespace App\Repositories;

use App\Models\Journal;
use App\Repositories\Contracts\JournalRepositoryInterface;

class JournalRepository implements JournalRepositoryInterface
{
    public function getAllJournals() 
    {
        return Journal::latest()->get();
    }
}