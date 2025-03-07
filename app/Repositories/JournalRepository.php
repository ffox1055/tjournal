<?php

namespace App\Repositories;

use App\Models\Journal;
use App\Repositories\Contracts\JournalRepositoryInterface;

class JournalRepository implements JournalRepositoryInterface
{
    public function createJournal(array $data)
    {
        return Journal::create($data);
    }

    public function getAllJournals()
    {
        return Journal::latest()->get();
    }

    public function uploadImage($img)
    {
        return $img->store('trades', 'public');
    }

    public function deleteJournal($id)
    {
        $journal = Journal::findOrFail($id);

        return $journal->delete();
    }
}
