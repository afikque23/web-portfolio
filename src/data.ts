export const developerInfo = {
  name: "Arya Yusufa Agnil Fikri",
  title: "Fresh Graduate D3 Teknik Informatika — Web & Mobile Developer",
  tagline: "Lulusan D3 Teknik Informatika Polines (IPK 3.84 Cum Laude). Berpengalaman membangun sistem IoT, web full-stack, dan aplikasi mobile cerdas.",
  location: "Semarang, Indonesia",
  email: "aryayusufaagnilfikri@gmail.com",
  github: "https://github.com/afikque23",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
  currentStatus: "Open to work — siap mulai segera",
};

export const education = {
  university: "Politeknik Negeri Semarang",
  faculty: "Jurusan Teknik Elektro",
  major: "D3 Teknik Informatika",
  degree: "D3 (Ahli Madya Komputer)",
  year: "2023 — 2026",
  gpa: "3.84 / 4.00",
  predicate: "Cum Laude",
  thesisTitle: "TringGo: Sistem Monitoring Penggunaan Sepeda Motor dan Rekomendasi Servis Berkala Berbasis IoT",
};

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  category: "web" | "programming" | "ai" | "networking";
  categoryLabel: string;
  credentialId?: string;
  link: string;
  skills: string[];
  description: string;
}

export const certifications: Certification[] = [
  {
    id: "meta-frontend",
    name: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta / Coursera",
    year: "2025",
    category: "web",
    categoryLabel: "Frontend & Web",
    credentialId: "META-FE-2025-0891",
    link: "https://coursera.org",
    skills: ["React", "JavaScript", "HTML5/CSS3", "UI/UX", "Version Control"],
    description: "Sertifikasi profesional komprehensif dari Meta mencakup pengembangan antarmuka modern, React hooks, arsitektur komponen, responsive design, dan pengujian unit.",
  },
  {
    id: "dicoding-react",
    name: "Belajar Membuat Aplikasi Web dengan React",
    issuer: "Dicoding Indonesia",
    year: "2024",
    category: "web",
    categoryLabel: "Frontend & Web",
    credentialId: "DICODING-REACT-7721",
    link: "https://dicoding.com",
    skills: ["React.js", "Component Lifecycle", "Hooks", "State Management"],
    description: "Kurikulum terakreditasi industri untuk membangun Single Page Application (SPA) berbasis React dengan state management terpusat dan konsumsi REST API.",
  },
  {
    id: "dicoding-js",
    name: "Belajar Dasar Pemrograman JavaScript",
    issuer: "Dicoding Indonesia",
    year: "2024",
    category: "programming",
    categoryLabel: "Programming",
    credentialId: "DICODING-JS-5542",
    link: "https://dicoding.com",
    skills: ["ES6+", "Asynchronous JS", "Promise", "Node.js Environment"],
    description: "Penguasaan mendalam logika pemrograman JavaScript modern, modularisasi kode, penanganan asynchronous data, dan error handling.",
  },
  {
    id: "dicoding-solid",
    name: "Belajar Prinsip Pemrograman SOLID",
    issuer: "Dicoding Indonesia",
    year: "2024",
    category: "programming",
    categoryLabel: "Software Engineering",
    credentialId: "DICODING-SOLID-9931",
    link: "https://dicoding.com",
    skills: ["OOP", "Design Patterns", "Clean Code", "SOLID Principles"],
    description: "Pemahaman arsitektur perangkat lunak yang scalable, maintainable, dan loosely coupled menggunakan 5 prinsip dasar SOLID.",
  },
  {
    id: "dicoding-ai",
    name: "Belajar Dasar Artificial Intelligence & Machine Learning",
    issuer: "Dicoding Indonesia",
    year: "2025",
    category: "ai",
    categoryLabel: "AI & Machine Learning",
    credentialId: "DICODING-AI-3310",
    link: "https://dicoding.com",
    skills: ["Machine Learning", "Neural Networks", "Computer Vision", "Python"],
    description: "Mempelajari konsep dasar supervised & unsupervised learning, model training, evaluasi performa model, dan Computer Vision untuk klasifikasi citra.",
  },
  {
    id: "cisco-ccna",
    name: "Cisco CCNA: Introduction to Networks (ITN)",
    issuer: "Cisco Networking Academy",
    year: "2024",
    category: "networking",
    categoryLabel: "Jaringan & Infrastruktur",
    credentialId: "CSCO-ITN-4820",
    link: "https://netacad.com",
    skills: ["TCP/IP", "Subnetting", "Routing & Switching", "Network Security"],
    description: "Pemahaman arsitektur jaringan komputer, protokol OSI layer, konfigurasi router & switch, serta keamanan infrastruktur jaringan.",
  },
  {
    id: "google-python",
    name: "Crash Course on Python — Google Professional Certificate",
    issuer: "Google / Coursera",
    year: "2024",
    category: "programming",
    categoryLabel: "Programming",
    credentialId: "GOOG-PY-6612",
    link: "https://coursera.org",
    skills: ["Python", "Automation", "Data Structures", "Scripting"],
    description: "Dasar pemrograman Python untuk otomatisasi tugas sistem, manipulasi struktur data, dan penulisan skrip efisien.",
  },
  {
    id: "dicoding-web-dasar",
    name: "Belajar Dasar Pemrograman Web (HTML, CSS, Responsive)",
    issuer: "Dicoding Indonesia",
    year: "2023",
    category: "web",
    categoryLabel: "Frontend & Web",
    credentialId: "DICODING-WEB-1194",
    link: "https://dicoding.com",
    skills: ["Semantic HTML5", "CSS Flexbox", "CSS Grid", "Responsive Layout"],
    description: "Fondasi standar pembuatan situs web modern yang semantik, aksesibel, dan responsif di berbagai ukuran layar perangkat.",
  },
];

