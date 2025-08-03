<?php

namespace Database\Factories;

use App\Models\SensorReading;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SensorReading>
 */
class SensorReadingFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\SensorReading>
     */
    protected $model = SensorReading::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'temperature' => $this->faker->randomFloat(2, -10, 45), // -10°C to 45°C
            'humidity' => $this->faker->randomFloat(2, 20, 90), // 20% to 90%
            'water_level' => $this->faker->randomFloat(2, 0, 100), // 0cm to 100cm
            'device_id' => 'sensor_' . $this->faker->unique()->numberBetween(1000, 9999),
            'created_at' => $this->faker->dateTimeBetween('-7 days', 'now'),
        ];
    }

    /**
     * Create readings for a specific time range.
     *
     * @param string $startDate
     * @param string $endDate
     * @return static
     */
    public function inTimeRange(string $startDate, string $endDate): static
    {
        return $this->state(function (array $attributes) use ($startDate, $endDate) {
            return [
                'created_at' => $this->faker->dateTimeBetween($startDate, $endDate),
            ];
        });
    }

    /**
     * Create readings with extreme temperature values.
     *
     * @return static
     */
    public function extremeTemperature(): static
    {
        return $this->state(function (array $attributes) {
            $isHot = $this->faker->boolean();
            return [
                'temperature' => $isHot 
                    ? $this->faker->randomFloat(2, 40, 60) // Hot: 40°C to 60°C
                    : $this->faker->randomFloat(2, -20, -5), // Cold: -20°C to -5°C
            ];
        });
    }

    /**
     * Create readings with normal temperature range.
     *
     * @return static
     */
    public function normalTemperature(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'temperature' => $this->faker->randomFloat(2, 18, 28), // 18°C to 28°C
            ];
        });
    }
}