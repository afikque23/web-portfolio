# PRD — Desain UI/UX Portfolio Web via Figma AI

**Versi:** 1.0
**Tanggal:** 10 September 2026
**Terkait:** Lanjutan dari PRD-Portfolio-Web.md (tahap desain sebelum development)

---

## 1. Ringkasan

Dokumen ini mendefinisikan kebutuhan desain UI/UX untuk portfolio web developer (lihat PRD utama), yang akan dikerjakan di Figma dengan bantuan fitur AI Figma (First Draft, Figma AI generate, dsb) untuk mempercepat eksplorasi awal, kemudian disempurnakan manual agar tidak terlihat generik/template.

---

## 2. Tujuan

| Tujuan | Ukuran Keberhasilan |
|---|---|
| Mempercepat eksplorasi visual awal | Dapat 3+ arah desain berbeda dalam waktu singkat |
| Desain terasa unik, bukan "AI slop" | Setiap output AI diedit ulang: tipografi, layout, micro-interaction custom |
| Konsisten sebagai design system | Ada file komponen reusable (button, card, badge, dsb) |
| Siap diserahkan ke development | Semua screen punya spesifikasi spacing, warna, font, state (hover/active/disabled) |

---

## 3. Ruang Lingkup Desain

Desain mencakup seluruh fitur dari PRD utama:
- Landing / Hero
- Halaman daftar proyek + halaman detail case study
- Timeline / journey interaktif
- Skill visualization (radar chart)
- Testimoni
- Blog (list + detail)
- Widget AI chatbot (floating widget + expanded chat view)
- Elemen gamifikasi (progress bar XP, notifikasi achievement/badge, modal achievement)
- Panel admin (dashboard, form CRUD proyek/testimoni/blog, halaman knowledge base chatbot, analitik)
- Form kontak
- Versi mobile & desktop untuk semua halaman di atas

---

## 4. Alur Kerja dengan Figma AI

1. **Brief ke Figma AI** — gunakan deskripsi singkat & referensi visual (bukan prompt generik) untuk generate first draft tiap layout utama (hero, project card, dashboard admin)
2. **Kurasi** — pilih elemen terbaik dari beberapa hasil AI, buang yang terasa template/cliché (gradient ungu-biru generik, ikon 3D generik, font default)
3. **Kustomisasi manual** — ubah tipografi jadi kombinasi unik, sesuaikan warna dengan brand personal, tambahkan detail micro-interaction
4. **Konsistensi** — rapikan semua hasil ke dalam satu design system (tidak boleh ada gaya yang beda sendiri antar halaman)
5. **Prototyping** — hubungkan antar frame untuk simulasi flow (klik proyek → detail, buka chatbot, dsb)
6. **Review realita** — cek versus portfolio developer top dunia yang jadi acuan gaya, pastikan terasa "buatan manusia dengan selera", bukan hasil AI mentah

---

## 5. Design System yang Perlu Dibuat

### 5.1 Foundation
- **Tipografi**: pasangan font unik (bukan Inter+Roboto default), skala heading H1-H6, body, caption
- **Warna**: palet utama + aksen + warna semantik (success/warning/error) + dark mode variant
- **Spacing & Grid**: sistem 8pt grid, container width, breakpoint mobile/tablet/desktop
- **Ikon & Ilustrasi**: gaya konsisten (line/solid/custom), hindari ikon stok generik

### 5.2 Komponen (Component Library)
- Button (primary, secondary, ghost — state: default/hover/active/disabled)
- Project card (dengan hover effect)
- Badge/Achievement chip
- Progress bar XP
- Chat bubble (user & AI)
- Chatbot floating widget (collapsed & expanded)
- Timeline node
- Skill radar chart component
- Testimonial card
- Form input (text, textarea, select — dengan validation state)
- Admin table (list proyek/testimoni dengan aksi edit/hapus)
- Modal (achievement unlock, konfirmasi hapus di admin)
- Navbar & footer

---

## 6. Daftar Screen / Frame yang Harus Ada

| # | Screen | Prioritas |
|---|---|---|
| 1 | Landing (hero + preview section lain) | Tinggi |
| 2 | Daftar Proyek | Tinggi |
| 3 | Detail Proyek (Case Study) | Tinggi |
| 4 | Timeline / Journey | Tinggi |
| 5 | Skill Visualization | Sedang |
| 6 | Testimoni | Sedang |
| 7 | Blog — List | Rendah |
| 8 | Blog — Detail | Rendah |
| 9 | Chatbot — Collapsed widget | Tinggi |
| 10 | Chatbot — Expanded chat | Tinggi |
| 11 | Notifikasi Achievement (toast/modal) | Sedang |
| 12 | Form Kontak | Tinggi |
| 13 | Admin — Login | Tinggi |
| 14 | Admin — Dashboard (analitik) | Sedang |
| 15 | Admin — CRUD Proyek | Tinggi |
| 16 | Admin — CRUD Testimoni | Sedang |
| 17 | Admin — Knowledge Base Chatbot | Sedang |
| 18 | Versi Mobile (semua di atas) | Tinggi |

---

## 7. Prinsip Visual (Guardrail Anti "AI Slop")

- **Hindari**: gradient ungu-pink generik, kartu dengan shadow tebal generik, font Inter tanpa kustomisasi, ilustrasi 3D generik, layout simetris kaku ala template SaaS
- **Kejar**: tipografi dengan karakter, whitespace yang disengaja, micro-interaction halus (bukan animasi berlebihan), detail personal (foto asli, tone bahasa sendiri, warna yang mencerminkan kepribadian)
- **Acuan**: pelajari portfolio developer ternama (bukan untuk ditiru mentah, tapi memahami prinsip: kepercayaan diri dalam kesederhanaan, hierarki visual jelas, storytelling lewat layout)

---

## 8. Deliverables

- 1 file Figma master berisi: Design System (foundation + komponen), semua screen desktop, semua screen mobile
- Prototype interaktif untuk flow utama (minimal: landing → proyek → detail; buka chatbot; admin login → dashboard)
- Spesifikasi handoff untuk developer: token warna, font, spacing (bisa lewat Figma Dev Mode)

---

## 9. Fase Desain

| Fase | Fokus |
|---|---|
| Fase 1 | Riset visual & mood board, tentukan arah gaya |
| Fase 2 | Generate & kurasi first draft via Figma AI |
| Fase 3 | Bangun design system (foundation + komponen) |
| Fase 4 | Desain seluruh screen desktop |
| Fase 5 | Adaptasi versi mobile |
| Fase 6 | Prototyping interaktif + review akhir |
| Fase 7 | Handoff ke development |

---

## 10. Kriteria "Selesai"

- [ ] Design system lengkap (tipografi, warna, komponen) dan konsisten di semua screen
- [ ] Semua 18 screen pada daftar (desktop + mobile) selesai
- [ ] Prototype flow utama bisa diklik-klik untuk simulasi
- [ ] Tidak ada elemen yang terlihat seperti template AI generik (sudah lolos review guardrail di Bagian 7)
- [ ] File siap handoff (Dev Mode aktif, token rapi, layer dinamai jelas)