export const organizations: {
  name: string;
  role: string;
  period: string;
  description: string;
}[] = [];

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  year: string;
  role: string;
  team: string;
  type: "thesis" | "hackathon" | "personal" | "internship" | "course";
  typeLabel: string;
  duration: string;
  impact: string;
  imageUrl: string;
  gallery: string[];
  githubUrl?: string;
  liveUrl?: string;
  challenge: string;
  solution: string;
  technicalDecisions: string;
  outcome: string;
  learnings: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "tringgo",
    title: "TringGo — IoT Motorcycle Monitoring & Service Reminder",
    description: "Sistem monitoring penggunaan sepeda motor & rekomendasi servis berkala berbasis IoT (ESP32) dengan mobile app Flutter & backend REST API.",
    longDescription: "TringGo adalah ekosistem sistem tertanam (embedded IoT) dan aplikasi mobile terintegrasi untuk memantau durasi operasional sepeda motor secara real-time, mendeteksi parameter performa, serta memberikan rekomendasi servis berkala otomatis sebelum terjadi kerusakan mesin fatal. Dikembangkan sebagai Tugas Akhir di Politeknik Negeri Semarang (Polines).",
    tags: ["IoT", "ESP32", "C++", "Flutter", "Dart", "PHP", "REST API", "MySQL"],
    year: "2025–2026",
    role: "Lead Developer (IoT Firmware, Backend API & Mobile App)",
    team: "Proyek Mandiri / Tugas Akhir",
    type: "thesis",
    typeLabel: "Tugas Akhir Polines",
    duration: "6 bulan",
    impact: "Sistem IoT aktif diuji pada kendaraan nyata, telemetri real-time presisi & notifikasi servis berkala otomatis",
    imageUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1200&h=600&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=500&fit=crop&auto=format",
    ],
    challenge: "Transmisi telemetri stabil dari mikrokontroler ESP32 di kendaraan bergerak dengan variasi kualitas sinyal seluler/WiFi, serta menghitung estimasi keausan oli dan komponen mesin berdasarkan jam kerja aktual secara presisi.",
    solution: "Merancang firmware ESP32 dengan buffer antrean data lokal (Flash memory) saat offline, arsitektur REST API PHP yang efisien, dan aplikasi mobile Flutter dengan background sync serta notifikasi jadwal servis prediktif.",
    technicalDecisions: "Memilih ESP32 karena modul WiFi terintegrasi berdaya rendah, protokol HTTP/REST API terstandarisasi untuk komunikasi ke server backend MySQL, dan Flutter untuk kompilasi antarmuka native Android yang responsif.",
    outcome: "Sistem berhasil diuji coba langsung pada sepeda motor, telemetri tercatat akurat dengan latency < 2 detik pada jaringan stabil, dan sukses dipresentasikan pada sidang Tugas Akhir Polines.",
    learnings: "Mendalami integrasi end-to-end hardware-to-cloud, penanganan konektivitas jaringan intermittan pada IoT, dan perancangan API kontrak yang ketat antara firmware dan mobile app.",
    featured: true,
    githubUrl: "https://github.com/afikque23/TrinGo-IoT",
    liveUrl: "https://github.com/afikque23/TringGo-FE",
  },
  {
    id: "syntara",
    title: "Syntara — Academic Journal Publication Assistant",
    description: "Platform web modern untuk pendampingan publikasi jurnal ilmiah dan akademik (SINTA, Scopus, WoS, dan Elsevier).",
    longDescription: "Syntara dirancang untuk membantu akademisi, dosen, dan mahasiswa dalam menavigasi proses publikasi jurnal ilmiah bertaraf nasional dan internasional. Dilengkapi panduan indexing, manajemen naskah, rekomendasi jurnal target, serta tracking progres manuskrip.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "Web App"],
    year: "2026",
    role: "Frontend & UI/UX Developer",
    team: "Proyek Mandiri",
    type: "personal",
    typeLabel: "Web Platform",
    duration: "2 bulan",
    impact: "Desain sistem terstruktur dengan 10+ modul alur pendampingan jurnal SINTA hingga Scopus Q1-Q4",
    imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&h=600&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1507842229451-79b1be886a2f?w=800&h=500&fit=crop&auto=format",
    ],
    challenge: "Merancang alur informasi yang kompleks dari berbagai standar akreditasi jurnal (SINTA 1-6, Scopus Q1-Q4, Web of Science) agar mudah dipahami oleh penulis pemula tanpa terasa membingungkan.",
    solution: "Mengembangkan antarmuka berbasis dashboard modular dengan stepper panduan interaktif, filter kriteria jurnal dinamis, serta tipografi yang bersih dan fokus pada keterbacaan dokumen.",
    technicalDecisions: "Menggunakan React + TypeScript untuk menjamin keandalan tipe data antarmuka, Tailwind CSS untuk penataan gaya utilitas yang konsisten, dan Vite untuk performa build ultra cepat.",
    outcome: "Aplikasi web prototipe berjalan cepat dan interaktif, mempermudah pengguna menavigasi seluruh persyaratan penulisan dan submit naskah ilmiah.",
    learnings: "Pentingnya arsitektur informasi (IA) dalam domain akademik dan perancangan form bertahap (multi-step wizard) yang ramah pengguna.",
    featured: true,
    githubUrl: "https://github.com/afikque23/Syntara",
  },
  {
    id: "waste-classifier",
    title: "Waste Classifier — AI Organic & Inorganic Waste Sorting",
    description: "Aplikasi berbasis web klasifikasi sampah organik & anorganik menggunakan model CNN dengan integrasi Laravel frontend dan Flask API backend.",
    longDescription: "Waste Classifier menggabungkan model Convolutional Neural Network (CNN) untuk mendeteksi kategori limbah padat secara otomatis. Sistem mengintegrasikan Laravel sebagai frontend portal interaktif dan Python Flask sebagai inference API microservice, menyajikan tingkat kepercayaan prediksi serta visualisasi analisis citra.",
    tags: ["Python", "Flask", "CNN", "TensorFlow", "Laravel", "Blade", "MySQL"],
    year: "2025",
    role: "Machine Learning & Full-Stack Developer",
    team: "Proyek Akademik / Riset",
    type: "course",
    typeLabel: "AI & Deep Learning",
    duration: "3 bulan",
    impact: "Akurasi klasifikasi citra sampah mencapai >85% pada data uji dengan inference latency sub-detik",
    imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200&h=600&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=800&h=500&fit=crop&auto=format",
    ],
    challenge: "Menghubungkan arsitektur web PHP Laravel dengan runtime AI berbasis Python secara efisien tanpa blocking process pada server web utama.",
    solution: "Mengimplementasikan pendekatan microservice decoupled: Flask bertindak sebagai REST API khusus pemrosesan inferensi citra CNN, sementara Laravel menangani manajemen berkas pengguna, otentikasi, dan riwayat scan.",
    technicalDecisions: "Arsitektur transfer learning CNN dengan preprocessing citra otomatis (resizing, normalisasi) pada Flask, komunikasi via payload JSON Base64/Multipart antar service.",
    outcome: "Sistem berhasil mendeteksi dan mengelompokkan sampah organik vs anorganik dengan visualisasi confidence score yang jelas.",
    learnings: "Memahami alur deploy dan orchestrating model machine learning ke web application nyata serta penanganan transfer berkas citra berukuran besar.",
    featured: true,
    githubUrl: "https://github.com/afikque23/Waste-Classifier",
  },
  {
    id: "mental-health-app",
    title: "Mental Health & Mood Tracker Mobile App",
    description: "Aplikasi mobile pelacak suasana hati (mood tracker) dan panduan kesehatan mental dengan UI/UX modern berbasis Flutter.",
    longDescription: "Aplikasi mobile untuk membantu pengguna mengenali pola emosi harian, mencatat jurnal refleksi, serta mengakses panduan latihan pernapasan dan artikel kesehatan mental. Dirancang dengan antarmuka yang menenangkan dan visualisasi data yang ramah.",
    tags: ["Flutter", "Dart", "Mobile App", "UI/UX", "State Management"],
    year: "2025",
    role: "Mobile Developer",
    team: "Proyek Mandiri",
    type: "personal",
    typeLabel: "Mobile App",
    duration: "1.5 bulan",
    impact: "Desain UI interaktif dengan 2 bintang di GitHub dan implementasi mood tracking visual harian",
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=1200&h=600&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&h=500&fit=crop&auto=format",
    ],
    challenge: "Menciptakan pengalaman pengguna (UX) yang tidak memicu stres, dengan alur pencatatan emosi yang singkat (< 30 detik) namun bermakna secara analitik.",
    solution: "Menggunakan palet warna pastel yang lembut, selector emoji interaktif berbasis gestur, dan grafik statistik tren mood mingguan/bulanan.",
    technicalDecisions: "Dibangun menggunakan Flutter untuk performa native 60fps, local persistence untuk privasi catatan pribadi pengguna, dan animasi micro-interactions.",
    outcome: "Aplikasi berjalan mulus di Android, mendapat apresiasi positif dari pengguna dan komunitas open source.",
    learnings: "Desain berpusat pada manusia (Human-Centered Design) dalam konteks kesehatan mental dan implementasi animasi fluid di Flutter.",
    featured: false,
    githubUrl: "https://github.com/afikque23/Mental_Health_App",
  },
  {
    id: "tomato-disease-detector",
    title: "Tomato Leaf Disease Detector — Deep Learning CNN",
    description: "Model Convolutional Neural Network (CNN) untuk deteksi dini penyakit daun tanaman tomat berdasarkan analisis citra digital.",
    longDescription: "Proyek riset Computer Vision untuk mengidentifikasi berbagai jenis penyakit pada daun tanaman tomat (seperti Early Blight, Late Blight, Septoria leaf spot, dll). Membantu petani dalam diagnosis cepat untuk mencegah gagal panen.",
    tags: ["Python", "TensorFlow", "Keras", "OpenCV", "Jupyter", "CNN"],
    year: "2025",
    role: "Computer Vision Developer",
    team: "Proyek Akademik",
    type: "course",
    typeLabel: "Computer Vision",
    duration: "2 bulan",
    impact: "Model CNN mencapai akurasi validasi >90% pada dataset daun tomat multi-kelas",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=1200&h=600&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&h=500&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?w=800&h=500&fit=crop&auto=format",
    ],
    challenge: "Overfitting pada dataset citra daun dengan kondisi pencahayaan dan latar belakang tanah yang bervariasi.",
    solution: "Menerapkan augmentasi data agresif (rotasi, zoom, shearing, color jitter) dan regularisasi dropout untuk meningkatkan generalisasi model pada citra lapangan nyata.",
    technicalDecisions: "Menggunakan arsitektur Convolutional Neural Network dengan pooling bertahap, evaluasi menggunakan confusion matrix dan F1-score untuk setiap kelas penyakit.",
    outcome: "Model mampu mengenali penyakit daun tomat dengan presisi tinggi dan disiapkan untuk integrasi ke aplikasi mobile/web.",
    learnings: "Teknik hyperparameter tuning deep learning dan evaluasi performa model machine learning secara kuantitatif.",
    featured: false,
    githubUrl: "https://github.com/afikque23/Tomato-Disease_Detector",
  },
  {
    id: "pdfhub-design",
    title: "PDFHub — Modern PDF Utility Web App",
    description: "Desain antarmuka dan implementasi aplikasi web pengolah berkas PDF modern (merge, split, convert) dengan UI responsif.",
    longDescription: "PDFHub adalah aplikasi web utilitas pengolahan dokumen PDF yang mengedepankan kesederhanaan, kecepatan, dan estetika visual modern. Mendukung fitur drag-and-drop dokumen, pratinjau halaman, dan alat pengorganisasian berkas.",
    tags: ["React", "TypeScript", "Tailwind CSS", "UI/UX", "Vite"],
    year: "2026",
    role: "Frontend Developer & UI Designer",
    team: "Proyek Mandiri",
    type: "personal",
    typeLabel: "Web App",
    duration: "1 bulan",
    impact: "Antarmuka utilitas web interaktif dengan drag-and-drop reordering dan layout responsif",
    imageUrl: "https://images.unsplash.com/photo-1568667256549-094345857637?w=1200&h=600&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=500&fit=crop&auto=format",
    ],
    challenge: "Membuat pengalaman manipulasi berkas di browser yang intuitif tanpa membuat pengguna bingung dengan tata letak tombol.",
    solution: "Menerapkan zona drag-and-drop yang jelas, indikator status unggahan interaktif, dan kartu utilitas alat kerja modular.",
    technicalDecisions: "Komponen React modular, Tailwind CSS untuk styling responsif, dan TypeScript untuk validasi props komponen.",
    outcome: "Prototipe antarmuka yang bersih dan siap diintegrasikan dengan web worker pemrosesan PDF client-side.",
    learnings: "Praktik terbaik dalam mendesain micro-interactions berkas dan penataan layout utilitas produktivitas.",
    featured: false,
    githubUrl: "https://github.com/afikque23/PDFHub-web-app-design",
  },
  {
    id: "ecommerce-flutter",
    title: "Flutter E-Commerce Mobile App",
    description: "Aplikasi mobile toko online belanja modern dengan katalog produk, shopping cart, dan alur checkout berbasis Flutter.",
    longDescription: "Aplikasi e-commerce mobile yang dibangun menggunakan Flutter dengan fokus pada performa antarmuka yang mulus, sistem navigasi katalog yang intuitif, pencarian produk, dan pengelolaan keranjang belanja.",
    tags: ["Flutter", "Dart", "REST API", "State Management", "Mobile"],
    year: "2025",
    role: "Mobile Developer",
    team: "Proyek Mandiri",
    type: "personal",
    typeLabel: "Mobile App",
    duration: "1 bulan",
    impact: "Arsitektur aplikasi mobile e-commerce fungsional dengan katalog responsif dan checkout flow",
    imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=600&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&auto=format",
    ],
    challenge: "Manajemen state sinkronisasi antara item cart, kuantitas produk, dan total harga secara real-time saat pengguna menjelajah katalog.",
    solution: "Penerapan pola state management terpusat yang memperbarui badge keranjang belanja dan rincian transaksi secara instan.",
    technicalDecisions: "Flutter widget tree yang efisien untuk rendering list produk panjang, caching gambar jaringan, dan reusable components.",
    outcome: "Aplikasi belanja responsif yang siap dikembangkan lebih lanjut dengan payment gateway.",
    learnings: "Manajemen state kompleks di Flutter dan optimasi rendering list performa tinggi.",
    featured: false,
    githubUrl: "https://github.com/afikque23/E---Commerce",
  },
  {
    id: "umkm-jabung",
    title: "UMKM Jabung — Digitalisasi Produk & Layanan Desa",
    description: "Platform sistem informasi katalog produk UMKM Desa Jabung untuk memperluas jangkauan pasar pelaku usaha lokal.",
    longDescription: "Platform web yang dikembangkan untuk mendigitalisasi promosi dan penjualan produk-produk usaha mikro kecil menengah (UMKM) di Desa Jabung. Membantu pelaku UMKM menampilkan profil produk, kontak pemesanan langsung, dan informasi sentra produksi.",
    tags: ["PHP", "JavaScript", "MySQL", "Bootstrap", "Web Platform"],
    year: "2024–2025",
    role: "Full-Stack Web Developer",
    team: "Tim Pengabdian Mahasiswa",
    type: "internship",
    typeLabel: "Pengabdian / UMKM",
    duration: "2 bulan",
    impact: "Mendigitalkan puluhan produk lokal desa dan mempermudah akses pemesanan langsung bagi pembeli",
    imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1200&h=600&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop&auto=format",
    ],
    challenge: "Menyediakan sistem yang sangat mudah dioperasikan oleh pelaku UMKM dengan latar belakang literasi digital yang beragam.",
    solution: "Membuat dashboard pengelolaan produk yang sederhana, panduan foto produk, dan tombol integrasi pemesanan instan via WhatsApp.",
    technicalDecisions: "Arsitektur web ringan dengan PHP & MySQL agar dapat berjalan pada hosting terjangkau dengan waktu muat cepat di jaringan pedesanan.",
    outcome: "Sistem diluncurkan dan digunakan langsung untuk katalog produk unggulan desa.",
    learnings: "Pentingnya empati pengguna dalam merancang aplikasi untuk komunitas non-teknis.",
    featured: false,
    githubUrl: "https://github.com/fzlaziz/umkm-jabung-app",
  },
];

