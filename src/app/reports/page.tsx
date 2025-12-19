"use client";

import { DashboardLayout } from "@/components/layout";
import { Card } from "@/components/ui";
import { useProductStore } from "@/store/productStore";
import { useTransactionStore } from "@/store/transactionStore";
import { formatCurrency } from "@/lib/utils";
import { mockWeeklySales } from "@/lib/data";
import { TrendingUp, DollarSign, Package, ShoppingBag } from "lucide-react";

export default function ReportsPage() {
    const products = useProductStore((state) => state.products);
    const transactions = useTransactionStore((state) => state.transactions);

    const totalRevenue = transactions.reduce((sum, t) => sum + t.total, 0);
    const totalProfit = transactions.reduce((sum, t) => {
        return (
            sum +
            t.items.reduce((itemSum, item) => {
                const product = products.find((p) => p.id === item.productId);
                if (product) {
                    return itemSum + (item.price - product.buyPrice) * item.quantity;
                }
                return itemSum;
            }, 0)
        );
    }, 0);
    const totalItemsSold = transactions.reduce(
        (sum, t) => sum + t.items.reduce((itemSum, item) => itemSum + item.quantity, 0),
        0
    );

    return (
        <DashboardLayout title="Laporan">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-white/80 text-sm">Total Pendapatan</p>
                            <p className="text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
                        </div>
                    </div>
                </Card>

                <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-white/80 text-sm">Estimasi Profit</p>
                            <p className="text-2xl font-bold">{formatCurrency(totalProfit)}</p>
                        </div>
                    </div>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <ShoppingBag className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-white/80 text-sm">Total Item Terjual</p>
                            <p className="text-2xl font-bold">{totalItemsSold} item</p>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Weekly Sales Chart */}
                <Card>
                    <h3 className="text-lg font-semibold text-surface-900 mb-6">
                        Penjualan Mingguan
                    </h3>
                    <div className="h-64 flex items-end justify-between gap-3">
                        {mockWeeklySales.map((day, i) => {
                            const maxRevenue = Math.max(...mockWeeklySales.map((d) => d.revenue));
                            const height = (day.revenue / maxRevenue) * 100;

                            return (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                    <p className="text-xs text-surface-500 font-medium">
                                        {formatCurrency(day.revenue)}
                                    </p>
                                    <div
                                        className="w-full bg-gradient-to-t from-primary-500 to-primary-400 rounded-t-lg transition-all hover:from-primary-600 hover:to-primary-500"
                                        style={{ height: `${height}%` }}
                                    />
                                    <span className="text-sm text-surface-600 font-medium">
                                        {day.day}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </Card>

                {/* Stock Overview */}
                <Card>
                    <h3 className="text-lg font-semibold text-surface-900 mb-6">
                        Ringkasan Stok
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-surface-50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <Package className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-surface-900">Total Produk</p>
                                    <p className="text-sm text-surface-500">Jumlah jenis produk</p>
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-surface-900">{products.length}</p>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-surface-50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                                    <Package className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-surface-900">Total Stok</p>
                                    <p className="text-sm text-surface-500">Semua unit barang</p>
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-surface-900">
                                {products.reduce((sum, p) => sum + p.stock, 0)}
                            </p>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-200">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                                    <Package className="w-5 h-5 text-amber-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-surface-900">Stok Menipis</p>
                                    <p className="text-sm text-surface-500">Perlu restok</p>
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-amber-600">
                                {products.filter((p) => p.stock <= 5).length}
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
}
