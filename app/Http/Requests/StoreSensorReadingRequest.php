<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSensorReadingRequest extends FormRequest
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
            'temperature' => 'required|numeric|between:-100,200',
            'humidity' => 'required|numeric|between:0,100',
            'water_level' => 'required|numeric|min:0|max:99999.99',
            'device_id' => 'required|string|max:255',
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
            'temperature.required' => 'Temperature reading is required.',
            'temperature.between' => 'Temperature must be between -100°C and 200°C.',
            'humidity.required' => 'Humidity reading is required.',
            'humidity.between' => 'Humidity must be between 0% and 100%.',
            'water_level.required' => 'Water level reading is required.',
            'water_level.min' => 'Water level cannot be negative.',
            'device_id.required' => 'Device ID is required.',
        ];
    }
}