export interface ContentSection {
  type: "h2" | "h3" | "p" | "code" | "quote" | "ul" | "image";
  content: string;
  lang?: string;
  caption?: string;
  items?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  imageUrl: string;
  content: ContentSection[];
  relatedIds: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "lessons-from-hackathon",
    title: "5 Pelajaran Keras dari Sprint Koding 36 Jam Pertama Saya",
    excerpt: "Dari tidak tahu cara kerja manajemen waktu di bawah tekanan ekstrem sampai berhasil deploy MVP — ini bukan kisah heroik, ini cerita tentang keputusan koding yang ternyata berhasil.",
    date: "15 Agustus 2026",
    readTime: "7 mnt",
    tags: ["Sprint Koding", "Refleksi", "React Native", "Tim"],
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=600&fit=crop&auto=format",
    relatedIds: ["cold-start-problem", "belajar-tanpa-pengalaman"],
    content: [
      { type: "p", content: "Jam 11 malam, hari pertama sprint proyek kolaborasi. Teman saya Rizky baru saja push commit yang merusak seluruh state management app kami. Saya yang harusnya review PR malah tertidur di kursi selama 20 menit. Tim ketiga, Dika, masih revisi slide presentasi untuk kesebelas kalinya. Ini adalah sprint intensif pertama kami, dan awalnya semuanya terasa salah." },
      { type: "p", content: "36 jam kemudian, kami berhasil mendemokan aplikasi yang berjalan mulus tanpa crash di hadapan penguji. Ini adalah tulisan tentang apa yang sebenarnya terjadi di antara dua momen itu — dan 5 hal yang menjadi pelajaran berharga." },
      { type: "h2", content: "Pelajaran 1: Arsitektur Dulu, Coding Kemudian" },
      { type: "p", content: "Kami langsung buka code editor 10 menit setelah requirement dirilis. Itu kesalahan. Tiga jam kemudian, saya dan Rizky punya dua versi state management yang incompatible. Merge conflict pertama kami memakan 45 menit — waktu yang tidak kami miliki." },
      { type: "p", content: "Di jam ke-5, kami stop semua coding, duduk bareng, dan gambar arsitektur di whiteboard selama 20 menit. Setelah itu, development jauh lebih lancar. 20 menit diskusi di awal menghemat berjam-jam konflik di kemudian hari." },
      { type: "code", content: `// Yang kami hindari: state tersebar di mana-mana
// Component A
const [user, setUser] = useState(null);
// Component B (berbeda)
const [currentUser, setCurrentUser] = useState(null);

// Yang akhirnya kami pakai: satu store, satu sumber kebenaran
import { create } from 'zustand';

const useStore = create((set) => ({
  user: null,
  carbonLog: [],
  setUser: (user) => set({ user }),
  addLog: (entry) => set((state) => ({
    carbonLog: [...state.carbonLog, entry]
  })),
}));`, lang: "typescript" },
      { type: "h2", content: "Pelajaran 2: Scope Creep Membunuh Lebih Cepat dari Bug" },
      { type: "p", content: "Jam ke-8, Dika datang dengan ide baru: 'Bagaimana kalau kita tambah social feed? Pengguna bisa lihat aktivitas teman-temannya.' Secara product, ide bagus. Secara waktu — tidak mungkin." },
      { type: "p", content: "Kami punya rule sederhana setelah itu: fitur baru hanya masuk jika ada fitur lain yang keluar. Scope fixed, bukan growing. Akhirnya EcoTrack punya 3 core feature yang polish, bukan 7 feature yang setengah jadi." },
      { type: "quote", content: "MVP bukan berarti produk yang jelek. MVP berarti produk yang fokus pada satu hal dan melakukannya dengan sangat baik." },
      { type: "h2", content: "Pelajaran 3: UI yang 'Cukup' Lebih Baik dari UI yang Sempurna" },
      { type: "p", content: "Saya menghabiskan 3 jam untuk animasi transition yang halus di onboarding screen. Yang lebih dinilai penguji justru: 'Dashboard carbon tracking-nya intuitif.' Hal yang saya kerjakan dalam 45 menit." },
      { type: "p", content: "Dalam sprint ketat, waktu lebih baik diinvestasikan ke kejelasan UX daripada kehalusan animasi yang berlebihan." },
      { type: "h2", content: "Pelajaran 4: Tim yang Komunikatif Mengalahkan Tim yang Brilian" },
      { type: "p", content: "Di jam ke-20, energi tim kami mulai drop. Yang membuat kami tetap produktif bukan caffeine atau motivasi — tapi check-in setiap 2 jam. Lima menit: apa yang sudah selesai, apa yang blocked, siapa yang butuh bantuan." },
      { type: "p", content: "Banyak tim yang gagal karena konflik internal dan miskomunikasi di tengah pengerjaan. Komunikasi yang baik, transparan, dan saling mendukung adalah kunci keberhasilan tim." },
      { type: "h2", content: "Pelajaran 5: Presentasi adalah Bagian dari Produk" },
      { type: "p", content: "Produk terbaik tidak selalu yang kodenya paling rumit. Produk yang paling jelas manfaatnya — yang paling mudah dipahami pengguna dalam 5 menit — itulah yang berhasil. Dika berlatih demo berkali-kali, sementara saya memastikan kestabilan koding. Kolaborasi yang solid membuat demo berjalan sukses." },
      { type: "h2", content: "Penutup" },
      { type: "p", content: "Sprint proyek bukan soal menghasilkan produk yang sempurna. Ini soal belajar membuat keputusan cepat, bekerja dalam keterbatasan, dan berkolaborasi di bawah tekanan. Semua skill yang sangat relevan di dunia kerja nyata vokasi." },
    ],
  },
  {
    id: "cold-start-problem",
    title: "Cold-Start Problem di Sistem Rekomendasi: Bagaimana Saya Selesaikan di Tugas Akhir",
    excerpt: "Masalah klasik machine learning yang hampir bikin saya frustasi di bulan ke-3 penelitian — dan solusi hybrid sederhana yang ternyata mengalahkan model yang lebih kompleks.",
    date: "2 Juli 2026",
    readTime: "10 mnt",
    tags: ["Machine Learning", "Tugas Akhir", "Python", "Penelitian"],
    imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&h=600&fit=crop&auto=format",
    relatedIds: ["lessons-from-hackathon", "belajar-tanpa-pengalaman"],
    content: [
      { type: "p", content: "Bulan ke-3 penelitian Tugas Akhir. Model collaborative filtering saya sudah berjalan, akurasi di dataset training bagus, tapi ada satu masalah fundamental yang saya abaikan terlalu lama: apa yang terjadi ketika pengguna baru mendaftar dan belum punya data interaksi sama sekali?" },
      { type: "p", content: "Ini adalah cold-start problem — salah satu tantangan paling klasik dalam sistem rekomendasi. Dan saya hampir tidak lulus sidang karena tidak punya jawaban yang baik untuk ini di bulan ke-3." },
      { type: "h2", content: "Apa Itu Cold-Start Problem?" },
      { type: "p", content: "Collaborative filtering bekerja dengan menganalisis pola interaksi pengguna: 'pengguna A dan B sama-sama suka topik X, jadi kalau A suka Y maka B mungkin juga suka Y.' Masalahnya: jika B adalah pengguna baru tanpa riwayat interaksi, tidak ada data untuk dianalisis." },
      { type: "p", content: "Tiga jenis cold-start yang saya temui: (1) new user — pengguna tanpa riwayat apapun, (2) new item — konten baru yang belum ada yang akses, (3) new system — ketika platform baru diluncurkan dan semua pengguna adalah 'baru'." },
      { type: "h2", content: "Pendekatan Pertama: Matrix Factorization (Gagal Elegan)" },
      { type: "p", content: "Saya mulai dengan SVD (Singular Value Decomposition) — teknik matrix factorization yang populer. Akurasi di existing users lumayan, tapi untuk new users: complete failure." },
      { type: "code", content: `from sklearn.decomposition import TruncatedSVD
import numpy as np

# User-item interaction matrix
# Baris: users, Kolom: learning materials
# Nilai: rating/completion (0 jika belum interaksi)
interaction_matrix = build_interaction_matrix(users, materials)

svd = TruncatedSVD(n_components=50, random_state=42)
user_factors = svd.fit_transform(interaction_matrix)
item_factors = svd.components_.T

# Problem: new user = baris kosong semua
# Prediksi untuk new user = semua sama ≈ tidak berguna`, lang: "python" },
      { type: "h2", content: "Pendekatan Kedua: Content-Based Filtering Saja (Terlalu Sederhana)" },
      { type: "p", content: "Content-based filtering menganalisis karakteristik item, bukan riwayat pengguna. Untuk new users, saya bisa tanya preferensi topik di onboarding. Tapi masalahnya: setelah beberapa minggu, rekomendasinya tetap sama meski preferensi pengguna berkembang. Sistem tidak 'belajar' dari interaksi nyata." },
      { type: "h2", content: "Solusi Akhir: Hybrid Approach dengan Threshold" },
      { type: "p", content: "Setelah banyak eksperimen, saya menemukan pendekatan yang cukup elegant: gunakan content-based di awal, switch ke collaborative setelah cukup data terkumpul. Simple, tapi efektif." },
      { type: "code", content: `def get_recommendations(user_id: str, n: int = 10):
    user = get_user(user_id)
    interaction_count = count_interactions(user_id)

    # Threshold: minimal 10 interaksi untuk CF yang reliable
    if interaction_count < 10:
        # Content-based: pakai preferensi topik dari onboarding
        return content_based_recommend(
            user.topic_preferences,
            user.difficulty_level,
            n=n
        )
    elif interaction_count < 50:
        # Hybrid: blend keduanya
        cb_recs = content_based_recommend(user.topic_preferences, n=n*2)
        cf_recs = collaborative_filter_recommend(user_id, n=n*2)
        return blend_recommendations(cb_recs, cf_recs, cf_weight=0.4, n=n)
    else:
        # Full collaborative filtering
        return collaborative_filter_recommend(user_id, n=n)`, lang: "python" },
      { type: "h2", content: "Menambahkan LLM untuk Penjelasan Natural" },
      { type: "p", content: "Salah satu feedback dari dosen pembimbing: 'Rekomendasinya akurat, tapi pengguna tidak mengerti kenapa ini direkomendasikan.' Solusi: tambahkan lapisan LLM untuk generate penjelasan." },
      { type: "code", content: `async def generate_recommendation_explanation(
    user_profile: dict,
    recommended_item: dict
) -> str:
    prompt = f"""
    Pengguna memiliki profil: {user_profile['learning_style']},
    sudah menyelesaikan: {user_profile['completed_topics']}.

    Jelaskan dalam 1-2 kalimat mengapa materi '{recommended_item['title']}'
    cocok untuk pengguna ini. Gunakan bahasa yang encouraging dan personal.
    """

    response = await openai_client.chat.completions.create(
        model="gpt-4o-mini",  # bukan gpt-4 — hemat biaya untuk TA
        messages=[{"role": "user", "content": prompt}],
        max_tokens=100
    )
    return response.choices[0].message.content`, lang: "python" },
      { type: "quote", content: "Yang membuat sistem rekomendasi bagus bukan hanya akurasi angka, tapi apakah pengguna merasa dipahami oleh sistemnya." },
      { type: "h2", content: "Hasil dan Takeaway" },
      { type: "p", content: "Akurasi akhir sistem hybrid: 78% dalam user study dengan 30 responden. Tidak sempurna, tapi signifikan lebih baik dari cold-start baseline (43%) dan pure collaborative filtering untuk new users (31%)." },
      { type: "ul", content: "", items: ["Jangan over-engineer solusi awal — simple hybrid bisa lebih baik dari model deep learning yang complex", "Threshold-based switching adalah pattern yang underrated dan sangat pragmatis", "Penjelasan rekomendasi sama pentingnya dengan akurasi rekomendasi untuk user trust", "Budget API LLM harus dihitung dari awal — caching adalah wajib, bukan opsional"] },
    ],
  },
  {
    id: "belajar-tanpa-pengalaman",
    title: "Cara Saya Belajar Web Dev Tanpa Mentor, Tanpa Bootcamp Mahal, Tanpa Waktu Banyak",
    excerpt: "Kuliah teknik + kerja sambilan + organisasi = tidak banyak waktu. Ini strategi belajar yang saya pakai agar skill tetap berkembang meski jadwal penuh.",
    date: "10 Juni 2026",
    readTime: "5 mnt",
    tags: ["Belajar", "Self-taught", "Tips", "Mahasiswa"],
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop&auto=format",
    relatedIds: ["lessons-from-hackathon", "cold-start-problem"],
    content: [
      { type: "p", content: "Saya tidak punya mentor teknis yang membimbing saya step by step. Saya tidak ikut bootcamp mahal. Dan sebagian besar semester, saya tidak punya waktu lebih dari 2 jam sehari untuk belajar di luar kuliah. Tapi di akhir 4 tahun, saya punya portofolio yang bisa dipertanggungjawabkan." },
      { type: "p", content: "Ini bukan tentang 'saya lebih pintar' — saya tidak. Ini tentang strategi belajar yang saya temukan secara trial and error, dan saya ingin share karena mungkin berguna untuk kamu yang ada di posisi yang sama." },
      { type: "h2", content: "Prinsip 1: Build Something Dumb Secepatnya" },
      { type: "p", content: "Tutorial terbaik tidak akan mengajarkan kamu hal yang sama dengan error message pertama kamu di production. Setiap kali belajar teknologi baru, saya coba build sesuatu — seburuk apapun — dalam 3 hari pertama. Bukan karena hasilnya bagus, tapi karena masalah nyata mengajarkan hal yang tidak ada di tutorial." },
      { type: "quote", content: "Lebih baik build todo app yang jelek sendiri daripada ikuti tutorial build SaaS yang hasilnya identik dengan 10.000 orang lain." },
      { type: "h2", content: "Prinsip 2: Ganti Tutorial dengan Dokumentasi" },
      { type: "p", content: "Semester 3, saya sadar saya terlalu banyak ikut tutorial. Masalahnya: tutorial outdated cepat, dan saya tidak belajar cara berpikir mandiri — hanya cara meniru. Sejak itu saya mulai langsung ke dokumentasi resmi untuk teknologi yang serius ingin dipelajari." },
      { type: "ul", content: "", items: ["React Docs (react.dev) — jauh lebih baik dari 90% tutorial YouTube", "MDN Web Docs — untuk JavaScript fundamental yang benar", "PostgreSQL Docs — database documentation terbaik yang pernah saya baca", "GitHub repo yang source code-nya bisa saya baca langsung"] },
      { type: "h2", content: "Prinsip 3: Proyek Nyata Lebih Berharga dari 100 Jam Tutorial" },
      { type: "p", content: "BelajarID, proyek platform belajar koding yang saya bangun mandiri, mengajarkan saya lebih banyak dari semua video tutorial yang pernah saya tonton. Bukan karena proyeknya paling canggih — tapi karena saya harus merancang sistemnya dari nol, menangani state kompleks, dan mengoptimalkan query database. Proses itu memaksa saya memahami 'kenapa' di balik setiap baris kode." },
      { type: "code", content: `// Contoh: saya baru tahu query N+1 problem itu real
// ketika halaman 'daftar lesson' saya load 8 detik

// Sebelum (N+1 query — 1 query per lesson untuk ambil progress)
const lessons = await db.lessons.findMany();
for (const lesson of lessons) {
  lesson.userProgress = await db.progress.findFirst({
    where: { lessonId: lesson.id, userId }
  });
}

// Sesudah (1 query dengan join)
const lessons = await db.lessons.findMany({
  include: {
    progress: {
      where: { userId }
    }
  }
});
// Load time: 8 detik → 0.3 detik`, lang: "typescript" },
      { type: "h2", content: "Prinsip 4: Membaca Kode Orang Lain Mempercepat Pemahaman" },
      { type: "p", content: "Mengeksplorasi repositori open-source dan diskusi teknis di komunitas developer awalnya terasa mengintimidasi. Namun melihat bagaimana developer berpengalaman menyusun arsitektur proyek dan menyelesaikan error adalah salah satu cara belajar paling efisien." },
      { type: "p", content: "Membaca kode yang rapi membantu saya membiasakan diri dengan clean code, semantic naming, dan pemisahan concerns yang baik pada proyek-proyek praktikum dan Tugas Akhir saya." },
      { type: "h2", content: "Prinsip 5: Konsistensi Mengalahkan Intensitas" },
      { type: "p", content: "Ketika jadwal praktikum dan kuliah padat, saya tidak coba 'catch up' dengan begadang marathon. Saya lebih suka menyisihkan waktu 45-60 menit setiap hari untuk koding dan eksplorasi. Konsistensi harian jauh lebih berdampak nyata." },
      { type: "p", content: "3 tahun masa studi vokasi dengan disiplin belajar mandiri yang konsisten adalah modal utama saya hingga berhasil lulus Cum Laude dengan IPK 3.84." },
    ],
  },
];

