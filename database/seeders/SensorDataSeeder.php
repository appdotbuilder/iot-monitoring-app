<?php

namespace Database\Seeders;

use App\Models\NotificationSetting;
use App\Models\SensorReading;
use App\Models\User;
use Illuminate\Database\Seeder;

class SensorDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create test users if they don't exist
        $users = User::all();
        
        if ($users->isEmpty()) {
            // Create demo users
            $users = collect([
                User::create([
                    'name' => 'Demo User',
                    'email' => 'demo@iot.com',
                    'password' => bcrypt('password'),
                    'email_verified_at' => now(),
                ]),
                User::create([
                    'name' => 'IoT Admin',
                    'email' => 'admin@iot.com',
                    'password' => bcrypt('password'),
                    'email_verified_at' => now(),
                ]),
            ]);
        }

        foreach ($users as $user) {
            // Create notification settings for each user
            NotificationSetting::create([
                'user_id' => $user->id,
                'email_notifications' => true,
                'temp_min_threshold' => 15.00,
                'temp_max_threshold' => 30.00,
            ]);

            // Create sensor readings for the last 7 days
            for ($i = 6; $i >= 0; $i--) {
                $date = now()->subDays($i);
                
                // Create multiple readings per day (every 2 hours)
                for ($hour = 0; $hour < 24; $hour += 2) {
                    $timestamp = $date->copy()->addHours($hour);
                    
                    // Create readings with some variation
                    SensorReading::create([
                        'user_id' => $user->id,
                        'temperature' => fake()->randomFloat(2, 18, 32) + ($hour < 12 ? -2 : 2), // Simulate day/night variation
                        'humidity' => fake()->randomFloat(2, 40, 80),
                        'water_level' => fake()->randomFloat(2, 10, 85),
                        'device_id' => 'sensor_' . fake()->numberBetween(1001, 1005),
                        'created_at' => $timestamp,
                        'updated_at' => $timestamp,
                    ]);
                }
            }

            // Create some extreme readings to test alerts
            SensorReading::create([
                'user_id' => $user->id,
                'temperature' => 5.0, // Below threshold
                'humidity' => 25.0,
                'water_level' => 15.0,
                'device_id' => 'sensor_1001',
                'created_at' => now()->subHours(2),
                'updated_at' => now()->subHours(2),
            ]);

            SensorReading::create([
                'user_id' => $user->id,
                'temperature' => 38.0, // Above threshold
                'humidity' => 85.0,
                'water_level' => 95.0,
                'device_id' => 'sensor_1002',
                'created_at' => now()->subHours(1),
                'updated_at' => now()->subHours(1),
            ]);
        }

        $this->command->info('Created sensor readings for ' . $users->count() . ' users');
        $this->command->info('Total sensor readings: ' . SensorReading::count());
    }
}