<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Journal>
 */
class JournalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'token_name' => $this->faker->randomElement(['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'ADA/USDT', 'XRP/USDT']),
            'trading_date' => $this->faker->dateTimeBetween('-1 year', 'now')->format('Y-m-d'),
            'trade_duration' => $this->faker->numberBetween(1, 10), // in minutes
            'risk_reward_ratio' => $this->faker->randomFloat(2, 1.0, 5.0), // RR between 1.0 and 5.0
            'status' => $this->faker->randomElement(['win', 'loss', 'be']),
            'reason' => $this->faker->sentence(6), // Generates a short reason
            'image' => 'images/trades/' . Str::uuid() . '.png',
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
