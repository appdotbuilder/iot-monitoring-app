<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateNotificationSettingRequest;
use App\Models\NotificationSetting;
use Inertia\Inertia;

class NotificationSettingController extends Controller
{
    /**
     * Display the notification settings form.
     */
    public function index()
    {
        $user = auth()->user();
        
        $settings = $user->notificationSetting ?? new NotificationSetting([
            'email_notifications' => true,
            'temp_min_threshold' => 0.00,
            'temp_max_threshold' => 35.00,
        ]);

        return Inertia::render('notification-settings', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update the notification settings.
     */
    public function update(UpdateNotificationSettingRequest $request)
    {
        $user = auth()->user();
        
        $user->notificationSetting()->updateOrCreate(
            ['user_id' => $user->id],
            $request->validated()
        );

        return redirect()->route('notifications.index')
            ->with('success', 'Notification settings updated successfully.');
    }
}