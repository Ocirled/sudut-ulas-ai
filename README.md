# 📊 SudutUlas AI: Intelligent Product Review Analyst
*Transformasi ulasan berantakan menjadi strategi bisnis nyata bagi UMKM Indonesia.*

## 🌟 Ikhtisar Proyek
SudutUlas AI adalah platform dasbor analitik berbasis kecerdasan buatan yang dirancang untuk membantu pelaku UMKM mengoptimalkan kualitas produk melalui analisis ulasan pelanggan. Menggunakan teknik Aspect-Based Sentiment Analysis (ABSA), platform ini mampu membedah teks ulasan tidak terstruktur menjadi indikator performa spesifik.

Proyek ini dikembangkan sebagai bagian dari **AI Impact Challenge - Tema UMKM Go-Online**.

## 🚩 Masalah
Banyak UMKM di marketplace (Shopee, Tokopedia, Lazada) memiliki ribuan ulasan pelanggan, namun:
- **Rating bintang tidak cukup:** Bintang 5 tidak memberitahu penjual bagian mana yang disukai; bintang 1 tidak memberitahu akar masalah (apakah produknya rusak, atau hanya pengirimannya yang lama?).
- **Keterbatasan SDM:** UMKM tidak memiliki tim analis untuk membaca ulasan satu per satu.

## ✅ Solusi
SudutUlas AI bertindak sebagai "asisten cerdas" yang secara otomatis mengelompokkan sentimen ke dalam aspek bisnis: Produk, Pelayanan, Pengemasan, dan Pengiriman.

## 🚀 Fitur Utama
- 📥 **Smart Data Importer:** Unggah file ulasan (CSV/Excel) hasil ekspor marketplace atau scraping.
- 📈 **ABSA Dashboard:** Visualisasi distribusi sentimen per aspek dalam bentuk chart interaktif.
- 💡 **AI Actionable Insights:** Generator rekomendasi otomatis (misal: "Kemasan sering dikeluhkan bocor, disarankan mengganti jenis segel botol").
- ☁️ **Word Cloud & Trend:** Melihat kata kunci yang paling sering muncul untuk mendeteksi masalah musiman.

## 🛠️ Arsitektur Teknologi (Saat Ini - Prototipe)
Mengingat proyek ini masih dalam tahap prototipe awal, aplikasi saat ini difokuskan pada rancangan antarmuka pengguna (UI/UX) dan simulasi visualisasi data. Teknologi yang digunakan meliputi:
- **Frontend:** HTML5, Vanilla CSS3, dan JavaScript murni.
- **Visualisasi Data:** Chart.js (diintegrasikan melalui JavaScript).
- **Data (Dummy):** Data ulasan dan sentimen disimulasikan secara statis langsung di dalam kode untuk mendemonstrasikan fungsi dashboard.

## 🔮 Rencana Pengembangan ke Depan (Roadmap)
Untuk mengubah prototipe ini menjadi produk fungsional sepenuhnya, pengembangan selanjutnya akan melibatkan integrasi *Machine Learning* dan ekosistem Microsoft Azure:
- **AI Core (NLP):** Integrasi Azure AI Language (Opinion Mining) dan Azure Machine Learning (IndoBERT) untuk analisis sentimen aktual.
- **Generative AI:** Menggunakan Azure OpenAI untuk menghasilkan rekomendasi strategi bisnis otomatis.
- **Backend/Fullstack:** Migrasi *dashboard* menggunakan Python (Streamlit) atau integrasi backend REST API.

## 📂 Struktur Repositori (Saat Ini)
```text
sudut-ulas-ai/
├── .git/                 # Direktori kontrol versi Git
├── index.html            # Halaman landing / beranda aplikasi
├── dashboard.html        # Halaman antarmuka dashboard analitik
├── style.css             # Berkas gaya (styling) untuk seluruh halaman
├── app.js                # Logika interaktivitas dan visualisasi grafik (Chart.js)
└── README.md             # Dokumentasi proyek
```

---

## ⚙️ Memulai (Local Setup)
Karena saat ini aplikasi berjalan sebagai prototipe *frontend* statis, menjalankannya sangat mudah:

### 1. Prasyarat
- Web Browser modern (Google Chrome, Firefox, Edge, atau Safari).
- (Opsional) *Extension* seperti "Live Server" jika menggunakan VS Code untuk melihat perubahan secara *real-time*.

### 2. Instalasi & Menjalankan Aplikasi
```bash
# Clone repositori
git clone https://github.com/Ocirled/sudut-ulas-ai.git
cd sudut-ulas-ai
```
Setelah diunduh, Anda cukup membuka file `index.html` atau `dashboard.html` dengan cara men-klik ganda (double-click) file tersebut, dan aplikasi akan langsung terbuka di *browser* Anda.

## 📊 Dataset
Proyek ini menggunakan dataset publik PRDECT-ID (Indonesian Emotion Classification) dari Kaggle yang berisi ribuan ulasan Tokopedia yang telah dilabeli secara profesional.

**Sumber:** [PRDECT-ID Indonesian Emotion Classification](https://www.kaggle.com/datasets/jocelyndumlao/prdect-id-indonesian-emotion-classification)

## 👥 Tim Pengembang
- **Delrico Lie** - AI Engineer & Web Developer - delricolie111@gmail.com

## 📜 Lisensi
Proyek ini dilisensikan di bawah [MIT License](LICENSE).

## 🙏 Ucapan Terima Kasih
- Microsoft Elevate Training Center
- Dicoding Indonesia