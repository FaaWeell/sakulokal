import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";
import { mockProducts } from "@/lib/data";
import { generateId } from "@/lib/utils";

interface ProductStore {
    products: Product[];
    addProduct: (product: Omit<Product, "id" | "createdAt" | "updatedAt">) => void;
    updateProduct: (id: string, updates: Partial<Product>) => void;
    deleteProduct: (id: string) => void;
    reduceStock: (id: string, quantity: number) => void;
    getProduct: (id: string) => Product | undefined;
    getLowStockProducts: () => Product[];
}

export const useProductStore = create<ProductStore>()(
    persist(
        (set, get) => ({
            products: mockProducts,

            addProduct: (product) => {
                const newProduct: Product = {
                    ...product,
                    id: generateId(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                set({ products: [...get().products, newProduct] });
            },

            updateProduct: (id, updates) => {
                set({
                    products: get().products.map((p) =>
                        p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p
                    ),
                });
            },

            deleteProduct: (id) => {
                set({
                    products: get().products.filter((p) => p.id !== id),
                });
            },

            reduceStock: (id, quantity) => {
                set({
                    products: get().products.map((p) =>
                        p.id === id
                            ? { ...p, stock: Math.max(0, p.stock - quantity), updatedAt: new Date() }
                            : p
                    ),
                });
            },

            getProduct: (id) => {
                return get().products.find((p) => p.id === id);
            },

            getLowStockProducts: () => {
                return get().products.filter((p) => p.stock <= 5);
            },
        }),
        {
            name: "sakulokal-products",
        }
    )
);
