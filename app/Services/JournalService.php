<?php

namespace App\Services;

use App\Repositories\Contracts\JournalRepositoryInterface;
use Illuminate\Support\Facades\DB;

class JournalService
{

    public function __construct(protected JournalRepositoryInterface $journalRepository) {}

    public function getJournalData()
    {
        $journals = $this->journalRepository->getAllJournals();

        return compact('journals');
    }

    public function journalStore(array $validated)
    {
        try {
            $success = false;

            DB::transaction(function () use ($validated, &$success) {

                if(isset($validated['image'])) {
                    $imgPath = $this->journalRepository->uploadImage($validated['image']);
                    $validated['image'] = $imgPath;
                }

                $this->journalRepository->createJournal(data: $validated);

                // if ($res) {
                //     if (isset($validated['image']) && !empty($validated['image'])) {
                //         $this->journalRepository->uploadImage($validated['image']);
                //     }
                // }

                $success = true;
            });

            return [
                'success' => $success,
                'message' => null,
            ];
        } catch (\Throwable $th) {
            return [
                'success' => false,
                'message' => $th->getMessage(),
            ];
        }
    }

    public function journalDestroy($id)
    {
        $this->journalRepository->deleteJournal($id);

        return [
            'success' => true,
            'message' => null
        ];
    }
}
