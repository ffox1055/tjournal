<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JournalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('journals')->insert([
            [
                'token_name' => 'BTC/USDT',
                'trading_date' => '2024-02-25',
                'trade_duration' => 5,
                'risk_reward_ratio' => 2.5,
                'status' => 'win',
                'reason' => 'Breakout confirmation at resistance',
                'image_path' => 'images/trades/btc_trade1.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'token_name' => 'ETH/USDT',
                'trading_date' => '2024-02-24',
                'trade_duration' => 3,
                'risk_reward_ratio' => 1.8,
                'status' => 'lose',
                'reason' => 'Reversal signal misinterpretation',
                'image_path' => 'images/trades/eth_trade1.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'token_name' => 'SOL/USDT',
                'trading_date' => '2024-02-23',
                'trade_duration' => 6,
                'risk_reward_ratio' => 3.2,
                'status' => 'win',
                'reason' => 'Support bounce with high volume',
                'image_path' => 'images/trades/sol_trade1.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
