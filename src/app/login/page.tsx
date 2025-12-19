"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/layout";
import { Button, Input, useToast } from "@/components/ui";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const { success } = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate login
        await new Promise((resolve) => setTimeout(resolve, 1000));

        success("Login berhasil! Selamat datang kembali.");
        router.push("/dashboard");
    };

    return (
        <AuthLayout
            title="Selamat Datang!"
            subtitle="Masuk ke akun SakuLokal Anda"
        >
            <form onSubmit={handleSubmit} className="space-y-5">
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
                        placeholder="Masukkan password"
                        icon={<Lock className="w-4 h-4" />}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-[38px] text-surface-400 hover:text-surface-600"
                    >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-surface-300" />
                        <span className="text-surface-600">Ingat saya</span>
                    </label>
                    <Link href="/forgot-password" className="text-primary-600 hover:text-primary-700 font-medium">
                        Lupa password?
                    </Link>
                </div>

                <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                    Masuk
                </Button>

                <p className="text-center text-surface-600 text-sm">
                    Belum punya akun?{" "}
                    <Link href="/register" className="text-primary-600 hover:text-primary-700 font-medium">
                        Daftar di sini
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}
