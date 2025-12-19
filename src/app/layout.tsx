import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";

export const metadata: Metadata = {
    title: "SakuLokal - Sistem Kasir & Inventaris UMKM",
    description:
        "Aplikasi Point of Sale modern untuk membantu UMKM mengelola stok barang, transaksi, dan laporan dengan mudah.",
    keywords: ["POS", "kasir", "inventaris", "UMKM", "stok barang", "penjualan"],
    authors: [{ name: "Faawell" }],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="id">
            <body>
                <ToastProvider>{children}</ToastProvider>
            </body>
        </html>
    );
}
