<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\NotificationSetting
 *
 * @property int $id
 * @property int $user_id
 * @property bool $email_notifications
 * @property float $temp_min_threshold
 * @property float $temp_max_threshold
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|NotificationSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|NotificationSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|NotificationSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|NotificationSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NotificationSetting whereEmailNotifications($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NotificationSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NotificationSetting whereTempMaxThreshold($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NotificationSetting whereTempMinThreshold($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NotificationSetting whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NotificationSetting whereUserId($value)
 * @method static \Database\Factories\NotificationSettingFactory factory($count = null, $state = [])
 * @method static NotificationSetting create(array $attributes = [])
 * 
 * @mixin \Eloquent
 */
class NotificationSetting extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'email_notifications',
        'temp_min_threshold',
        'temp_max_threshold',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_notifications' => 'boolean',
        'temp_min_threshold' => 'decimal:2',
        'temp_max_threshold' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the notification setting.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}