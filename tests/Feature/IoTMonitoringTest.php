<?php

namespace Tests\Feature;

use App\Models\NotificationSetting;
use App\Models\SensorReading;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class IoTMonitoringTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->user = User::factory()->create();
        $this->actingAs($this->user);
    }

    public function test_can_view_iot_dashboard(): void
    {
        // Create some sensor readings
        SensorReading::factory()->count(5)->create([
            'user_id' => $this->user->id,
        ]);

        $response = $this->get('/iot');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => 
            $page->component('iot-dashboard')
                ->has('latestReadings')
                ->has('chartData')
                ->has('allReadings')
        );
    }

    public function test_can_view_sensor_data_table(): void
    {
        // Create sensor readings
        SensorReading::factory()->count(10)->create([
            'user_id' => $this->user->id,
        ]);

        $response = $this->get('/sensor-data');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => 
            $page->component('sensor-data')
                ->has('readings.data', 10)
        );
    }

    public function test_can_search_sensor_data(): void
    {
        // Create sensor readings with specific device IDs
        SensorReading::factory()->create([
            'user_id' => $this->user->id,
            'device_id' => 'sensor_test_123',
        ]);

        SensorReading::factory()->create([
            'user_id' => $this->user->id,
            'device_id' => 'sensor_other_456',
        ]);

        $response = $this->get('/sensor-data?search=test');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => 
            $page->component('sensor-data')
                ->has('readings.data', 1)
                ->where('search', 'test')
        );
    }

    public function test_can_view_notification_settings(): void
    {
        $response = $this->get('/notifications');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => 
            $page->component('notification-settings')
                ->has('settings')
        );
    }

    public function test_can_update_notification_settings(): void
    {
        $response = $this->patch('/notifications', [
            'email_notifications' => true,
            'temp_min_threshold' => 10.00,
            'temp_max_threshold' => 35.00,
        ]);

        $response->assertRedirect('/notifications');
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('notification_settings', [
            'user_id' => $this->user->id,
            'email_notifications' => true,
            'temp_min_threshold' => 10.00,
            'temp_max_threshold' => 35.00,
        ]);
    }

    public function test_notification_settings_validation(): void
    {
        $response = $this->patch('/notifications', [
            'email_notifications' => true,
            'temp_min_threshold' => 30.00,
            'temp_max_threshold' => 20.00, // Max lower than min - should fail
        ]);

        $response->assertSessionHasErrors(['temp_max_threshold']);
    }

    public function test_can_store_sensor_reading_via_api(): void
    {
        $response = $this->postJson('/api/sensor-readings', [
            'temperature' => 25.5,
            'humidity' => 60.0,
            'water_level' => 45.2,
            'device_id' => 'sensor_test_001',
        ]);

        $response->assertStatus(201);
        $response->assertJson([
            'success' => true,
            'message' => 'Sensor reading stored successfully',
        ]);

        $this->assertDatabaseHas('sensor_readings', [
            'user_id' => $this->user->id,
            'temperature' => 25.5,
            'humidity' => 60.0,
            'water_level' => 45.2,
            'device_id' => 'sensor_test_001',
        ]);
    }

    public function test_sensor_reading_validation(): void
    {
        $response = $this->postJson('/api/sensor-readings', [
            'temperature' => 'invalid',
            'humidity' => 150, // Over 100%
            'water_level' => -10, // Negative value
            'device_id' => '',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors([
            'temperature',
            'humidity',
            'water_level',
            'device_id',
        ]);
    }

    public function test_users_can_only_see_their_own_data(): void
    {
        $otherUser = User::factory()->create();

        // Create readings for both users
        SensorReading::factory()->create([
            'user_id' => $this->user->id,
            'device_id' => 'my_sensor',
        ]);

        SensorReading::factory()->create([
            'user_id' => $otherUser->id,
            'device_id' => 'other_sensor',
        ]);

        $response = $this->get('/iot');

        $response->assertInertia(fn (Assert $page) => 
            $page->has('latestReadings', 1)
                ->where('latestReadings.0.device_id', 'my_sensor')
        );
    }

    public function test_dashboard_shows_current_reading(): void
    {
        // Create multiple readings, latest should be shown as current
        SensorReading::factory()->create([
            'user_id' => $this->user->id,
            'temperature' => 20.0,
            'created_at' => now()->subHours(2),
        ]);

        $latestReading = SensorReading::factory()->create([
            'user_id' => $this->user->id,
            'temperature' => 25.5,
            'created_at' => now()->subMinutes(5),
        ]);

        $response = $this->get('/iot');

        $response->assertInertia(fn (Assert $page) => 
            $page->where('currentReading.temperature', '25.50')
                ->where('currentReading.id', $latestReading->id)
        );
    }
}