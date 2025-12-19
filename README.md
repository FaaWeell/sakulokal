# 🏪 SakuLokal

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js 14">
  <img src="https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind">
  <img src="https://img.shields.io/badge/Zustand-orange?style=for-the-badge" alt="Zustand">
</p>

<p align="center">
  <strong>Aplikasi Point of Sale modern untuk membantu UMKM Indonesia mengelola stok barang, transaksi, dan laporan dengan mudah.</strong>
</p>

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|-------|-----------|
| 📊 **Dashboard** | Statistik pendapatan real-time, grafik penjualan mingguan, dan notifikasi stok menipis |
| 📦 **Manajemen Produk** | CRUD produk lengkap dengan kategori, harga beli/jual, dan tracking stok |
| 🛒 **Kasir (POS)** | Interface kasir intuitif dengan keranjang belanja dan multiple payment methods |
| 📋 **Riwayat Transaksi** | Daftar lengkap transaksi dengan filter dan pencarian |
| 📈 **Laporan** | Visualisasi pendapatan, profit estimasi, dan ringkasan stok |
| ⚙️ **Pengaturan** | Kelola profil pengguna, informasi toko, dan preferensi notifikasi |

---

## 🖼️ Screenshots

<details>
<summary>Lihat Screenshots</summary>

### Login Page
Beautiful gradient login dengan animasi smooth.

### Dashboard
Overview lengkap dengan stat cards dan grafik penjualan.

### POS / Kasir
Product grid dengan cart panel dan modal pembayaran.

### Manajemen Produk
Tabel produk dengan fitur search, filter, dan CRUD modal.

</details>

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) (with localStorage persistence)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: TypeScript
- **Charts**: Custom Bar Charts (Recharts ready)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm atau yarn

### Installation

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/sakulokal.git

# Masuk ke folder
cd sakulokal

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 📁 Struktur Project

```
sakulokal/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── login/             # Halaman login
│   │   ├── register/          # Halaman register
│   │   ├── dashboard/         # Dashboard utama
│   │   ├── products/          # Manajemen produk
│   │   ├── pos/               # Point of Sale / Kasir
│   │   ├── transactions/      # Riwayat transaksi
│   │   ├── reports/           # Laporan & analytics
│   │   └── settings/          # Pengaturan
│   ├── components/
│   │   ├── ui/                # Komponen UI reusable
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Toast.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── EmptyState.tsx
│   │   └── layout/            # Layout components
│   │       ├── Sidebar.tsx
│   │       ├── TopBar.tsx
│   │       ├── DashboardLayout.tsx
│   │       └── AuthLayout.tsx
│   ├── store/                 # Zustand state stores
│   │   ├── cartStore.ts       # Shopping cart state
│   │   ├── productStore.ts    # Product CRUD & stock
│   │   └── transactionStore.ts # Transaction history
│   ├── lib/                   # Utilities
│   │   ├── utils.ts           # Helper functions
│   │   └── data.ts            # Mock data
│   └── types/                 # TypeScript interfaces
│       └── index.ts
├── tailwind.config.ts         # Tailwind configuration
├── package.json
└── README.md
```

---

## 🎨 Design System

### Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Primary | Emerald | `#10B981` |
| Background | Slate 50 | `#F8FAFC` |
| Surface | White | `#FFFFFF` |
| Dark (Sidebar) | Slate 900 | `#0F172A` |

### Typography
- **Font**: Plus Jakarta Sans
- **Monospace**: JetBrains Mono

---

## 🔐 Demo

Untuk demo, kamu bisa login dengan email dan password apapun (tidak ada validasi backend).

Data akan tersimpan di **localStorage** browser, jadi akan tetap ada meskipun refresh halaman.

---

## 🔮 Roadmap / Future Improvements

- [ ] Integrasi Supabase untuk database real
- [ ] Authentication dengan JWT
- [ ] Generate struk PDF (jsPDF)
- [ ] Dukungan barcode scanner
- [ ] Export data ke Excel
- [ ] Multi-user / multi-store support
- [ ] Dark mode toggle
- [ ] PWA support untuk mobile

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues atau submit pull requests.

---

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

---

## 👨‍💻 Author

**Faawell** - [faawell.my.id](https://faawell.my.id)

---

<p align="center">
  Built with ❤️ for Indonesian UMKM
</p>
