"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { Button, Input, Card, Modal, EmptyState, useToast } from "@/components/ui";
import { useProductStore } from "@/store/productStore";
import { useCartStore } from "@/store/cartStore";
import { useTransactionStore } from "@/store/transactionStore";
import { formatCurrency } from "@/lib/utils";
import { categories } from "@/lib/data";
import { Category, PaymentMethod } from "@/types";
import {
    Search,
    Package,
    Plus,
    Minus,
    Trash2,
    ShoppingCart,
    CreditCard,
    Banknote,
    QrCode,
    CheckCircle,
} from "lucide-react";

export default function POSPage() {
    const { success } = useToast();
    const products = useProductStore((state) => state.products);
    const cartItems = useCartStore((state) => state.items);
    const addItem = useCartStore((state) => state.addItem);
    const removeItem = useCartStore((state) => state.removeItem);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const clearCart = useCartStore((state) => state.clearCart);
    const getTotal = useCartStore((state) => state.getTotal);
    const createTransaction = useTransactionStore((state) => state.createTransaction);

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
    const [amountPaid, setAmountPaid] = useState("");

    const total = getTotal();
    const change = parseInt(amountPaid || "0") - total;

    // Filter products
    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesCategory =
            selectedCategory === "all" || product.category === selectedCategory;
        return matchesSearch && matchesCategory && product.stock > 0;
    });

    const handleCheckout = () => {
        if (cartItems.length === 0) return;
        setAmountPaid(total.toString());
        setIsPaymentModalOpen(true);
    };

    const processPayment = () => {
        if (paymentMethod === "cash" && change < 0) return;

        createTransaction(cartItems, paymentMethod, parseInt(amountPaid) || total);
        clearCart();
        setIsPaymentModalOpen(false);
        setIsSuccessModalOpen(true);
        setAmountPaid("");
    };

    const quickAmounts = [50000, 100000, 200000, 500000];

    return (
        <DashboardLayout title="Kasir">
            <div className="flex gap-6 h-[calc(100vh-140px)]">
                {/* Product Grid */}
                <div className="flex-1 flex flex-col">
                    {/* Search & Filter */}
                    <div className="flex gap-3 mb-4">
                        <div className="flex-1">
                            <Input
                                placeholder="Cari produk..."
                                icon={<Search className="w-4 h-4" />}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                        <button
                            onClick={() => setSelectedCategory("all")}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${selectedCategory === "all"
                                    ? "bg-primary-500 text-white"
                                    : "bg-surface-100 text-surface-600 hover:bg-surface-200"
                                }`}
                        >
                            Semua
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.value}
                                onClick={() => setSelectedCategory(cat.value)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${selectedCategory === cat.value
                                        ? "bg-primary-500 text-white"
                                        : "bg-surface-100 text-surface-600 hover:bg-surface-200"
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1 overflow-y-auto scrollbar-thin">
                        {filteredProducts.length === 0 ? (
                            <EmptyState
                                icon={<Package className="w-16 h-16" />}
                                title="Produk Tidak Ditemukan"
                                description="Coba cari dengan kata kunci lain"
                            />
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {filteredProducts.map((product) => {
                                    const inCart = cartItems.find(
                                        (item) => item.product.id === product.id
                                    );

                                    return (
                                        <div
                                            key={product.id}
                                            onClick={() => addItem(product)}
                                            className="product-card group"
                                        >
                                            <div className="w-full aspect-square rounded-lg bg-gradient-to-br from-surface-100 to-surface-200 flex items-center justify-center mb-3 relative overflow-hidden">
                                                <Package className="w-12 h-12 text-surface-400" />
                                                {inCart && (
                                                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center font-bold">
                                                        {inCart.quantity}
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/10 transition-colors flex items-center justify-center">
                                                    <Plus className="w-8 h-8 text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            </div>
                                            <h3 className="font-medium text-surface-900 text-sm truncate mb-1">
                                                {product.name}
                                            </h3>
                                            <p className="text-primary-600 font-semibold">
                                                {formatCurrency(product.sellPrice)}
                                            </p>
                                            <p className="text-xs text-surface-500 mt-1">
                                                Stok: {product.stock}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Cart Panel */}
                <Card className="w-96 flex flex-col" padding="none">
                    <div className="p-4 border-b border-surface-100">
                        <div className="flex items-center gap-2">
                            <ShoppingCart className="w-5 h-5 text-primary-500" />
                            <h3 className="font-semibold text-surface-900">Keranjang</h3>
                            <span className="ml-auto text-sm text-surface-500">
                                {cartItems.length} item
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
                        {cartItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-surface-400">
                                <ShoppingCart className="w-12 h-12 mb-3" />
                                <p className="text-sm">Keranjang kosong</p>
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <div
                                    key={item.product.id}
                                    className="flex gap-3 p-3 rounded-lg bg-surface-50"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-surface-200 flex items-center justify-center flex-shrink-0">
                                        <Package className="w-6 h-6 text-surface-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-surface-900 text-sm truncate">
                                            {item.product.name}
                                        </h4>
                                        <p className="text-xs text-surface-500">
                                            {formatCurrency(item.product.sellPrice)}
                                        </p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.product.id, item.quantity - 1)
                                                }
                                                className="w-6 h-6 rounded bg-surface-200 hover:bg-surface-300 flex items-center justify-center transition-colors"
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="text-sm font-medium w-8 text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.product.id, item.quantity + 1)
                                                }
                                                className="w-6 h-6 rounded bg-surface-200 hover:bg-surface-300 flex items-center justify-center transition-colors"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-surface-900 text-sm">
                                            {formatCurrency(item.product.sellPrice * item.quantity)}
                                        </p>
                                        <button
                                            onClick={() => removeItem(item.product.id)}
                                            className="mt-2 p-1 text-red-500 hover:bg-red-50 rounded"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="p-4 border-t border-surface-100 space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-surface-600">Total</span>
                            <span className="text-2xl font-bold text-surface-900">
                                {formatCurrency(total)}
                            </span>
                        </div>
                        <Button
                            onClick={handleCheckout}
                            className="w-full"
                            size="lg"
                            disabled={cartItems.length === 0}
                        >
                            Bayar
                        </Button>
                    </div>
                </Card>
            </div>

            {/* Payment Modal */}
            <Modal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                title="Pembayaran"
                size="md"
            >
                <div className="space-y-6">
                    {/* Total */}
                    <div className="text-center py-4 bg-surface-50 rounded-xl">
                        <p className="text-surface-500 text-sm mb-1">Total Pembayaran</p>
                        <p className="text-3xl font-bold text-surface-900">
                            {formatCurrency(total)}
                        </p>
                    </div>

                    {/* Payment Method */}
                    <div>
                        <label className="block text-sm font-medium text-surface-700 mb-3">
                            Metode Pembayaran
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { value: "cash", label: "Tunai", icon: Banknote },
                                { value: "transfer", label: "Transfer", icon: CreditCard },
                                { value: "qris", label: "QRIS", icon: QrCode },
                            ].map((method) => (
                                <button
                                    key={method.value}
                                    onClick={() => setPaymentMethod(method.value as PaymentMethod)}
                                    className={`p-4 rounded-xl border-2 transition-all ${paymentMethod === method.value
                                            ? "border-primary-500 bg-primary-50"
                                            : "border-surface-200 hover:border-surface-300"
                                        }`}
                                >
                                    <method.icon
                                        className={`w-6 h-6 mx-auto mb-2 ${paymentMethod === method.value
                                                ? "text-primary-500"
                                                : "text-surface-400"
                                            }`}
                                    />
                                    <p
                                        className={`text-sm font-medium ${paymentMethod === method.value
                                                ? "text-primary-600"
                                                : "text-surface-600"
                                            }`}
                                    >
                                        {method.label}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Amount Paid (for cash) */}
                    {paymentMethod === "cash" && (
                        <div>
                            <Input
                                label="Uang Diterima"
                                type="number"
                                placeholder="0"
                                value={amountPaid}
                                onChange={(e) => setAmountPaid(e.target.value)}
                            />
                            <div className="flex gap-2 mt-2">
                                {quickAmounts.map((amount) => (
                                    <button
                                        key={amount}
                                        onClick={() => setAmountPaid(amount.toString())}
                                        className="flex-1 py-2 px-3 text-xs font-medium bg-surface-100 hover:bg-surface-200 rounded-lg transition-colors"
                                    >
                                        {formatCurrency(amount)}
                                    </button>
                                ))}
                            </div>
                            {change >= 0 && amountPaid && (
                                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                                    <p className="text-sm text-green-600">
                                        Kembalian:{" "}
                                        <span className="font-bold">{formatCurrency(change)}</span>
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    <Button
                        onClick={processPayment}
                        className="w-full"
                        size="lg"
                        disabled={paymentMethod === "cash" && change < 0}
                    >
                        Proses Pembayaran
                    </Button>
                </div>
            </Modal>

            {/* Success Modal */}
            <Modal
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
                showCloseButton={false}
                size="sm"
            >
                <div className="text-center py-6">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold text-surface-900 mb-2">
                        Transaksi Berhasil!
                    </h3>
                    <p className="text-surface-500 mb-6">
                        Pembayaran telah diproses dengan sukses
                    </p>
                    <Button onClick={() => setIsSuccessModalOpen(false)} className="w-full">
                        Transaksi Baru
                    </Button>
                </div>
            </Modal>
        </DashboardLayout>
    );
}
