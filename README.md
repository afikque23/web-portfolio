# ⚡ Arya Yusufa Agnil Fikri — Personal Web Portfolio

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

Website portofolio interaktif dan modern milik **Arya Yusufa Agnil Fikri**, lulusan D3 Teknik Informatika Politeknik Negeri Semarang (IPK 3.84 Cum Laude). Menampilkan ekosistem proyek terintegrasi IoT, sistem web modern, aplikasi mobile Flutter cerdas, serta direktori sertifikasi terakreditasi internasional.

---

## 🌟 Fitur Utama

- **Aestetika Modern & Responsif**: Palet gelap elegan, tipografi modern (*Outfit* & *JetBrains Mono*), efek kaca (*glassmorphism*), dan mikro-animasi fluid.
- **Portofolio Proyek Nyata & Studi Kasus**:
  - **TringGo** (IoT ESP32 + Flutter + PHP REST API) — Tugas Akhir Sistem Monitoring Sepeda Motor.
  - **Syntara** (React + TypeScript + Vite) — Platform Pendampingan Publikasi Jurnal Ilmiah (SINTA, Scopus).
  - **Waste Classifier** (Python Flask CNN + Laravel) — Klasifikasi Sampah Cerdas Real-Time.
  - Serta 5+ aplikasi mobile Flutter, computer vision deep learning, dan sistem web UMKM.
- **Direktori Proyek Lengkap (`/all-projects`)**:
  - Kolom pencarian kata kunci real-time.
  - Filter kategori (*Tugas Akhir / IoT*, *Web & Mobile*, *AI & ML*, *UMKM & Komunitas*).
  - Filter tag teknologi interaktif (*React*, *Flutter*, *Python*, *ESP32*, *TypeScript*).
  - Tautan cepat langsung menuju repositori GitHub (*Code ↗*) dan *Live Demo ↗*.
- **Direktori Sertifikasi & Kursus (`/certifications`)**:
  - Menampilkan sertifikasi profesional terverifikasi dari **Meta**, **Dicoding Indonesia**, **Google**, dan **Cisco Networking Academy**.
  - Dilengkapi ID Kredensial dan tautan verifikasi resmi.
- **Chatbot AI Interaktif**:
  - Asisten cerdas di sisi klien yang mampu menjawab pertanyaan pengunjung mengenai pengalaman teknis, latar belakang pendidikan, proyek unggulan, dan kontak pengembang.
- **Admin Panel & Supabase Backend**:
  - Manajemen konten lengkap (CRUD) untuk proyek, sertifikasi, pesan masuk formulir kontak, artikel blog, dan profil pengembang berbasis database PostgreSQL Supabase real-time.

---

## 🛠️ Teknologi & Stack

| Layer | Teknologi |
| :--- | :--- |
| **Framework & UI** | React 19, TypeScript, JSX |
| **Styling** | Tailwind CSS v4, CSS Variables, Responsive Grid & Flexbox |
| **Build Tooling** | Vite 8, `@vitejs/plugin-react`, `@tailwindcss/vite` |
| **Backend & Database** | Supabase (PostgreSQL, Row Level Security, REST API) |
| **Deployment** | Vercel (SPA Routing Rewrites, Global Edge CDN, SSL) |

---

## 📁 Struktur Direktori

```text
├── src/
│   ├── components/       # Komponen UI Halaman Utama (Hero, About, Projects, Skills, Blog, Nav, Contact, Chatbot)
│   ├── context/          # DataContext & Supabase state management
│   ├── lib/              # Supabase Client configuration
│   ├── pages/            # Halaman Mandiri (Admin, AllProjects, CertificationsPage, ProjectDetail, BlogDetail)
│   ├── data.ts           # Tipe data TypeScript & data default cadangan
│   ├── index.css         # Import Tailwind CSS v4 & theme styling
│   ├── App.tsx           # Router utama & state navigasi aplikasi
│   └── main.tsx          # React entrypoint
├── public/               # Asset statis, favicon & ikon
├── supabase_schema.sql   # DDL skema database Supabase lengkap (tabel, RLS, indeks)
├── vercel.json           # Konfigurasi SPA rewrite untuk deployment Vercel
├── vite.config.ts        # Konfigurasi Vite, Tailwind v4 & React plugin
└── package.json          # Dependencies & script proyek
```

---

## 🚀 Panduan Menjalankan Secara Lokal

### 1. Prasyarat
- Node.js versi 20 atau lebih baru.
- npm atau pnpm.

### 2. Clone Repositori
```bash
git clone https://github.com/afikque23/web-portfolio.git
cd web-portfolio
```

### 3. Install Dependensi
```bash
npm install
```

### 4. Konfigurasi Environment Variables
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Isi variabel berikut dengan kredensial proyek Supabase Anda:
```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

### 5. Setup Database Supabase
Jalankan skrip SQL di file [`supabase_schema.sql`](./supabase_schema.sql) pada menu **SQL Editor** di dashboard Supabase Anda untuk membuat seluruh tabel yang dibutuhkan.

### 6. Jalankan Server Development
```bash
npm run dev
```
Buka browser di `http://localhost:8443` (atau port yang tertera pada terminal).

---

## 📦 Build Produksi & Deploy ke Vercel

### Build Lokal
```bash
npm run build
```
File hasil kompilasi akan berada di folder `dist/`.

### Deploy ke Vercel
1. Hubungkan repositori GitHub Anda di [Vercel](https://vercel.com/new).
2. Tambahkan **Environment Variables** di pengaturan Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Klik **Deploy**. Konfigurasi routing telah diatur otomatis melalui [`vercel.json`](./vercel.json).

---

## 👤 Pengembang

**Arya Yusufa Agnil Fikri**
- **Pendidikan**: D3 Teknik Informatika — Politeknik Negeri Semarang (IPK 3.84 Cum Laude)
- **GitHub**: [@afikque23](https://github.com/afikque23)
- **Email**: [aryayusufaagnilfikri@gmail.com](mailto:aryayusufaagnilfikri@gmail.com)
- **LinkedIn**: [linkedin.com/in/arya-yusufa](https://linkedin.com)

---

## 📄 Lisensi
Proyek ini dilisensikan di bawah [MIT License](LICENSE).
