export interface Product {
    id: string;
    name: string;
    category: Category;
    buyPrice: number;
    sellPrice: number;
    stock: number;
    image?: string;
    barcode?: string;
    createdAt: Date;
    updatedAt: Date;
}

export type Category = "makanan" | "minuman" | "snack" | "lainnya";

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface Transaction {
    id: string;
    items: TransactionItem[];
    total: number;
    paymentMethod: PaymentMethod;
    amountPaid: number;
    change: number;
    createdAt: Date;
}

export interface TransactionItem {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    subtotal: number;
}

export type PaymentMethod = "cash" | "transfer" | "qris";

export interface User {
    id: string;
    email: string;
    name: string;
    storeName: string;
    avatar?: string;
}

export interface DashboardStats {
    todayRevenue: number;
    totalProducts: number;
    lowStockCount: number;
    todayTransactions: number;
}
