<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sensor_readings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('temperature', 5, 2)->comment('Temperature in Celsius');
            $table->decimal('humidity', 5, 2)->comment('Humidity percentage');
            $table->decimal('water_level', 8, 2)->comment('Water level in cm');
            $table->string('device_id')->comment('IoT device identifier');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('user_id');
            $table->index('device_id');
            $table->index('created_at');
            $table->index(['user_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sensor_readings');
    }
};