"use client";

import { Search, Bell, User } from "lucide-react";
import { Input } from "@/components/ui";

interface TopBarProps {
    title?: string;
}

export function TopBar({ title }: TopBarProps) {
    return (
        <header className="h-16 bg-white border-b border-surface-200 flex items-center justify-between px-6 sticky top-0 z-30">
            {/* Left: Title or Search */}
            <div className="flex items-center gap-4">
                {title && <h2 className="text-xl font-semibold text-surface-900">{title}</h2>}
                <div className="relative hidden md:block">
                    <Input
                        placeholder="Cari produk, transaksi..."
                        icon={<Search className="w-4 h-4" />}
                        className="w-80"
                    />
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
                {/* Notifications */}
                <button className="btn-icon relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* User */}
                <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-100 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="hidden md:block text-left">
                        <p className="text-sm font-medium text-surface-900">Faawell</p>
                        <p className="text-xs text-surface-500">Toko Makmur</p>
                    </div>
                </button>
            </div>
        </header>
    );
}
