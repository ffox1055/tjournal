<?php

namespace App\Providers;

use App\Repositories\Contracts\JournalRepositoryInterface;
use App\Repositories\JournalRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(JournalRepositoryInterface::class, JournalRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
