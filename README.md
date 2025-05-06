# 🛍️ Jajanin - Aplikasi Katalog Produk

Jajanin adalah aplikasi mobile berbasis **React Native (Expo)** dengan backend **Node.js + Express** dan **MySQL** yang memungkinkan pengguna untuk:

- Login dengan email dan password
- Melihat katalog produk
- Menambahkan produk ke favorit
- Melihat daftar favorit berdasarkan user
- Menyaring dan mengurutkan produk berdasarkan kategori atau harga

---

## 🚀 Fitur

### ✅ Frontend (React Native - Expo)
- Login dengan validasi input
- Halaman katalog produk:
  - Pencarian produk
  - Filter berdasarkan kategori (makanan / minuman)
  - Urutkan berdasarkan harga (termurah / termahal)
- Halaman detail produk
- Tambah / hapus produk dari daftar favorit
- Lihat daftar favorit user
- Navigasi menggunakan `expo-router`
- Penyimpanan data user menggunakan `AsyncStorage`

### 🖥️ Backend (Express.js + MySQL)
- Autentikasi login dengan endpoint `POST /login`
- Endpoint untuk data produk dan favorit
- Operasi API:
  - `GET /produk`
  - `GET /favorit/:user_id`
  - `POST /favorit`
  - `DELETE /favorit`

---

## 🧾 Struktur Proyek
├── app/
│ ├── login.tsx
│ ├── register.tsx
│ ├── home.tsx
│ ├── katalog.tsx
│ ├── favorit.tsx
│ └── detail/[id].tsx
├── components/
│ └── Navbar.tsx
├── assets/
│ └── leaflet.html
├── backend/
│ └── index.js // Express.js server
├── package.json
└── README.md


