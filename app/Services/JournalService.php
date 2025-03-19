<?php

namespace App\Services;

use App\Repositories\Contracts\JournalRepositoryInterface;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

class JournalService
{
    public function __construct(protected JournalRepositoryInterface $journalRepository) {}

    public function getJournalData(): array
    {
        return ['journals' => $this->journalRepository->getAllJournals()];
    }

    public function journalStore(array $validated): array
    {
        return $this->handleTransaction(operation: function () use ($validated): void {
            if (isset($validated['image'])) {
                $validated['image'] = $this->journalRepository->uploadImage(img: $validated['image']);
            }

            $this->journalRepository->createJournal(data: $validated);
        });
    }

    public function journalUpdate(array $validated, int $id): array
    {
        return $this->handleTransaction(operation: function () use ($validated, $id): void {
            $journal = $this->journalRepository->findJournal(id: $id);

            // Check if a new image was uploaded
            if (isset($validated['image']) && $validated['image'] instanceof UploadedFile) {
                $this->replaceImage(oldImage: $journal['image'], validated: $validated);
            }

            $this->journalRepository->updateJournal(data: $validated, id: $id);
        });
    }

    public function journalDestroy(int $id): array
    {
        $this->journalRepository->deleteJournal($id);

        return [
            'success' => true,
            'message' => null
        ];
    }

    /**
     * Handles database transactions and error handling.
     */
    private function handleTransaction(callable $operation): array
    {
        try {
            DB::transaction(callback: $operation);
            return ['success' => true, 'message' => null];
        } catch (\Throwable $th) {
            return ['success' => false, 'message' => $th->getMessage()];
        }
    }

    /**
     * Handles replacing an existing image with a new one.
     */
    private function replaceImage(?string $oldImage, array &$validated): void
    {
        if ($oldImage) {
            $this->journalRepository->deleteImage(img: $oldImage);
        }

        $validated['image'] = $this->journalRepository->uploadImage(img: $validated['image']);
    }
}
