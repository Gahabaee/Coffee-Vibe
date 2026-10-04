# Project Plan: Coffee Vibe (Premium Roastery)

## 1. Project Overview
Website e-commerce untuk bisnis kopi yang terinspirasi dari standar estetika premium (seperti Felix Roasting Co.), dilengkapi dengan asisten AI terintegrasi untuk menangani layanan pelanggan dan penjualan.

## 2. Tech Stack (Production Target)
- **Frontend**: HTML5, Modern CSS (dengan CSS Variables / framework), Vanilla JavaScript (atau migrasi ke React/Vue untuk skalabilitas).
- **Backend**: PHP (Rekomendasi: Framework Laravel untuk keamanan dan MVC yang solid).
- **Database**: MySQL / PostgreSQL (saat ini disimulasikan dengan fitur statis).
- **AI Engine**: Gemini API / OpenAI API dengan fitur *Function Calling*.

## 3. AI Bot Operator Features
1. **Product Q&A**: Menjawab pertanyaan seputar asal biji kopi, metode roasting, dan rekomendasi.
2. **Product Curation**: Membantu pelanggan memilih kopi berdasarkan preferensi rasa (manis, asam, bold, dll).
3. **Ordering**: Mengambil perintah pesanan dan menambahkannya langsung ke keranjang belanja pengguna.
4. **Payment Processing**: Mengeluarkan tautan pembayaran otomatis (integrasi Payment Gateway seperti Midtrans/Xendit).
5. **Order Tracking**: Memeriksa *database* untuk memberikan pembaruan pengiriman pesanan secara *real-time*.

## 4. Development Phases
- **Phase 1 (Mockup/Prototype)**: Pembuatan UI/UX dengan HTML/CSS. Implementasi sistem Cart "Troli" interaktif (tambah item, fitur kuantitas) berbasis `localStorage` di sisi klien. AI Bot disimulasikan dengan logika *keyword matching* menggunakan Vanilla JS **(Selesai)**.
- **Phase 2 (Backend Integration)**: Membangun sistem server, skema *database* asli (MySQL/PostgreSQL), sistem keamanan data, dan memigrasikan status keranjang ke dalam sesi backend.
- **Phase 3 (AI Integration)**: Menyambungkan antarmuka *chat* ke LLM API sesungguhnya (Gemini/OpenAI). Mendaftarkan *function calling* (`add_to_cart`, `check_status`) agar AI bertindak otonom seperti asisten barista.
- **Phase 4 (Payment & Launch)**: Integrasi *Payment Gateway* yang nyata, pengujian penetrasi keamanan (XSS, SQL Injection), penyesuaian desain *mobile*, dan peluncuran (Production).
