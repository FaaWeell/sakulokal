"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/layout";
import { Button, Input, useToast } from "@/components/ui";
import { Mail, Lock, Eye, EyeOff, User, Store } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();
    const { success } = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        storeName: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate registration
        await new Promise((resolve) => setTimeout(resolve, 1500));

        success("Pendaftaran berhasil! Silakan masuk.");
        router.push("/login");
    };

    return (
        <AuthLayout
            title="Daftar Akun"
            subtitle="Mulai kelola toko Anda dengan SakuLokal"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Nama Lengkap"
                    placeholder="Nama Anda"
                    icon={<User className="w-4 h-4" />}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />

                <Input
                    label="Nama Toko"
                    placeholder="Toko Makmur"
                    icon={<Store className="w-4 h-4" />}
                    value={formData.storeName}
                    onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                    required
                />

                <Input
                    label="Email"
                    type="email"
                    placeholder="email@contoh.com"
                    icon={<Mail className="w-4 h-4" />}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />

                <div className="relative">
                    <Input
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Minimal 8 karakter"
                        icon={<Lock className="w-4 h-4" />}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        minLength={8}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-[38px] text-surface-400 hover:text-surface-600"
                    >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>

                <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                    Daftar Sekarang
                </Button>

                <p className="text-center text-surface-600 text-sm">
                    Sudah punya akun?{" "}
                    <Link href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                        Masuk di sini
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}
