"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    ClipboardList,
    BarChart3,
    Settings,
    LogOut,
    Store,
} from "lucide-react";

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/products", label: "Produk", icon: Package },
    { href: "/pos", label: "Kasir", icon: ShoppingCart },
    { href: "/transactions", label: "Riwayat", icon: ClipboardList },
    { href: "/reports", label: "Laporan", icon: BarChart3 },
    { href: "/settings", label: "Pengaturan", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-surface-900 text-white flex flex-col z-40">
            {/* Logo */}
            <div className="p-6 border-b border-surface-800">
                <Link href="/dashboard" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                        <Store className="w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold">SakuLokal</h1>
                        <p className="text-xs text-surface-400">Smart POS System</p>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "nav-item",
                                isActive && "nav-item-active"
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-surface-800">
                <Link href="/login" className="nav-item text-red-400 hover:text-red-300 hover:bg-red-500/10">
                    <LogOut className="w-5 h-5" />
                    <span>Keluar</span>
                </Link>
            </div>
        </aside>
    );
}
