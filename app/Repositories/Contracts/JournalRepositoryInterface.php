<?php

namespace App\Repositories\Contracts;


interface JournalRepositoryInterface
{
    public function createJournal(array $data);

    public function updateJournal(array $data,int $id);

    public function findJournal(int $id);

    public function getAllJournals();

    public function uploadImage(string $img);

    public function deleteImage(string $img);

    public function deleteJournal(int $id);
}