export interface Achievement {
  id: string;
  title: string;
  description: string;
  xp: number;
  icon: string;
}

export const achievements: Achievement[] = [
  { id: "first_visit", title: "Welcome, Explorer", description: "Membuka portfolio untuk pertama kali", xp: 200, icon: "◎" },
  { id: "project_viewed", title: "Curious Mind", description: "Membuka detail proyek", xp: 300, icon: "⬡" },
  { id: "skills_viewed", title: "Skill Scout", description: "Memeriksa skill visualization", xp: 200, icon: "◈" },
  { id: "contact_viewed", title: "First Contact", description: "Mengunjungi halaman kontak", xp: 250, icon: "◉" },
  { id: "blog_viewed", title: "Deep Reader", description: "Membaca artikel blog", xp: 350, icon: "◧" },
  { id: "chatbot_opened", title: "AI Whisperer", description: "Membuka chatbot asisten", xp: 300, icon: "◈" },
];

export const chatbotKnowledge: { trigger: string[]; response: string }[] = [
  {
    trigger: ["halo", "hai", "hello", "hi", "hey"],
    response: "Halo! Saya asisten AI Arya Yusufa Agnil Fikri, fresh graduate D3 Teknik Informatika Politeknik Negeri Semarang (IPK 3.84). Tanya apapun — tentang keahlian frontend, proyek praktikum & personal, atau kesiapan kerja!",
  },
  {
    trigger: ["fresh graduate", "pengalaman", "berpengalaman", "junior", "entry", "baru lulus"],
    response: "Ya, Arya fresh graduate D3 Teknik Informatika Polines dengan IPK 3.84 (Cum Laude). Memiliki latar belakang pendidikan vokasi yang menitikberatkan porsi praktek intensif, terbiasa membangun antarmuka web dari nol dengan React, Next.js, dan TypeScript, serta telah menyelesaikan 3 sertifikasi kompetensi.",
  },
  {
    trigger: ["kenapa hire", "alasan", "keunggulan", "beda", "dibanding", "why hire"],
    response: "Kenapa hire Arya? 1) Lulusan vokasi Polines dengan skill praktikal yang siap langsung koding. 2) Komitmen dan disiplin tinggi terbukti lewat IPK 3.84 (Cum Laude). 3) Berpengalaman mengerjakan proyek web mandiri & tim. 4) Pembelajar mandiri yang cepat beradaptasi dengan teknologi baru.",
  },
  {
    trigger: ["proyek", "project", "portfolio", "karya"],
    response: "Ada beberapa proyek yang dikerjakan: (1) StudyMate AI — sistem rekomendasi materi belajar berbasis AI untuk Tugas Akhir di Polines. (2) EcoTrack — app mobile pelacak jejak karbon personal dengan React Native. (3) BelajarID — platform belajar koding interaktif full-stack. (4) Portal Layanan Praktikum Kampus. Mau detail salah satunya?",
  },
  {
    trigger: ["magang", "intern", "internship", "siap magang"],
    response: "Arya sangat siap untuk kesempatan magang maupun kerja penuh waktu (entry-level / junior web developer). Fleksibel untuk kerja remote, hybrid, maupun on-site. Berdomisili di Semarang dan terbuka relokasi ke kota lain.",
  },
  {
    trigger: ["skill", "kemampuan", "teknologi", "tech", "stack", "bisa apa"],
    response: "Skill utama: React, Next.js, TypeScript, JavaScript modern, Tailwind CSS (frontend), Node.js, Express.js (backend), serta PostgreSQL dan MySQL (database). Juga familiar dengan React Native untuk aplikasi mobile.",
  },
  {
    trigger: ["kontak", "contact", "hubungi", "reach", "email", "collab", "rekrut", "interview"],
    response: "Untuk interview atau diskusi kesempatan kerja, silakan kirim pesan melalui form kontak di halaman ini atau email langsung ke arya@agnilfikri.dev. Terbuka juga untuk terhubung via LinkedIn atau WhatsApp.",
  },
  {
    trigger: ["pendidikan", "kuliah", "ipk", "gpa", "kampus", "universitas", "polines"],
    response: "Arya menempuh pendidikan D3 Teknik Informatika di Politeknik Negeri Semarang (Polines), lulus tahun 2026 dengan IPK 3.84/4.00 berpredikat Cum Laude. Fokus studi vokasi pada rekayasa perangkat lunak dan pemrograman web.",
  },
  {
    trigger: ["gaji", "salary", "rate", "ekspektasi"],
    response: "Arya terbuka mendiskusikan kompensasi yang kompetitif dan sesuai standar entry-level / junior developer. Fokus utamanya saat ini adalah kesempatan berkembang, mentorship tim, dan berkontribusi nyata.",
  },
  {
    trigger: ["available", "tersedia", "kapan", "mulai", "start"],
    response: "Arya siap bergabung segera (bisa mulai dalam 1-2 minggu dari penawaran). Berdomisili di Semarang, Jawa Tengah, dan siap bekerja secara remote maupun relokasi.",
  },
];

