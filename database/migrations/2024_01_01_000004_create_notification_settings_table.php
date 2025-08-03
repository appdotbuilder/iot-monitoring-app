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
        Schema::create('notification_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->boolean('email_notifications')->default(true);
            $table->decimal('temp_min_threshold', 5, 2)->default(0.00)->comment('Minimum temperature alert threshold');
            $table->decimal('temp_max_threshold', 5, 2)->default(35.00)->comment('Maximum temperature alert threshold');
            $table->timestamps();
            
            // Indexes
            $table->unique('user_id');
            $table->index('email_notifications');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notification_settings');
    }
};