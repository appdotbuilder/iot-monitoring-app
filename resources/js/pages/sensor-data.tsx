import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
    readings: {
        data: SensorReading[];
        links: PaginationLinks[];
        meta: PaginationMeta;
    };
    search: string;
    [key: string]: unknown;
}

export default function SensorData({ readings, search }: Props) {
    const [searchTerm, setSearchTerm] = useState(search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/sensor-data', { search: searchTerm }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('id-ID');
    };

    const getTemperatureColor = (temp: number) => {
        if (temp < 0) return 'text-blue-600';
        if (temp < 20) return 'text-blue-500';
        if (temp < 25) return 'text-green-500';
        if (temp < 30) return 'text-yellow-600';
        if (temp < 35) return 'text-orange-500';
        return 'text-red-600';
    };

    const getHumidityColor = (humidity: number) => {
        if (humidity < 30) return 'text-red-500';
        if (humidity < 60) return 'text-green-500';
        return 'text-blue-500';
    };

    const getWaterLevelColor = (level: number) => {
        if (level < 10) return 'text-red-500';
        if (level < 50) return 'text-yellow-500';
        return 'text-blue-500';
    };

    return (
        <>
            <Head title="Data Sensor - IoT Monitoring" />
            <AppShell>
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">📋 Data Sensor Mentah</h1>
                            <p className="text-gray-600">Tabel lengkap semua pembacaan sensor dengan fitur pencarian</p>
                        </div>
                        <Button asChild variant="outline">
                            <a href="/iot">← Kembali ke Dashboard</a>
                        </Button>
                    </div>

                    {/* Search */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                🔍 Pencarian Data
                            </CardTitle>
                            <CardDescription>
                                Cari berdasarkan Device ID atau filter data sensor
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSearch} className="flex gap-4">
                                <Input
                                    type="text"
                                    placeholder="Masukkan Device ID..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="flex-1"
                                />
                                <Button type="submit">
                                    🔍 Cari
                                </Button>
                                {search && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setSearchTerm('');
                                            router.get('/sensor-data');
                                        }}
                                    >
                                        ✖️ Reset
                                    </Button>
                                )}
                            </form>
                            {search && (
                                <div className="mt-4">
                                    <Badge variant="secondary">
                                        📊 Menampilkan hasil pencarian untuk: "{search}"
                                    </Badge>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Data Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-2xl font-bold">{readings.meta.total}</div>
                                <p className="text-xs text-muted-foreground">📊 Total Pembacaan</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-2xl font-bold">{readings.meta.per_page}</div>
                                <p className="text-xs text-muted-foreground">📄 Per Halaman</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-2xl font-bold">{readings.meta.current_page}</div>
                                <p className="text-xs text-muted-foreground">📍 Halaman Saat Ini</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-2xl font-bold">{readings.meta.last_page}</div>
                                <p className="text-xs text-muted-foreground">📑 Total Halaman</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Data Table */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                📊 Tabel Data Sensor
                            </CardTitle>
                            <CardDescription>
                                Data lengkap pembacaan sensor dengan timestamp dan device ID
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {readings.data.length > 0 ? (
                                <>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        ID
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Waktu
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Device ID
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        🌡️ Suhu (°C)
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        💧 Kelembaban (%)
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        🌊 Level Air (cm)
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {readings.data.map((reading) => (
                                                    <tr key={reading.id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            #{reading.id}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {formatDateTime(reading.created_at)}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                                                            📱 {reading.device_id}
                                                        </td>
                                                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${getTemperatureColor(reading.temperature)}`}>
                                                            {reading.temperature}°C
                                                        </td>
                                                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${getHumidityColor(reading.humidity)}`}>
                                                            {reading.humidity}%
                                                        </td>
                                                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${getWaterLevelColor(reading.water_level)}`}>
                                                            {reading.water_level} cm
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination */}
                                    {readings.meta.last_page > 1 && (
                                        <div className="mt-6 flex items-center justify-between">
                                            <div className="text-sm text-gray-700">
                                                Menampilkan {readings.meta.from} sampai {readings.meta.to} dari {readings.meta.total} hasil
                                            </div>
                                            <div className="flex space-x-2">
                                                {readings.links.map((link, index: number) => {
                                                    if (link.url === null) return null;
                                                    
                                                    return (
                                                        <Button
                                                            key={index}
                                                            variant={link.active ? "default" : "outline"}
                                                            size="sm"
                                                            onClick={() => link.url && router.get(link.url)}
                                                            disabled={!link.url}
                                                        >
                                                            {link.label.replace('&laquo;', '←').replace('&raquo;', '→')}
                                                        </Button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <span className="text-6xl mb-4 block">📊</span>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada data sensor</h3>
                                    {search ? (
                                        <p className="text-gray-500">
                                            Tidak ditemukan data untuk pencarian "{search}". 
                                            <button 
                                                onClick={() => {
                                                    setSearchTerm('');
                                                    router.get('/sensor-data');
                                                }}
                                                className="text-indigo-600 hover:text-indigo-500 ml-1"
                                            >
                                                Lihat semua data
                                            </button>
                                        </p>
                                    ) : (
                                        <p className="text-gray-500">Data akan muncul setelah perangkat IoT mengirim pembacaan sensor</p>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Export Options */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                📤 Opsi Export
                            </CardTitle>
                            <CardDescription>
                                Ekspor data sensor untuk analisis lebih lanjut
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-4">
                                <Button variant="outline" disabled>
                                    📊 Export CSV (Coming Soon)
                                </Button>
                                <Button variant="outline" disabled>
                                    📈 Export Excel (Coming Soon)
                                </Button>
                                <Button variant="outline" disabled>
                                    📋 Export PDF (Coming Soon)
                                </Button>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                                💡 Tip: Gunakan fitur pencarian untuk memfilter data sebelum export
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </AppShell>
        </>
    );
}