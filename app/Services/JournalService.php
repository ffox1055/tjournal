<?php

namespace App\Services;

use App\Repositories\Contracts\JournalRepositoryInterface;

class JournalService
{
    protected $journalRepository;

    public function __construct(
        JournalRepositoryInterface $journalRepository
    ) {
        $this->journalRepository = $journalRepository;
    }

    public function getJournalData()
    {
        $journals = $this->journalRepository->getAllJournals();

        return compact('journals');
    }
}
