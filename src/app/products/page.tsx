"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { Button, Input, Card, Badge, Modal, EmptyState, useToast } from "@/components/ui";
import { useProductStore } from "@/store/productStore";
import { formatCurrency } from "@/lib/utils";
import { categories } from "@/lib/data";
import { Category, Product } from "@/types";
import {
    Plus,
    Search,
    Package,
    Edit2,
    Trash2,
    AlertTriangle,
} from "lucide-react";

export default function ProductsPage() {
    const { success } = useToast();
    const products = useProductStore((state) => state.products);
    const addProduct = useProductStore((state) => state.addProduct);
    const updateProduct = useProductStore((state) => state.updateProduct);
    const deleteProduct = useProductStore((state) => state.deleteProduct);

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        category: "makanan" as Category,
        buyPrice: "",
        sellPrice: "",
        stock: "",
    });

    // Filter products
    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesCategory =
            selectedCategory === "all" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const resetForm = () => {
        setFormData({
            name: "",
            category: "makanan",
            buyPrice: "",
            sellPrice: "",
            stock: "",
        });
        setEditingProduct(null);
    };

    const openAddModal = () => {
        resetForm();
        setIsModalOpen(true);
    };

    const openEditModal = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            category: product.category,
            buyPrice: product.buyPrice.toString(),
            sellPrice: product.sellPrice.toString(),
            stock: product.stock.toString(),
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const productData = {
            name: formData.name,
            category: formData.category,
            buyPrice: parseInt(formData.buyPrice),
            sellPrice: parseInt(formData.sellPrice),
            stock: parseInt(formData.stock),
        };

        if (editingProduct) {
            updateProduct(editingProduct.id, productData);
            success("Produk berhasil diperbarui!");
        } else {
            addProduct(productData);
            success("Produk berhasil ditambahkan!");
        }

        setIsModalOpen(false);
        resetForm();
    };

    const handleDelete = (id: string) => {
        deleteProduct(id);
        success("Produk berhasil dihapus!");
        setDeleteConfirm(null);
    };

    return (
        <DashboardLayout title="Manajemen Produk">
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3 flex-1">
                    <div className="relative flex-1 max-w-md">
                        <Input
                            placeholder="Cari produk..."
                            icon={<Search className="w-4 h-4" />}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value as Category | "all")}
                        className="input w-40"
                    >
                        <option value="all">Semua Kategori</option>
                        {categories.map((cat) => (
                            <option key={cat.value} value={cat.value}>
                                {cat.label}
                            </option>
                        ))}
                    </select>
                </div>

                <Button onClick={openAddModal} leftIcon={<Plus className="w-4 h-4" />}>
                    Tambah Produk
                </Button>
            </div>

            {/* Products Table */}
            {filteredProducts.length === 0 ? (
                <Card>
                    <EmptyState
                        icon={<Package className="w-16 h-16" />}
                        title="Belum Ada Produk"
                        description="Mulai tambahkan produk pertamamu untuk mengelola inventaris"
                        action={{
                            label: "Tambah Produk",
                            onClick: openAddModal,
                        }}
                    />
                </Card>
            ) : (
                <Card padding="none">
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Produk</th>
                                    <th>Kategori</th>
                                    <th>Harga Beli</th>
                                    <th>Harga Jual</th>
                                    <th>Stok</th>
                                    <th className="text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product) => (
                                    <tr key={product.id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-surface-100 flex items-center justify-center">
                                                    <Package className="w-5 h-5 text-surface-400" />
                                                </div>
                                                <span className="font-medium text-surface-900">
                                                    {product.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <Badge>
                                                {categories.find((c) => c.value === product.category)?.label}
                                            </Badge>
                                        </td>
                                        <td className="text-surface-600">
                                            {formatCurrency(product.buyPrice)}
                                        </td>
                                        <td className="font-medium text-surface-900">
                                            {formatCurrency(product.sellPrice)}
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                {product.stock <= 5 && (
                                                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                                                )}
                                                <span
                                                    className={
                                                        product.stock <= 5
                                                            ? "text-amber-600 font-medium"
                                                            : "text-surface-600"
                                                    }
                                                >
                                                    {product.stock}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openEditModal(product)}
                                                    className="btn-icon"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => setDeleteConfirm(product.id)}
                                                    className="btn-icon text-red-500 hover:text-red-600 hover:bg-red-50"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}

            {/* Add/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingProduct ? "Edit Produk" : "Tambah Produk Baru"}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Nama Produk"
                        placeholder="Contoh: Indomie Goreng"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />

                    <div>
                        <label className="block text-sm font-medium text-surface-700 mb-1.5">
                            Kategori
                        </label>
                        <select
                            value={formData.category}
                            onChange={(e) =>
                                setFormData({ ...formData, category: e.target.value as Category })
                            }
                            className="input"
                            required
                        >
                            {categories.map((cat) => (
                                <option key={cat.value} value={cat.value}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Harga Beli"
                            type="number"
                            placeholder="0"
                            value={formData.buyPrice}
                            onChange={(e) =>
                                setFormData({ ...formData, buyPrice: e.target.value })
                            }
                            required
                            min="0"
                        />
                        <Input
                            label="Harga Jual"
                            type="number"
                            placeholder="0"
                            value={formData.sellPrice}
                            onChange={(e) =>
                                setFormData({ ...formData, sellPrice: e.target.value })
                            }
                            required
                            min="0"
                        />
                    </div>

                    <Input
                        label="Stok Awal"
                        type="number"
                        placeholder="0"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        required
                        min="0"
                    />

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="secondary"
                            className="flex-1"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Batal
                        </Button>
                        <Button type="submit" className="flex-1">
                            {editingProduct ? "Simpan Perubahan" : "Tambah Produk"}
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={!!deleteConfirm}
                onClose={() => setDeleteConfirm(null)}
                title="Hapus Produk"
                size="sm"
            >
                <p className="text-surface-600 mb-6">
                    Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat
                    dibatalkan.
                </p>
                <div className="flex gap-3">
                    <Button
                        variant="secondary"
                        className="flex-1"
                        onClick={() => setDeleteConfirm(null)}
                    >
                        Batal
                    </Button>
                    <Button
                        variant="danger"
                        className="flex-1"
                        onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
                    >
                        Hapus
                    </Button>
                </div>
            </Modal>
        </DashboardLayout>
    );
}
