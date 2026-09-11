# PRD — Portfolio Web Developer (Gamified + AI-Powered)

**Versi:** 1.0
**Tanggal:** 10 September 2026
**Pemilik Produk:** [Nama Kamu]

---

## 1. Ringkasan Produk

Portfolio web pribadi untuk **fresh graduate developer** yang sedang mencari kerja penuh waktu (entry-level) atau magang, dirancang tidak seperti portfolio generik/template "AI slop". Website ini menggabungkan:
- Presentasi profesional ala portfolio developer top dunia, namun jujur soal status sebagai fresh graduate (bukan berpura-pura senior)
- Elemen gamifikasi (XP, level, achievement, easter egg) untuk tetap menonjol meski belum punya banyak pengalaman kerja
- AI chatbot yang bisa menjawab pertanyaan recruiter tentang latar belakang, kesiapan kerja, dan kecocokan untuk posisi entry-level/magang
- Panel admin untuk mengelola konten tanpa harus edit kode

Tujuannya: membuat recruiter/hiring manager percaya bahwa meski minim pengalaman kerja formal, pemilik portfolio punya fondasi teknis kuat, semangat belajar tinggi, dan siap kerja — sehingga mau mengundang interview/menawarkan magang.

---

## 2. Tujuan & Sasaran

| Tujuan | Ukuran Keberhasilan |
|---|---|
| Menonjol dari portfolio fresh graduate lain | Waktu rata-rata di halaman > 2 menit |
| Menunjukkan kompetensi teknis meski minim pengalaman kerja | Minimal 3 studi kasus proyek mendalam (akademik/pribadi/organisasi/magang) |
| Meyakinkan recruiter soal kesiapan kerja | AI chatbot bisa jawab pertanyaan seperti "Apakah dia siap untuk posisi entry-level?" |
| Memudahkan recruiter mendapat info cepat | AI chatbot menjawab >80% pertanyaan umum tanpa perlu scroll manual |
| Mudah di-maintain | Update konten via admin panel, tanpa deploy ulang kode |
| Konversi ke lamaran kerja/magang | CTA jelas: unduh CV, kontak, link ke portal lamaran (LinkedIn/email) |

---

## 3. Target Pengguna

1. **Recruiter / HR** yang mencari kandidat entry-level atau intern — cepat, ingin lihat potensi & fondasi skill, bukan hanya jam terbang.
2. **Hiring manager / tech lead** — ingin bukti cara berpikir teknis (proses, bukan cuma hasil), meski dari proyek akademik/pribadi.
3. **Koordinator program magang** — ingin tahu kesiapan, semangat belajar, dan ketersediaan waktu kandidat.
4. **Sesama developer / komunitas** — datang dari GitHub/LinkedIn, tertarik dengan cara kerja & gaya kode.
5. **Pemilik (admin)** — kamu sendiri, mengelola konten dari dashboard.

---

## 4. Fitur Utama

### 4.1 Landing / Hero Section
- Headline dinamis (typing effect atau rotasi kata kunci peran/minat: "Backend Engineer", "Fresh Graduate", "Problem Solver", dll) — status fresh graduate ditampilkan dengan percaya diri, bukan disembunyikan
- Statistik singkat yang relevan: total proyek dikerjakan, teknologi dikuasai, sertifikasi/kursus diselesaikan, kontribusi organisasi/komunitas (bukan "tahun pengalaman kerja" yang belum ada)
- Subheadline singkat yang menegaskan tujuan: sedang mencari posisi entry-level atau kesempatan magang di bidang [spesialisasi, mis. web development]
- CTA utama: "Chat dengan AI-ku", "Lihat Proyek", dan "Unduh CV"

### 4.1.1 Tentang Saya & Latar Belakang (Section baru)
- Ringkasan singkat: pendidikan (kampus, jurusan, tahun lulus/IPK opsional), fokus keahlian
- Sertifikasi & kursus (bootcamp, sertifikasi online, kompetisi)
- Organisasi/kepanitiaan yang relevan (menunjukkan soft skill: kerja tim, kepemimpinan)
- Tombol unduh CV (PDF) yang selalu mudah diakses

