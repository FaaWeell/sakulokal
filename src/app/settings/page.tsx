"use client";

import { DashboardLayout } from "@/components/layout";
import { Card, Input, Button, useToast } from "@/components/ui";
import { User, Store, Bell, Palette, Lock } from "lucide-react";

export default function SettingsPage() {
    const { success } = useToast();

    const handleSave = () => {
        success("Pengaturan berhasil disimpan!");
    };

    return (
        <DashboardLayout title="Pengaturan">
            <div className="max-w-2xl space-y-6">
                {/* Profile Settings */}
                <Card>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-primary-100 rounded-lg">
                            <User className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-surface-900">Profil Pengguna</h3>
                            <p className="text-sm text-surface-500">
                                Kelola informasi akun Anda
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Input label="Nama Lengkap" defaultValue="Faawell" />
                        <Input label="Email" type="email" defaultValue="faawell@example.com" />
                    </div>
                </Card>

                {/* Store Settings */}
                <Card>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Store className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-surface-900">Informasi Toko</h3>
                            <p className="text-sm text-surface-500">
                                Pengaturan toko Anda
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Input label="Nama Toko" defaultValue="Toko Makmur" />
                        <Input label="Alamat" defaultValue="Jl. Contoh No. 123" />
                        <Input label="No. Telepon" defaultValue="08123456789" />
                    </div>
                </Card>

                {/* Notification Settings */}
                <Card>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-amber-100 rounded-lg">
                            <Bell className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-surface-900">Notifikasi</h3>
                            <p className="text-sm text-surface-500">
                                Atur preferensi notifikasi
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="flex items-center justify-between p-3 bg-surface-50 rounded-lg cursor-pointer">
                            <span className="text-surface-700">Notifikasi stok menipis</span>
                            <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary-500" />
                        </label>
                        <label className="flex items-center justify-between p-3 bg-surface-50 rounded-lg cursor-pointer">
                            <span className="text-surface-700">Ringkasan harian</span>
                            <input type="checkbox" className="w-5 h-5 accent-primary-500" />
                        </label>
                    </div>
                </Card>

                {/* Change Password */}
                <Card>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-red-100 rounded-lg">
                            <Lock className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-surface-900">Keamanan</h3>
                            <p className="text-sm text-surface-500">
                                Ubah password akun Anda
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Input label="Password Lama" type="password" />
                        <Input label="Password Baru" type="password" />
                        <Input label="Konfirmasi Password" type="password" />
                    </div>
                </Card>

                <Button onClick={handleSave} size="lg" className="w-full">
                    Simpan Pengaturan
                </Button>
            </div>
        </DashboardLayout>
    );
}
