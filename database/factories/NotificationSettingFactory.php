<?php

namespace Database\Factories;

use App\Models\NotificationSetting;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\NotificationSetting>
 */
class NotificationSettingFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\NotificationSetting>
     */
    protected $model = NotificationSetting::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'email_notifications' => $this->faker->boolean(80), // 80% chance of being true
            'temp_min_threshold' => $this->faker->randomFloat(2, 0, 15), // 0°C to 15°C
            'temp_max_threshold' => $this->faker->randomFloat(2, 30, 40), // 30°C to 40°C
        ];
    }

    /**
     * Create settings with notifications disabled.
     *
     * @return static
     */
    public function notificationsDisabled(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'email_notifications' => false,
            ];
        });
    }

    /**
     * Create settings with tight temperature range.
     *
     * @return static
     */
    public function tightRange(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'temp_min_threshold' => 20.00,
                'temp_max_threshold' => 25.00,
            ];
        });
    }

    /**
     * Create settings with wide temperature range.
     *
     * @return static
     */
    public function wideRange(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'temp_min_threshold' => 5.00,
                'temp_max_threshold' => 40.00,
            ];
        });
    }
}