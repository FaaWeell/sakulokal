"use client";

import { DashboardLayout } from "@/components/layout";
import { Card, Badge } from "@/components/ui";
import { useProductStore } from "@/store/productStore";
import { useTransactionStore } from "@/store/transactionStore";
import { formatCurrency, formatTime } from "@/lib/utils";
import { mockWeeklySales } from "@/lib/data";
import {
    DollarSign,
    Package,
    AlertTriangle,
    TrendingUp,
    ArrowUp,
    ArrowDown,
} from "lucide-react";

export default function DashboardPage() {
    const products = useProductStore((state) => state.products);
    const lowStockProducts = useProductStore((state) => state.getLowStockProducts());
    const todayRevenue = useTransactionStore((state) => state.getTodayRevenue());
    const todayTransactions = useTransactionStore((state) => state.getTodayTransactions());

    const stats = [
        {
            title: "Pendapatan Hari Ini",
            value: formatCurrency(todayRevenue),
            icon: DollarSign,
            trend: "+12%",
            trendUp: true,
            className: "stat-card-emerald",
        },
        {
            title: "Total Produk",
            value: products.length.toString(),
            icon: Package,
            trend: null,
            className: "stat-card-blue",
        },
        {
            title: "Stok Menipis",
            value: lowStockProducts.length.toString(),
            icon: AlertTriangle,
            trend: null,
            className: lowStockProducts.length > 0 ? "stat-card-amber" : "stat-card-purple",
        },
        {
            title: "Transaksi Hari Ini",
            value: todayTransactions.length.toString(),
            icon: TrendingUp,
            trend: "+5%",
            trendUp: true,
            className: "stat-card-purple",
        },
    ];

    // Top selling products (mock)
    const topProducts = products.slice(0, 5);

    return (
        <DashboardLayout title="Dashboard">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, i) => (
                    <Card
                        key={i}
                        padding="lg"
                        className={`${stat.className} animate-slide-up`}
                        style={{ animationDelay: `${i * 100}ms` } as React.CSSProperties}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-white/80 text-sm mb-1">{stat.title}</p>
                                <p className="text-2xl font-bold">{stat.value}</p>
                            </div>
                            <div className="p-3 bg-white/20 rounded-xl">
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                        {stat.trend && (
                            <div className="flex items-center gap-1 mt-3 text-sm">
                                {stat.trendUp ? (
                                    <ArrowUp className="w-4 h-4" />
                                ) : (
                                    <ArrowDown className="w-4 h-4" />
                                )}
                                <span>{stat.trend} dari kemarin</span>
                            </div>
                        )}
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sales Chart */}
                <Card className="lg:col-span-2">
                    <h3 className="text-lg font-semibold text-surface-900 mb-6">
                        Penjualan Mingguan
                    </h3>
                    <div className="h-64 flex items-end justify-between gap-2">
                        {mockWeeklySales.map((day, i) => {
                            const maxRevenue = Math.max(...mockWeeklySales.map((d) => d.revenue));
                            const height = (day.revenue / maxRevenue) * 100;

                            return (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                    <div
                                        className="w-full bg-gradient-to-t from-primary-500 to-primary-400 rounded-t-lg transition-all duration-500 hover:from-primary-600 hover:to-primary-500"
                                        style={{ height: `${height}%` }}
                                    />
                                    <span className="text-xs text-surface-500 font-medium">
                                        {day.day}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </Card>

                {/* Top Products */}
                <Card>
                    <h3 className="text-lg font-semibold text-surface-900 mb-4">
                        Produk Terlaris
                    </h3>
                    <div className="space-y-3">
                        {topProducts.map((product, i) => (
                            <div
                                key={product.id}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-50 transition-colors"
                            >
                                <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold">
                                    {i + 1}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-surface-900 truncate">
                                        {product.name}
                                    </p>
                                    <p className="text-xs text-surface-500">
                                        Stok: {product.stock}
                                    </p>
                                </div>
                                <p className="text-sm font-semibold text-surface-700">
                                    {formatCurrency(product.sellPrice)}
                                </p>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Recent Transactions & Low Stock */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* Recent Transactions */}
                <Card>
                    <h3 className="text-lg font-semibold text-surface-900 mb-4">
                        Transaksi Terakhir
                    </h3>
                    <div className="space-y-3">
                        {todayTransactions.length === 0 ? (
                            <p className="text-center text-surface-500 py-8">
                                Belum ada transaksi hari ini
                            </p>
                        ) : (
                            todayTransactions.slice(0, 5).map((trx) => (
                                <div
                                    key={trx.id}
                                    className="flex items-center justify-between p-3 rounded-lg bg-surface-50"
                                >
                                    <div>
                                        <p className="text-sm font-medium text-surface-900">
                                            #{trx.id}
                                        </p>
                                        <p className="text-xs text-surface-500">
                                            {formatTime(trx.createdAt)} • {trx.items.length} item
                                        </p>
                                    </div>
                                    <p className="text-sm font-semibold text-primary-600">
                                        {formatCurrency(trx.total)}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </Card>

                {/* Low Stock Alert */}
                <Card>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-surface-900">
                            Stok Menipis
                        </h3>
                        <Badge variant={lowStockProducts.length > 0 ? "warning" : "success"}>
                            {lowStockProducts.length} produk
                        </Badge>
                    </div>
                    <div className="space-y-3">
                        {lowStockProducts.length === 0 ? (
                            <p className="text-center text-surface-500 py-8">
                                Semua stok aman 👍
                            </p>
                        ) : (
                            lowStockProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex items-center justify-between p-3 rounded-lg bg-amber-50 border border-amber-200"
                                >
                                    <div>
                                        <p className="text-sm font-medium text-surface-900">
                                            {product.name}
                                        </p>
                                        <p className="text-xs text-amber-600">
                                            Tersisa {product.stock} unit
                                        </p>
                                    </div>
                                    <Badge variant="warning">Segera Restock</Badge>
                                </div>
                            ))
                        )}
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
}
