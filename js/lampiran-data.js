/* ==========================================================================
   DATA LAMPIRAN DOKUMENTASI KEGIATAN PPL DI SMAN 3 YOGYAKARTA
   ==========================================================================
   PANDUAN UPDATE FOTO & VIDEO OLEH PENGGUNA:
   1. Foto Dokumentasi:
      - Simpan file foto dokumentasi ke folder: asset/dokumentasi-ppl/
      - Pada item kegiatan yang sesuai, isi properti 'images' dengan array file foto.
        Contoh: images: ["asset/dokumentasi-ppl/foto-1.jpg", "asset/dokumentasi-ppl/foto-2.jpg"]
      - Foto pertama menjadi thumbnail kartu; saat dibuka, panah/swipe untuk foto lain.
   2. Video Dokumentasi:
      - Tambahkan item baru ke 'lampiranData' dengan menyertakan properti 'videoUrl' atau 'video'.
      - Pemutar otomatis menyesuaikan dengan 3 jenis sumber:
        a. YouTube       : "https://www.youtube.com/watch?v=..." atau "https://youtu.be/..."
        b. Google Drive  : "https://drive.google.com/file/d/.../view"
        c. File Lokal    : "asset/dokumentasi-ppl/video.mp4" (format mp4/webm)
      - Properti 'thumbnail' bersifat opsional (YouTube otomatis mengambil thumbnail resmi jika thumbnail kosong).
   ========================================================================== */

const lampiranCategories = [
  { id: "ALL", label: "Semua" },
  { id: "VIDEO", label: "Video" },
  { id: "OBSERVASI", label: "Observasi Pembelajaran" },
  { id: "PRAKTIK", label: "Praktik Mengajar" },
  { id: "PEMBELAJARAN", label: "Pelaksanaan Pembelajaran" },
  { id: "SEKOLAH", label: "Kegiatan Sekolah" },
  { id: "LAINNYA", label: "Lainnya" }
];

