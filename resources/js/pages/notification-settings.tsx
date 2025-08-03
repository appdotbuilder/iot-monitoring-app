import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import InputError from '@/components/input-error';

interface NotificationSetting {
    id?: number;
    email_notifications: boolean;
    temp_min_threshold: number;
    temp_max_threshold: number;
}

interface Props {
    settings: NotificationSetting;
    [key: string]: unknown;
}

export default function NotificationSettings({ settings }: Props) {
    const { data, setData, patch, processing, errors, recentlySuccessful } = useForm({
        email_notifications: settings.email_notifications,
        temp_min_threshold: settings.temp_min_threshold.toString(),
        temp_max_threshold: settings.temp_max_threshold.toString(),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch('/notifications');
    };

    return (
        <>
            <Head title="Pengaturan Notifikasi - IoT Monitoring" />
            <AppShell>
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">⚙️ Pengaturan Notifikasi</h1>
                            <p className="text-gray-600">Konfigurasikan alert email untuk ambang batas suhu sensor</p>
                        </div>
                        <Button asChild variant="outline">
                            <a href="/iot">← Kembali ke Dashboard</a>
                        </Button>
                    </div>

                    {/* Success Alert */}
                    {recentlySuccessful && (
                        <Alert className="border-green-200 bg-green-50">
                            <AlertDescription className="text-green-800">
                                ✅ Pengaturan notifikasi berhasil disimpan!
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Settings Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                📧 Konfigurasi Email Alert
                            </CardTitle>
                            <CardDescription>
                                Atur kapan Anda ingin menerima notifikasi email untuk pembacaan suhu
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Email Notifications Toggle */}
                                <div className="flex items-center justify-between space-x-2">
                                    <div className="space-y-0.5">
                                        <Label className="text-base font-medium">
                                            📬 Aktifkan Notifikasi Email
                                        </Label>
                                        <p className="text-sm text-gray-600">
                                            Terima email ketika suhu melewati ambang batas yang ditentukan
                                        </p>
                                    </div>
                                    <Switch
                                        checked={data.email_notifications}
                                        onCheckedChange={(checked: boolean) => setData('email_notifications', checked)}
                                    />
                                </div>

                                {/* Temperature Thresholds */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Minimum Temperature */}
                                    <div className="space-y-2">
                                        <Label htmlFor="temp_min_threshold" className="flex items-center gap-2">
                                            🥶 Suhu Minimum (°C)
                                        </Label>
                                        <Input
                                            id="temp_min_threshold"
                                            type="number"
                                            step="0.01"
                                            min="-100"
                                            max="200"
                                            value={data.temp_min_threshold}
                                            onChange={(e) => setData('temp_min_threshold', e.target.value)}
                                            placeholder="Contoh: 0.00"
                                            disabled={!data.email_notifications}
                                        />
                                        <InputError message={errors.temp_min_threshold} />
                                        <p className="text-xs text-gray-500">
                                            Alert akan dikirim jika suhu di bawah nilai ini
                                        </p>
                                    </div>

                                    {/* Maximum Temperature */}
                                    <div className="space-y-2">
                                        <Label htmlFor="temp_max_threshold" className="flex items-center gap-2">
                                            🔥 Suhu Maksimum (°C)
                                        </Label>
                                        <Input
                                            id="temp_max_threshold"
                                            type="number"
                                            step="0.01"
                                            min="-100"
                                            max="200"
                                            value={data.temp_max_threshold}
                                            onChange={(e) => setData('temp_max_threshold', e.target.value)}
                                            placeholder="Contoh: 35.00"
                                            disabled={!data.email_notifications}
                                        />
                                        <InputError message={errors.temp_max_threshold} />
                                        <p className="text-xs text-gray-500">
                                            Alert akan dikirim jika suhu di atas nilai ini
                                        </p>
                                    </div>
                                </div>

                                {/* Current Range Display */}
                                {data.email_notifications && data.temp_min_threshold && data.temp_max_threshold && (
                                    <Alert>
                                        <AlertDescription>
                                            🌡️ <strong>Range Suhu Normal:</strong> {data.temp_min_threshold}°C sampai {data.temp_max_threshold}°C
                                            <br />
                                            📧 Anda akan menerima email jika suhu berada di luar range ini.
                                        </AlertDescription>
                                    </Alert>
                                )}

                                {/* Submit Button */}
                                <Button type="submit" disabled={processing} className="w-full">
                                    {processing ? '⏳ Menyimpan...' : '💾 Simpan Pengaturan'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* How It Works */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                ❓ Cara Kerja Notifikasi
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">📊</span>
                                    <div>
                                        <h4 className="font-semibold">Monitoring Otomatis</h4>
                                        <p className="text-sm text-gray-600">
                                            Sistem akan memantau setiap pembacaan suhu dari sensor IoT Anda
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">🚨</span>
                                    <div>
                                        <h4 className="font-semibold">Deteksi Otomatis</h4>
                                        <p className="text-sm text-gray-600">
                                            Ketika suhu melewati batas minimum atau maksimum, sistem akan mendeteksi pelanggaran
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">📧</span>
                                    <div>
                                        <h4 className="font-semibold">Email Instant</h4>
                                        <p className="text-sm text-gray-600">
                                            Email alert akan dikirim ke alamat email akun Anda dengan detail pembacaan
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">📱</span>
                                    <div>
                                        <h4 className="font-semibold">Dashboard Real-time</h4>
                                        <p className="text-sm text-gray-600">
                                            Lihat status terbaru dan history alert di dashboard monitoring
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Example Scenarios */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                💡 Contoh Skenario Penggunaan
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-4 bg-blue-50 rounded-lg">
                                    <h4 className="font-semibold text-blue-800 mb-2">🏠 Monitoring Rumah</h4>
                                    <p className="text-sm text-blue-600">
                                        <strong>Min:</strong> 18°C, <strong>Max:</strong> 28°C<br/>
                                        Ideal untuk memantau suhu ruangan agar tetap nyaman
                                    </p>
                                </div>
                                
                                <div className="p-4 bg-green-50 rounded-lg">
                                    <h4 className="font-semibold text-green-800 mb-2">🌱 Greenhouse</h4>
                                    <p className="text-sm text-green-600">
                                        <strong>Min:</strong> 20°C, <strong>Max:</strong> 35°C<br/>
                                        Menjaga kondisi optimal untuk pertumbuhan tanaman
                                    </p>
                                </div>
                                
                                <div className="p-4 bg-orange-50 rounded-lg">
                                    <h4 className="font-semibold text-orange-800 mb-2">❄️ Cold Storage</h4>
                                    <p className="text-sm text-orange-600">
                                        <strong>Min:</strong> 2°C, <strong>Max:</strong> 8°C<br/>
                                        Memastikan penyimpanan makanan tetap aman
                                    </p>
                                </div>
                                
                                <div className="p-4 bg-red-50 rounded-lg">
                                    <h4 className="font-semibold text-red-800 mb-2">🏭 Server Room</h4>
                                    <p className="text-sm text-red-600">
                                        <strong>Min:</strong> 18°C, <strong>Max:</strong> 24°C<br/>
                                        Mencegah overheating peralatan server
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </AppShell>
        </>
    );
}