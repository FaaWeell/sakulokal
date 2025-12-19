"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { Card, Badge, EmptyState, Input } from "@/components/ui";
import { useTransactionStore } from "@/store/transactionStore";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { Search, ClipboardList, Receipt } from "lucide-react";

export default function TransactionsPage() {
    const transactions = useTransactionStore((state) => state.transactions);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredTransactions = transactions.filter(
        (trx) =>
            trx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            trx.items.some((item) =>
                item.productName.toLowerCase().includes(searchQuery.toLowerCase())
            )
    );

    const getPaymentBadge = (method: string) => {
        switch (method) {
            case "cash":
                return <Badge variant="success">Tunai</Badge>;
            case "transfer":
                return <Badge variant="info">Transfer</Badge>;
            case "qris":
                return <Badge>QRIS</Badge>;
            default:
                return <Badge>{method}</Badge>;
        }
    };

    return (
        <DashboardLayout title="Riwayat Transaksi">
            {/* Search */}
            <div className="mb-6 max-w-md">
                <Input
                    placeholder="Cari transaksi..."
                    icon={<Search className="w-4 h-4" />}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Transactions List */}
            {filteredTransactions.length === 0 ? (
                <Card>
                    <EmptyState
                        icon={<ClipboardList className="w-16 h-16" />}
                        title="Belum Ada Transaksi"
                        description="Transaksi akan muncul di sini setelah melakukan penjualan"
                    />
                </Card>
            ) : (
                <div className="space-y-4">
                    {filteredTransactions.map((trx) => (
                        <Card key={trx.id} className="hover:shadow-card-hover transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                                        <Receipt className="w-5 h-5 text-primary-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-surface-900">#{trx.id}</h3>
                                        <p className="text-sm text-surface-500">
                                            {formatDateTime(trx.createdAt)}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold text-primary-600">
                                        {formatCurrency(trx.total)}
                                    </p>
                                    <div className="mt-1">{getPaymentBadge(trx.paymentMethod)}</div>
                                </div>
                            </div>

                            <div className="border-t border-surface-100 pt-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                    {trx.items.map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center justify-between text-sm p-2 bg-surface-50 rounded-lg"
                                        >
                                            <span className="text-surface-700">
                                                {item.quantity}x {item.productName}
                                            </span>
                                            <span className="font-medium text-surface-900">
                                                {formatCurrency(item.subtotal)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {trx.paymentMethod === "cash" && trx.change > 0 && (
                                    <div className="flex justify-between text-sm mt-4 pt-3 border-t border-surface-100">
                                        <span className="text-surface-500">
                                            Dibayar: {formatCurrency(trx.amountPaid)}
                                        </span>
                                        <span className="text-surface-500">
                                            Kembalian: {formatCurrency(trx.change)}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </DashboardLayout>
    );
}
