import React from 'react';
import { Head } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SensorReading {
    id: number;
    temperature: number;
    humidity: number;
    water_level: number;
    device_id: string;
    created_at: string;
}

interface ChartDataPoint {
    timestamp: string;
    temperature: number;
    humidity: number;
    water_level: number;
}

interface PaginationLinks {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
}

interface Props {
    latestReadings: SensorReading[];
    chartData: ChartDataPoint[];
    allReadings: {
        data: SensorReading[];
        links: PaginationLinks[];
        meta: PaginationMeta;
    };
    currentReading: SensorReading | null;
    [key: string]: unknown;
}

export default function IoTDashboard({ latestReadings, chartData, currentReading }: Props) {
    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('id-ID');
    };

    const getTemperatureStatus = (temp: number) => {
        if (temp < 0) return { status: 'Sangat Dingin', color: 'bg-blue-500', emoji: '🥶' };
        if (temp < 20) return { status: 'Dingin', color: 'bg-blue-400', emoji: '❄️' };
        if (temp < 25) return { status: 'Sejuk', color: 'bg-green-500', emoji: '😊' };
        if (temp < 30) return { status: 'Hangat', color: 'bg-yellow-500', emoji: '☀️' };
        if (temp < 35) return { status: 'Panas', color: 'bg-orange-500', emoji: '🔥' };
        return { status: 'Sangat Panas', color: 'bg-red-500', emoji: '🌡️' };
    };

    const getHumidityStatus = (humidity: number) => {
        if (humidity < 30) return { status: 'Kering', color: 'bg-red-400', emoji: '🏜️' };
        if (humidity < 60) return { status: 'Normal', color: 'bg-green-500', emoji: '✅' };
        return { status: 'Lembab', color: 'bg-blue-500', emoji: '💧' };
    };

    const getWaterLevelStatus = (level: number) => {
        if (level < 10) return { status: 'Rendah', color: 'bg-red-500', emoji: '⚠️' };
        if (level < 50) return { status: 'Sedang', color: 'bg-yellow-500', emoji: '📊' };
        return { status: 'Tinggi', color: 'bg-blue-500', emoji: '🌊' };
    };

    return (
        <>
            <Head title="Dashboard IoT Monitoring" />
            <AppShell>
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">🌡️ Dashboard IoT Monitoring</h1>
                            <p className="text-gray-600">Pantau sensor suhu, kelembaban, dan level air secara real-time</p>
                        </div>
                        <div className="flex space-x-2">
                            <Button variant="outline" onClick={() => window.location.reload()}>
                                🔄 Refresh Data
                            </Button>
                        </div>
                    </div>

                    {/* Current Reading Cards */}
                    {currentReading && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Temperature Card */}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Suhu Saat Ini</CardTitle>
                                    <span className="text-2xl">🌡️</span>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{currentReading.temperature}°C</div>
                                    <div className="flex items-center mt-2">
                                        <Badge className={`${getTemperatureStatus(currentReading.temperature).color} text-white`}>
                                            {getTemperatureStatus(currentReading.temperature).emoji} {getTemperatureStatus(currentReading.temperature).status}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        Terakhir diperbarui: {formatDateTime(currentReading.created_at)}
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Humidity Card */}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Kelembaban</CardTitle>
                                    <span className="text-2xl">💧</span>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{currentReading.humidity}%</div>
                                    <div className="flex items-center mt-2">
                                        <Badge className={`${getHumidityStatus(currentReading.humidity).color} text-white`}>
                                            {getHumidityStatus(currentReading.humidity).emoji} {getHumidityStatus(currentReading.humidity).status}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        Device: {currentReading.device_id}
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Water Level Card */}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Level Air</CardTitle>
                                    <span className="text-2xl">🌊</span>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{currentReading.water_level} cm</div>
                                    <div className="flex items-center mt-2">
                                        <Badge className={`${getWaterLevelStatus(currentReading.water_level).color} text-white`}>
                                            {getWaterLevelStatus(currentReading.water_level).emoji} {getWaterLevelStatus(currentReading.water_level).status}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        Tinggi dalam sentimeter
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Chart Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                📈 Grafik Tren 24 Jam Terakhir
                            </CardTitle>
                            <CardDescription>
                                Visualisasi perubahan nilai sensor dalam 24 jam terakhir
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {chartData.length > 0 ? (
                                <div className="space-y-4">
                                    {/* Simple text-based chart representation */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="p-4 bg-red-50 rounded-lg">
                                            <h4 className="font-semibold text-red-800 mb-2">🌡️ Suhu</h4>
                                            <div className="text-sm text-red-600">
                                                Min: {Math.min(...chartData.map(d => d.temperature))}°C<br/>
                                                Max: {Math.max(...chartData.map(d => d.temperature))}°C<br/>
                                                Rata-rata: {(chartData.reduce((sum, d) => sum + d.temperature, 0) / chartData.length).toFixed(1)}°C
                                            </div>
                                        </div>
                                        
                                        <div className="p-4 bg-blue-50 rounded-lg">
                                            <h4 className="font-semibold text-blue-800 mb-2">💧 Kelembaban</h4>
                                            <div className="text-sm text-blue-600">
                                                Min: {Math.min(...chartData.map(d => d.humidity))}%<br/>
                                                Max: {Math.max(...chartData.map(d => d.humidity))}%<br/>
                                                Rata-rata: {(chartData.reduce((sum, d) => sum + d.humidity, 0) / chartData.length).toFixed(1)}%
                                            </div>
                                        </div>
                                        
                                        <div className="p-4 bg-green-50 rounded-lg">
                                            <h4 className="font-semibold text-green-800 mb-2">🌊 Level Air</h4>
                                            <div className="text-sm text-green-600">
                                                Min: {Math.min(...chartData.map(d => d.water_level))} cm<br/>
                                                Max: {Math.max(...chartData.map(d => d.water_level))} cm<br/>
                                                Rata-rata: {(chartData.reduce((sum, d) => sum + d.water_level, 0) / chartData.length).toFixed(1)} cm
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <p className="text-sm text-gray-500">
                                        📊 Data dari {chartData.length} pembacaan sensor dalam 24 jam terakhir
                                    </p>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <span className="text-4xl mb-4 block">📊</span>
                                    <p className="text-gray-500">Belum ada data untuk ditampilkan</p>
                                    <p className="text-sm text-gray-400">Grafik akan muncul setelah ada pembacaan sensor</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Latest Readings Table */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                📋 Pembacaan Terbaru
                            </CardTitle>
                            <CardDescription>
                                10 pembacaan sensor terakhir dari semua perangkat
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {latestReadings.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Waktu
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Device ID
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    🌡️ Suhu
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    💧 Kelembaban
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    🌊 Level Air
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {latestReadings.map((reading) => (
                                                <tr key={reading.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {formatDateTime(reading.created_at)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {reading.device_id}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        <div className="flex items-center gap-2">
                                                            <span>{reading.temperature}°C</span>
                                                            <span>{getTemperatureStatus(reading.temperature).emoji}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        <div className="flex items-center gap-2">
                                                            <span>{reading.humidity}%</span>
                                                            <span>{getHumidityStatus(reading.humidity).emoji}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        <div className="flex items-center gap-2">
                                                            <span>{reading.water_level} cm</span>
                                                            <span>{getWaterLevelStatus(reading.water_level).emoji}</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <span className="text-4xl mb-4 block">📊</span>
                                    <p className="text-gray-500">Belum ada data sensor</p>
                                    <p className="text-sm text-gray-400">Data akan muncul setelah perangkat IoT mengirim pembacaan</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>⚡ Aksi Cepat</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-4">
                                <Button asChild>
                                    <a href="/sensor-data">📋 Lihat Semua Data</a>
                                </Button>
                                <Button variant="outline" asChild>
                                    <a href="/notifications">⚙️ Pengaturan Notifikasi</a>
                                </Button>
                                <Button variant="outline" onClick={() => window.location.reload()}>
                                    🔄 Refresh Dashboard
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </AppShell>
        </>
    );
}