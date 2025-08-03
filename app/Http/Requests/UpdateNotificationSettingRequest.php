<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateNotificationSettingRequest extends FormRequest
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
            'email_notifications' => 'required|boolean',
            'temp_min_threshold' => 'required|numeric|between:-100,200',
            'temp_max_threshold' => 'required|numeric|between:-100,200|gt:temp_min_threshold',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'email_notifications.required' => 'Email notification preference is required.',
            'temp_min_threshold.required' => 'Minimum temperature threshold is required.',
            'temp_min_threshold.between' => 'Minimum temperature must be between -100°C and 200°C.',
            'temp_max_threshold.required' => 'Maximum temperature threshold is required.',
            'temp_max_threshold.between' => 'Maximum temperature must be between -100°C and 200°C.',
            'temp_max_threshold.gt' => 'Maximum temperature must be greater than minimum temperature.',
        ];
    }
}