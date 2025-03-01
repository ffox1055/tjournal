<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreJournalRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'token_name' => ['required', 'string'],
            'trading_date' => ['required', 'date'],
            'trade_duration' => ['required', 'integer', 'min:0'],
            'risk_reward_ratio' => ['required', 'numeric', 'min:0'],
            'reason' => ['required', 'string'],
            'image_path' => ['required', 'string', 'max:255'],
        ];
    }
}
