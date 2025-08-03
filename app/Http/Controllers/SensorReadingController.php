<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSensorReadingRequest;
use App\Models\SensorReading;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SensorReadingController extends Controller
{
    /**
     * Display the IoT monitoring dashboard.
     */
    public function index()
    {
        $user = auth()->user();
        
        // Get latest readings for real-time display
        $latestReadings = $user->sensorReadings()
            ->latest()
            ->limit(10)
            ->get();

        // Get readings for the last 24 hours for chart
        $chartData = $user->sensorReadings()
            ->where('created_at', '>=', now()->subDay())
            ->orderBy('created_at')
            ->get()
            ->map(function ($reading) {
                /** @var SensorReading $reading */
                return [
                    'timestamp' => $reading->created_at->format('H:i'),
                    'temperature' => (float) $reading->temperature,
                    'humidity' => (float) $reading->humidity,
                    'water_level' => (float) $reading->water_level,
                ];
            });

        // Get all readings for raw data table with pagination
        $allReadings = $user->sensorReadings()
            ->latest()
            ->paginate(20);

        // Get current sensor values (most recent reading)
        $currentReading = $user->sensorReadings()->latest()->first();

        return Inertia::render('iot-dashboard', [
            'latestReadings' => $latestReadings,
            'chartData' => $chartData,
            'allReadings' => $allReadings,
            'currentReading' => $currentReading,
        ]);
    }

    /**
     * Store a new sensor reading (typically called by IoT devices).
     */
    public function store(StoreSensorReadingRequest $request)
    {
        /** @var SensorReading $reading */
        $reading = auth()->user()->sensorReadings()->create($request->validated());

        // Check for temperature threshold alerts
        $this->checkTemperatureThresholds($reading);

        return response()->json([
            'success' => true,
            'message' => 'Sensor reading stored successfully',
            'data' => $reading
        ], 201);
    }

    /**
     * Get raw sensor data for the data table.
     */
    public function show(Request $request)
    {
        $user = auth()->user();
        
        $readings = $user->sensorReadings()
            ->when($request->search, function ($query, $search) {
                $query->where('device_id', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(50);

        return Inertia::render('sensor-data', [
            'readings' => $readings,
            'search' => $request->search,
        ]);
    }

    /**
     * Check temperature thresholds and send notifications if needed.
     *
     * @param \App\Models\SensorReading $reading
     * @return void
     */
    protected function checkTemperatureThresholds(SensorReading $reading): void
    {
        $settings = $reading->user->notificationSetting;
        
        if (!$settings || !$settings->email_notifications) {
            return;
        }

        $temperature = $reading->temperature;
        
        if ($temperature < $settings->temp_min_threshold || $temperature > $settings->temp_max_threshold) {
            // Here you would typically queue an email notification
            // For now, we'll just log it
            \Log::info("Temperature alert for user {$reading->user->email}: {$temperature}°C");
        }
    }
}