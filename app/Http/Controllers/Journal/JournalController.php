<?php

namespace App\Http\Controllers\Journal;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreJournalRequest;
use App\Http\Requests\UpdateJournalRequest;
use App\Models\Journal;
use App\Services\JournalService;
use Inertia\Inertia;
use Inertia\Response;

class JournalController extends Controller
{
    public function __construct(protected JournalService $journalService){}

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $data = $this->journalService->getJournalData();

        return Inertia::render('journal/list', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJournalRequest $request)
    {
        $validated = $request->validated();

        $result = $this->journalService->journalStore($validated);

        if(!$result['success']) {
            return back()->with('message', $result['message']);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJournalRequest $request, Journal $journal)
    {
        $validated = $request->validated();

        $result = $this->journalService->journalUpdate($validated, $journal->id);

        if(!$result['success']) {
            return back()->with('message', $result['message']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Journal $journal)
    {
        $this->journalService->journalDestroy($journal->id);
    }
}
