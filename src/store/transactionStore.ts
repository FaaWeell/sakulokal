import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Transaction, CartItem, PaymentMethod } from "@/types";
import { mockTransactions } from "@/lib/data";
import { generateTransactionId } from "@/lib/utils";
import { useProductStore } from "./productStore";

interface TransactionStore {
    transactions: Transaction[];
    createTransaction: (
        items: CartItem[],
        paymentMethod: PaymentMethod,
        amountPaid: number
    ) => Transaction;
    getTodayTransactions: () => Transaction[];
    getTodayRevenue: () => number;
}

export const useTransactionStore = create<TransactionStore>()(
    persist(
        (set, get) => ({
            transactions: mockTransactions,

            createTransaction: (items, paymentMethod, amountPaid) => {
                const transactionItems = items.map((item) => ({
                    productId: item.product.id,
                    productName: item.product.name,
                    quantity: item.quantity,
                    price: item.product.sellPrice,
                    subtotal: item.product.sellPrice * item.quantity,
                }));

                const total = transactionItems.reduce((sum, item) => sum + item.subtotal, 0);

                const newTransaction: Transaction = {
                    id: generateTransactionId(),
                    items: transactionItems,
                    total,
                    paymentMethod,
                    amountPaid,
                    change: amountPaid - total,
                    createdAt: new Date(),
                };

                // Reduce stock for each item
                const productStore = useProductStore.getState();
                items.forEach((item) => {
                    productStore.reduceStock(item.product.id, item.quantity);
                });

                set({ transactions: [newTransaction, ...get().transactions] });

                return newTransaction;
            },

            getTodayTransactions: () => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                return get().transactions.filter((t) => {
                    const transactionDate = new Date(t.createdAt);
                    transactionDate.setHours(0, 0, 0, 0);
                    return transactionDate.getTime() === today.getTime();
                });
            },

            getTodayRevenue: () => {
                return get()
                    .getTodayTransactions()
                    .reduce((sum, t) => sum + t.total, 0);
            },
        }),
        {
            name: "sakulokal-transactions",
        }
    )
);