const lampiranData = [
  {
    id: "ppl-01",
    title: "Video Praktik Mengajar Mandiri Kelas X Informatika",
    category: "VIDEO",
    categoryLabel: "Video",
    date: "12 Agustus 2025",
    location: "Ruang Kelas & Lab Komputer, SMAN 3 Yogyakarta",
    videoUrl: "https://drive.google.com/file/d/1gh72CW-h53QfVdZCPv_-Z6QlgYpxKCUw/preview",
    description: "Video dokumentasi pelaksanaan pembelajaran selama 4 siklus yang dilakukan oleh mahasiswa PPL PPG Calon Guru di Lab Komputer 1 SMAN 3 Yogyakarta"
  },
  {
    id: "ppl-02",
    title: "Video Praktik Mengajar Mandiri Kelas X Informatika",
    category: "VIDEO",
    categoryLabel: "Video",
    date: "12 Agustus 2025",
    location: "Ruang Kelas & Lab Komputer, SMAN 3 Yogyakarta",
    videoUrl: "https://drive.google.com/file/d/1Y7GRnJOJIcNivA8irHxAZkdb6_3cGBOa/preview?usp=sharing",
    description: "Video dokumentasi pelaksanaan pembelajaran selama 4 siklus yang dilakukan oleh mahasiswa PPL PPG Calon Guru di Lab Komputer 1 SMAN 3 Yogyakarta"
  },
  {
    id: "ppl-02",
    title: "Video Pelaksanaan Presentasi",
    category: "VIDEO",
    categoryLabel: "Video",
    date: "",
    location: "Ruang Kelas & Lab Komputer, SMAN 3 Yogyakarta",
    videoUrl: "asset/dokumentasi-ppl/presentasi9.mp4",
    description: "Video dokumentasi pelaksanaan presentasi murid kelas X SMAN 3 Yogyakarta"
  },
  {
    id: "ppl-01",
    title: "Observasi Kelas X Informatika",
    category: "OBSERVASI",
    categoryLabel: "Observasi Pembelajaran",
    date: "12 Agustus 2025",
    location: "Ruang Kelas & Lab Komputer, SMAN 3 Yogyakarta",
    images: [
      "asset/dokumentasi-ppl/observasi.jpeg",
      "asset/dokumentasi-ppl/observasi1.jpg",
      "asset/dokumentasi-ppl/observasi2.jpg",
    ],
    description: "Kegiatan observasi awal untuk mengenali karakteristik peserta didik, pola interaksi di kelas, dinamika belajar, dan kesiapan infrastruktur pembelajaran informatika di SMAN 3 Yogyakarta."
  },
  {
    id: "ppl-11",
    title: "Praktik Mengajar Mandiri",
    category: "PRAKTIK",
    categoryLabel: "Praktik Mengajar",
    date: "15 Oktober 2025",
    location: "Kelas X SMAN 3 Yogyakarta",
    images: [
      "asset/dokumentasi-ppl/mandiri.png",
      "asset/dokumentasi-ppl/mandiri1.png",
      "asset/dokumentasi-ppl/mandiri2.png",
      "asset/dokumentasi-ppl/mandiri3.png",
      "asset/dokumentasi-ppl/mandiri4.png",
      "asset/dokumentasi-ppl/mandiri5.jpg",
      "asset/dokumentasi-ppl/mandiri6.png",
      "asset/dokumentasi-ppl/mandiri7.png",
      "asset/dokumentasi-ppl/mandiri8.png",
    ],
    description: "Pelaksanaan pembelajaran secara mandiri dengan menerapkan model Problem-Based Learning (PBL) dan pengelolaan kelas berbasis Social Emotional Learning (SEL)."
  },
  {
    id: "ppl-02",
    title: "Pelaksanaan Pembelajaran",
    category: "PEMBELAJARAN",
    categoryLabel: "Pelaksanaan Pembelajaran",
    date: "20 Agustus 2025",
    location: "Lab Komputer 1, SMAN 3 Yogyakarta",
    images: [
      "asset/dokumentasi-ppl/belajarct.jpeg",
      "asset/dokumentasi-ppl/belajarct2.jpeg",
      "asset/dokumentasi-ppl/belajarct3.jpg",
    ],
    description: "Pelaksanaan pembelajaran selama 4 siklus yang dilakukan oleh mahasiswa PPL PPG Calon Guru di Lab Komputer 1 SMAN 3 Yogyakarta"
  },
  {
    id: "ppl-03",
    title: "Kegiatan Upacara Bendera dan Peringatan Hari Besar",
    category: "SEKOLAH",
    categoryLabel: "Kegiatan Sekolah",
    date: "17 Agustus 2025",
    location: "Lapangan Utama SMAN 3 Yogyakarta",
    images: [
      "asset/dokumentasi-ppl/upacara.jpeg",
      "asset/dokumentasi-ppl/upacara1.jpg",
      "asset/dokumentasi-ppl/upacara2.jpg",
      "asset/dokumentasi-ppl/upacara3.jpg",
      "asset/dokumentasi-ppl/upacara4.jpg",
    ],
    description: "Partisipasi aktif mahasiswa PPL PPG Calon Guru dalam upacara peringatan Hari Ulang Tahun Republik Indonesia bersama seluruh dewan guru, staf, dan siswa Padmanaba."
  },
  {
    id: "ppl-04",
    title: "Diskusi dan Refleksi Bersama Guru Pamong",
    category: "PRAKTIK",
    categoryLabel: "Praktik Mengajar",
    date: "25 Agustus 2025",
    location: "Ruang Guru Informatika, SMAN 3 Yogyakarta",
    images: [
      "asset/dokumentasi-ppl/diskusi.jpg",
      "asset/dokumentasi-ppl/diskusi1.jpg",
      "asset/dokumentasi-ppl/belajarct2.jpeg",
    ],
    description: "Sesi diskusi dan bimbingan bersama Guru Pamong dalam menyusun perangkat ajar berbasis Understanding by Design (UbD) serta instrumen asesmen diagnostik."
  },
  {
    id: "ppl-05",
    title: "Pembiasaan Senyum, Salam, Sapa, Sopan, Santun",
    category: "SEKOLAH",
    categoryLabel: "Budaya Sekolah",
    date: "29 Agustus 2025",
    location: "Lingkungan SMAN 3 Yogyakarta",
    images: [
      "asset/dokumentasi-ppl/5s4.jpeg",
      "asset/dokumentasi-ppl/5s2.jpeg",
      "asset/dokumentasi-ppl/5s3.jpeg",
      "asset/dokumentasi-ppl/5s4.jpeg",
      "asset/dokumentasi-ppl/5s1.jpeg",
    ],
    description: "Keterlibatan dalam kegiatan pembiasaan 5S (Senyum, Salam, Sapa, Sopan, Santun) setiap pagi sebagai pembiasaan budaya baik di sekolah SMAN 3 Yogyakarta."
  },
  {
    id: "ppl-06",
    title: "Dokumentasi dengan Murid",
    category: "LAINNYA",
    categoryLabel: "Lainnya",
    date: "5 September 2025",
    location: "SMAN 3 Yogyakarta",
    images: [
      "asset/dokumentasi-ppl/dokumentasimurix3.jpeg",
      "asset/dokumentasi-ppl/dokumentasimuridx41.jpeg",
      "asset/dokumentasi-ppl/dokumentasimuridx42.jpeg",
      "asset/dokumentasi-ppl/dokumentasimuridx4.jpeg",
      "asset/dokumentasi-ppl/dokumentasimuridx5.jpeg",
    ],
    description: "Dokumentasi kebersamaan dengan murid kelas X SMAN 3 Yogyakarta"
  },
  {
    id: "ppl-08",
    title: "Tim PPL PPG",
    category: "SEKOLAH",
    categoryLabel: "Kegiatan Sekolah",
    date: "14 Agustus 2025",
    location: "SMAN 3 Yogyakarta",
    images: [
      "asset/dokumentasi-ppl/koordinasi.jpeg",
      "asset/dokumentasi-ppl/koordinasi1.jpeg",
      "asset/dokumentasi-ppl/koordinasi2.jpg",
    ],
    description: "Tim PPG Universitas Negeri Yogyakarta"
  },
  {
    id: "ppl-09",
    title: "Diskusi dan Presentasi Kelompok murid",
    category: "PEMBELAJARAN",
    categoryLabel: "Pelaksanaan Pembelajaran",
    date: "24 September 2025",
    location: "Ruang Kelas X SMAN 3 Yogyakarta",
    images: [
      "asset/dokumentasi-ppl/presentasi.jpeg",
      "asset/dokumentasi-ppl/presentasi1.jpeg",
      "asset/dokumentasi-ppl/presentasi2.jpeg",
      "asset/dokumentasi-ppl/presentasi3.jpeg",
      "asset/dokumentasi-ppl/presentasi4.jpeg",
    ],
    description: "Diskusi dan Sesi presentasi hasil proyek kelompok"
  },
  {
    id: "ppl-10",
    title: "Kegiatan Non Mengajar",
    category: "SEKOLAH",
    categoryLabel: "Kegiatan Sekolah",
    date: "3 Oktober 2025",
    location: "Lobby SMAN 3 Yogyakarta",
    images: [
      "asset/dokumentasi-ppl/piket.jpg",
      "asset/dokumentasi-ppl/non1.jpeg",
      "asset/dokumentasi-ppl/non2.jpeg",
    ],
    description: "Kegiatan Non Mengajar Piket dan Monitoring Simulasi Pelaksanaan TKA"
  },
  {
    id: "ppl-15",
    title: "Penerjunan & Penarikan PPL di SMAN 3 Yogyakarta",
    category: "SEKOLAH",
    categoryLabel: "Kegiatan Sekolah",
    images: [
      "asset/dokumentasi-ppl/penarikan.jpg",
      "asset/dokumentasi-ppl/penarikan1.jpg",
      "asset/dokumentasi-ppl/penarikan2.jpg",
      "asset/dokumentasi-ppl/penarikan3.jpg",
      "asset/dokumentasi-ppl/penerjunan.jpg",
    ],
    description: "Acara resmi penerjunan dan penarikan mahasiswa PPL PPG Calon Guru bersama Kepala Sekolah, Wakil Kepala Sekolah, Guru Pamong, dan DPL."
  }
];
