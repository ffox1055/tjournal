<?php

namespace App\Http\Requests;

use App\Enums\TradeStatus;
use App\Rules\ImageOrString;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateJournalRequest extends FormRequest
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
            'token_name' => 'required|string',
            'trading_date' => 'required|date',
            'trade_duration' => 'nullable|integer|min:0',
            'risk_reward_ratio' => 'nullable|numeric|min:0',
            'reason' => 'required|string',
            'status' => ['required', Rule::enum(type: TradeStatus::class)],
            'image' => [
                'required',
                new ImageOrString(),
                Rule::when(
                    condition: request()->hasFile(key: 'image'),
                    rules: ['mimes:jpeg,png,jpg', 'max:2048']
                )],
        ];
    }
}
