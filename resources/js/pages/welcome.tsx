import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        } | null;
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    return (
        <>
            <Head title="IoT Monitoring System" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* Header */}
                <header className="relative overflow-hidden bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between py-6">
                            <div className="flex items-center">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                    <span className="text-xl font-bold text-white">🌡️</span>
                                </div>
                                <div className="ml-4">
                                    <h1 className="text-xl font-bold text-gray-900">IoT Monitor</h1>
                                </div>
                            </div>
                            <nav className="flex space-x-4">
                                {auth.user ? (
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm text-gray-700">Welcome, {auth.user.name}</span>
                                        <Link
                                            href="/dashboard"
                                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                                        >
                                            Dashboard
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="flex space-x-4">
                                        <Link
                                            href="/login"
                                            className="text-sm font-medium text-gray-700 hover:text-gray-900"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <main>
                    <div className="relative">
                        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                            <div className="text-center">
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                                    🌡️ IoT Monitoring System
                                </h1>
                                <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
                                    Monitor your sensors in real-time. Track temperature, humidity, and water levels with intelligent alerts and comprehensive analytics.
                                </p>
                            </div>

                            {/* Feature Cards */}
                            <div className="mt-16">
                                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                    {/* Real-time Monitoring */}
                                    <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:shadow-md">
                                        <div className="flex items-center">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                                                <span className="text-xl">📊</span>
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-lg font-medium text-gray-900">Real-time Data</h3>
                                                <p className="text-sm text-gray-500">Live sensor readings updated automatically</p>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <div className="h-20 w-full rounded bg-gradient-to-r from-green-200 to-blue-200 flex items-center justify-center">
                                                <span className="text-sm font-medium text-gray-700">Live Dashboard Preview</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Historical Charts */}
                                    <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:shadow-md">
                                        <div className="flex items-center">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                                <span className="text-xl">📈</span>
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-lg font-medium text-gray-900">Trend Analysis</h3>
                                                <p className="text-sm text-gray-500">Interactive charts and historical data</p>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <div className="h-20 w-full rounded bg-gradient-to-r from-blue-200 to-purple-200 flex items-center justify-center">
                                                <span className="text-sm font-medium text-gray-700">Charts & Analytics</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Smart Alerts */}
                                    <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:shadow-md">
                                        <div className="flex items-center">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
                                                <span className="text-xl">🚨</span>
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-lg font-medium text-gray-900">Smart Alerts</h3>
                                                <p className="text-sm text-gray-500">Email notifications for threshold breaches</p>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <div className="h-20 w-full rounded bg-gradient-to-r from-yellow-200 to-red-200 flex items-center justify-center">
                                                <span className="text-sm font-medium text-gray-700">Alert Configuration</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Key Features List */}
                            <div className="mt-16">
                                <div className="mx-auto max-w-3xl">
                                    <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Key Features</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex items-start">
                                            <span className="text-2xl mr-3">🌡️</span>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">Temperature Monitoring</h3>
                                                <p className="text-sm text-gray-600">Precise temperature readings with customizable alert thresholds</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <span className="text-2xl mr-3">💧</span>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">Humidity & Water Level</h3>
                                                <p className="text-sm text-gray-600">Track humidity percentage and water level measurements</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <span className="text-2xl mr-3">📱</span>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">Multi-Device Support</h3>
                                                <p className="text-sm text-gray-600">Monitor multiple IoT devices from a single dashboard</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <span className="text-2xl mr-3">📧</span>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">Email Notifications</h3>
                                                <p className="text-sm text-gray-600">Instant alerts when sensor values exceed your limits</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Section */}
                            <div className="mt-16 text-center">
                                {auth.user ? (
                                    <div className="space-y-4">
                                        <p className="text-lg text-gray-600">Ready to monitor your IoT devices?</p>
                                        <div className="flex justify-center space-x-4">
                                            <Link href="/iot">
                                                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                                                    View Dashboard 📊
                                                </Button>
                                            </Link>
                                            <Link href="/notifications">
                                                <Button variant="outline" size="lg">
                                                    Configure Alerts ⚙️
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <p className="text-lg text-gray-600">Get started with IoT monitoring today!</p>
                                        <div className="flex justify-center space-x-4">
                                            <Link href="/register">
                                                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                                                    Get Started Free 🚀
                                                </Button>
                                            </Link>
                                            <Link href="/login">
                                                <Button variant="outline" size="lg">
                                                    Sign In
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <p className="text-sm text-gray-500">
                                © 2024 IoT Monitoring System. Built for reliable sensor monitoring and smart alerts.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}