<?php

namespace App\Repositories\Contracts;


interface JournalRepositoryInterface
{
    public function createJournal(array $data);

    public function getAllJournals();

    public function uploadImage($img);
}
