<?php

use App\Http\Controllers\NotificationSettingController;
use App\Http\Controllers\SensorReadingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // IoT Monitoring routes
    Route::get('/iot', [SensorReadingController::class, 'index'])->name('iot.index');
    Route::get('/sensor-data', [SensorReadingController::class, 'show'])->name('sensor-data.index');
    
    // Notification settings
    Route::get('/notifications', [NotificationSettingController::class, 'index'])->name('notifications.index');
    Route::patch('/notifications', [NotificationSettingController::class, 'update'])->name('notifications.update');
});

// API routes for IoT devices (simplified for demo)
Route::middleware(['auth'])->group(function () {
    Route::post('/api/sensor-readings', [SensorReadingController::class, 'store'])->name('sensor-readings.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