### 4.2 Showcase Proyek (Case Study, bukan sekadar galeri)
- Setiap proyek punya halaman detail: masalah → solusi → proses → hasil → teknologi → **apa yang dipelajari** (poin penting untuk fresh graduate, menunjukkan growth mindset)
- Mencakup berbagai jenis proyek: tugas akhir/skripsi, proyek kuliah, proyek pribadi, hackathon/kompetisi, kontribusi open source, proyek magang (jika ada)
- Filter berdasarkan stack/kategori/jenis proyek
- Link demo live & repo (jika ada)
- Tandai proyek "Unggulan" agar recruiter yang buru-buru langsung tahu mana yang paling representatif

### 4.3 Sistem Gamifikasi
- **XP & Level**: pengunjung dapat XP dari aksi eksplorasi (scroll ke section baru, buka case study, chat dengan AI, klik easter egg)
- **Achievement/Badge**: contoh "Explorer" (buka semua proyek), "Curious Mind" (tanya AI 5 pertanyaan), "Speed Reader" (baca satu case study penuh)
- **Progress bar** kecil di pojok layar menunjukkan seberapa banyak portfolio sudah "dijelajahi"
- **Leaderboard opsional** (jika mau kompetitif — nama pengunjung anonim + skor eksplorasi)
- Semua gamifikasi harus subtle, tidak mengganggu recruiter yang buru-buru (bisa di-skip)

### 4.4 AI Chatbot Personal
- Chatbot terlatih dengan data tentang kamu: pendidikan, sertifikasi, skill, proyek, filosofi belajar/kerja
- Bisa menjawab: "Apa proyek paling menantang?", "Stack favorit?", "Kenapa harus hire fresh graduate ini?", "Apakah dia siap magang mulai kapan?", "Apa kelebihannya dibanding kandidat berpengalaman?"
- Menyimpan riwayat percakapan sesi (tidak perlu login)
- Fallback sopan jika ditanya di luar konteks
- Opsional: chatbot bisa merekomendasikan proyek relevan berdasarkan pertanyaan (mis. ditanya soal backend → highlight proyek backend)

### 4.5 Timeline / Journey
- Perjalanan karier & belajar dalam bentuk timeline interaktif (bukan daftar teks biasa)
- Bisa di-hover/klik untuk detail tiap titik

### 4.6 Skill Visualization
- Radar chart / skill map interaktif, dikelompokkan (Frontend, Backend, DevOps, Soft skill)
- Level penguasaan (bukan sekadar logo teknologi berjejer)

### 4.7 Testimoni
- Dari dosen pembimbing, mentor magang/bootcamp, rekan tim proyek/organisasi, atau klien freelance kecil — dengan foto & role
- Bisa dikelola dari admin panel

### 4.8 Blog / Notes (opsional tapi direkomendasikan)
- Tempat menulis pemikiran teknis singkat, menunjukkan proses berpikir developer, bukan cuma hasil akhir

### 4.9 Panel Admin
- Login aman (auth)
- CRUD untuk: proyek, testimoni, blog, data skill, konten AI chatbot (knowledge base)
- Dashboard analitik ringan: jumlah pengunjung, pertanyaan terpopuler ke AI, achievement yang paling sering didapat
- Tidak perlu deploy ulang untuk update konten

### 4.10 Kontak & CTA
- Form kontak + integrasi email
- Link cepat ke LinkedIn, GitHub, CV (download PDF)

---

## 5. Kebutuhan Non-Fungsional

- **Performa**: skor Lighthouse 90+ (performance, accessibility, SEO)
- **Responsif**: mobile-first, teruji di berbagai ukuran layar
- **Keamanan**: admin panel terlindungi (auth + rate limiting), sanitasi input chatbot
- **SEO**: meta tag dinamis, sitemap, open graph untuk share ke sosial media
- **Aksesibilitas**: kontras warna, navigasi keyboard, alt text gambar
- **Skalabilitas**: mudah menambah proyek/konten baru tanpa refactor besar

---

## 6. Rekomendasi Tech Stack

