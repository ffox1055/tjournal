<?php

namespace App\Repositories;

use App\Models\Journal;
use App\Repositories\Contracts\JournalRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Storage;

class JournalRepository implements JournalRepositoryInterface
{
    public function __construct(protected Journal $model){}

    public function createJournal(array $data): Journal
    {
        return $this->model->create(attributes: $data);
    }

    public function updateJournal(array $data, int $id): Journal
    {
        $journal = $this->findJournal($id);
        $journal->update(attributes: $data);

        return $journal;
    }

    public function findJournal($id): Collection | Journal
    {
        return $this->model->findOrFail($id);
    }

    public function getAllJournals(): Collection
    {
        return $this->model->orderBy('trading_date', 'desc')->latest()->get();
    }

    public function uploadImage($img): mixed
    {
        return $img->store('trades', 'public');
    }

    public function deleteImage($img): bool
    {
        return Storage::disk('public')->delete(paths: $img);
    }

    public function deleteJournal($id): mixed
    {
        $journal = $this->findJournal(id: $id);

        if ($journal['image'] && $journal['image'] instanceof UploadedFile) {
            $this->deleteImage($journal['image']);
        }

        return $journal->delete();
    }
}
