<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\SensorReading
 *
 * @property int $id
 * @property int $user_id
 * @property float $temperature
 * @property float $humidity
 * @property float $water_level
 * @property string $device_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|SensorReading newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SensorReading newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SensorReading query()
 * @method static \Illuminate\Database\Eloquent\Builder|SensorReading whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SensorReading whereDeviceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SensorReading whereHumidity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SensorReading whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SensorReading whereTemperature($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SensorReading whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SensorReading whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SensorReading whereWaterLevel($value)
 * @method static \Database\Factories\SensorReadingFactory factory($count = null, $state = [])
 * @method static SensorReading create(array $attributes = [])
 * 
 * @mixin \Eloquent
 */
class SensorReading extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'temperature',
        'humidity',
        'water_level',
        'device_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'temperature' => 'decimal:2',
        'humidity' => 'decimal:2',
        'water_level' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the sensor reading.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}