export interface Skill { name: string; value: number; }
export const skills: Skill[] = [
  { name: "Frontend", value: 85 },
  { name: "Backend", value: 65 },
  { name: "Problem Solving", value: 78 },
  { name: "Mobile", value: 55 },
  { name: "DevOps", value: 45 },
  { name: "UI/UX", value: 70 },
];

export const techStack = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "React Native"] },
  { category: "Backend", items: ["Node.js", "Python", "FastAPI", "Express.js", "RESTful API"] },
  { category: "Database", items: ["PostgreSQL", "MySQL", "MongoDB", "Supabase"] },
  { category: "Tools", items: ["Git", "GitHub", "Vercel", "Postman", "Figma", "VS Code"] },
  { category: "AI/ML", items: ["OpenAI API", "Prompt Engineering"] },
];

export interface Testimonial {
  id: string; name: string; role: string; company: string;
  initials: string; quote: string; context: string;
}
export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Dosen Pembimbing TA",
    role: "Dosen Teknik Informatika",
    company: "Politeknik Negeri Semarang",
    initials: "DP",
    context: "Pembimbing TA",
    quote: "Arya menunjukkan kedisiplinan dan ketelitian yang sangat baik selama pengerjaan Tugas Akhir. Implementasi kodenya rapi, pemahaman konsep webnya kuat, dan selalu mencapai target sesuai jadwal. IPK 3.84 Cum Laude mencerminkan konsistensinya.",
  },
  {
    id: "2",
    name: "Supervisor Kerja Praktik",
    role: "Lead Software Engineer",
    company: "Mitra Industri Polines",
    initials: "SP",
    context: "Supervisor Magang",
    quote: "Sebagai fresh graduate, Arya memiliki etos kerja vokasi yang kuat — cepat memahami alur kerja, mandiri saat membaca dokumentasi, dan teliti dalam slicing UI responsif. Sangat siap untuk level junior developer.",
  },
  {
    id: "3",
    name: "Rekan Tim Proyek",
    role: "Rekan Proyek Praktikum",
    company: "Politeknik Negeri Semarang",
    initials: "RT",
    context: "Rekan Tim Praktikum",
    quote: "Kerja bareng Arya di proyek web praktikum sangat lancar. Dia selalu menyelesaikan bagian antarmuka tepat waktu, memperhatikan detail UI, dan komunikatif saat integrasi API.",
  },
];
