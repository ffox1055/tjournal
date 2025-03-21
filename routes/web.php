<?php

use App\Http\Controllers\Journal\JournalController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // dashboard
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // journal
    Route::resource('journal', JournalController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
