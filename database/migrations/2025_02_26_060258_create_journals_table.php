<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('journals', function (Blueprint $table) {
            $table->id();

            $table->string('token_name')->unique();
            // $table->string('token_name');
            $table->date('trading_date')->nullable();
            $table->integer('trade_duration')->nullable(); // Store duration in hours
            $table->decimal('risk_reward_ratio', 5, 2)->nullable(); // Example format: 2.5
            $table->enum('status', ['win', 'lose', 'breakevent'])->nullable();
            $table->text('reason')->nullable();
            $table->string('image')->nullable(); // Store image path if uploaded

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('journals');
    }
};