| Layer | Opsi |
|---|---|
| Frontend | Next.js (React) + TailwindCSS + Framer Motion (animasi) |
| Backend/API | Next.js API routes atau Node.js (Express/Nest.js) |
| Database | PostgreSQL (data terstruktur: proyek, testimoni, XP user) atau MongoDB jika lebih suka schema fleksibel |
| Auth Admin | NextAuth.js atau Clerk/Auth.js |
| AI Chatbot | Anthropic API (Claude) dengan knowledge base custom (RAG sederhana dari data profil) |
| Hosting | Vercel (frontend+API) + Supabase/Neon (database) |
| Analytics | Plausible/Umami (privacy-friendly) |

---

## 7. Data Model (Entitas Utama)

- **Project**: id, judul, deskripsi, masalah, solusi, stack[], gambar, link_demo, link_repo, kategori, jenis(akademik/pribadi/organisasi/magang/hackathon), featured(bool)
- **Education**: id, institusi, jurusan, tahun_mulai, tahun_selesai, ipk(opsional)
- **Certification**: id, nama, penyelenggara, tanggal, link_sertifikat
- **Testimonial**: id, nama, role, perusahaan, foto, isi, rating
- **SkillItem**: id, nama, kategori, level(1-100)
- **TimelineEvent**: id, tanggal, judul, deskripsi, tipe(karier/edukasi/pencapaian)
- **BlogPost**: id, judul, slug, konten, tanggal_publish, tags[]
- **ChatbotKnowledge**: id, topik, konten (sumber jawaban AI)
- **VisitorProgress**: session_id, xp, achievements[], last_visit (untuk gamifikasi, tanpa perlu akun)
- **AdminUser**: id, email, password_hash, role

---

## 8. User Flow Utama

1. **Pengunjung baru** → landing dengan hero → scroll eksplorasi → dapat XP → buka proyek → baca case study → chat dengan AI → klik kontak
2. **Recruiter buru-buru** → langsung ke CTA "Ringkasan Cepat" (bisa dari chatbot: "Kasih ringkasan singkat profil dia") → lihat CV → kontak
3. **Admin** → login → dashboard → tambah/edit proyek → update knowledge base chatbot → lihat analitik pertanyaan populer

---

## 9. Fase Pengembangan (Milestone)

| Fase | Fokus |
|---|---|
| Fase 1 | Struktur dasar, landing, showcase proyek, responsif |
| Fase 2 | Timeline, skill visualization, testimoni |
| Fase 3 | Sistem gamifikasi (XP, achievement, progress) |
| Fase 4 | AI chatbot + knowledge base |
| Fase 5 | Panel admin (CRUD + auth + analitik) |
| Fase 6 | Optimasi performa, SEO, aksesibilitas, polish animasi |

---

## 10. Risiko & Pertimbangan

- **Kompleksitas tinggi** → butuh perencanaan arsitektur matang sejak awal, hindari over-engineering di MVP
- **Gamifikasi berlebihan** bisa mengganggu recruiter yang ingin cepat → pastikan semua elemen gamifikasi bisa di-skip/opsional
- **Biaya API AI chatbot** → perlu rate limiting agar tidak membengkak
- **Maintenance knowledge base chatbot** → harus rutin diperbarui agar jawaban tetap relevan

---

## 11. Kriteria "Selesai" (Definition of Done) untuk MVP

- [ ] Landing, showcase proyek, timeline, skill section live dan responsif
- [ ] Minimal 3 case study proyek lengkap
- [ ] AI chatbot aktif dan bisa jawab pertanyaan dasar tentang pemilik
- [ ] Sistem XP/achievement dasar berjalan
- [ ] Admin panel bisa CRUD proyek & testimoni
- [ ] Lighthouse score 90+ di performance & SEO
- [ ] Form kontak berfungsi & terkirim ke email
- [ ] Section "Tentang Saya & Pendidikan" tampil jelas dengan CV yang bisa diunduh
- [ ] AI chatbot bisa menjawab pertanyaan seputar kesiapan kerja/magang dan latar belakang pendidikan
