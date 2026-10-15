# TokoKu - Interactive Data Dashboard (PTS Pemrograman Web)

## 1. Identitas Mahasiswa
* **Nama**: Muhammad Aril Saputra
* **NIM / NPM**: 2440304029
* **Kelas**: Pemrograman Web - Teknik Komputer UBT

---

## 2. Nama Aplikasi & Deskripsi Singkat
* **Nama Aplikasi**: TokoKu
* **Deskripsi**: TokoKu adalah dashboard katalog produk interaktif berbasis web front-end yang mengonsumsi REST API DummyJSON. Aplikasi ini menyediakan fitur tampilan grid/list yang responsif, manajemen favorit berbasis `localStorage`, perhitungan statistik data (rata-rata harga dan harga tertinggi), serta form filter rentang harga dengan validasi logika antar dua input yang saling berkaitan.

---

## 3. Perhitungan Variasi Soal Berdasarkan NIM
Tiga digit terakhir NIM **2440304029** adalah **0, 2, 9**:
* **Digit X = 0**
  * **Dataset**: Products
  * **Tema Project**: Dashboard Produk / UMKM
  * **API Endpoint**: `https://dummyjson.com/products`
* **Digit Y = 2**
  * **Fitur Utama**: Favorite/Bookmark menggunakan `localStorage`
* **Digit Z = 9**
  * **Form & Validasi**: Dua input yang saling berkaitan harus divalidasi (Input Harga Minimal dan Harga Maksimal: Harga Maksimal harus $\ge$ Harga Minimal)
* **Challenge Individual (C)**:
  * $S = X + Y + Z = 0 + 2 + 9 = 11$
  * $C = S \pmod 4 = 11 \pmod 4 = \mathbf{3}$
  * **Challenge**: Toggle Grid/List, pilihan pengguna disimpan pada `localStorage`

---

## 4. Dataset & Endpoint REST API
* **Endpoint API**: `https://dummyjson.com/products?limit=12`
* **Format Data**: JSON
* **Properti yang digunakan**: `id`, `title`, `price`, `rating`, `thumbnail`

---

## 5. Fitur Utama & Challenge
1. **REST API Fetching**: Mengambil data produk secara asinkron menggunakan `fetch()` dan `async/await`.
2. **State Handling**: Menampilkan pesan saat memuat data (*loading*), saat data berhasil dirender (*success*), dan saat terjadi gangguan jaringan (*error*).
3. **Analisis Data Otomatis**: Menghitung rata-rata harga produk (`reduce`) dan mencari produk termahal (`Math.max` & `map`).
4. **Favorite / Bookmark (Digit Y = 2)**: Tombol bookmark/favorit di setiap kartu produk yang tersimpan di `localStorage` (tetap tersimpan saat halaman dimuat ulang).
5. **Validasi Form Rentang Harga (Digit Z = 9)**: Memastikan kedua input diisi angka dan Harga Maksimal tidak boleh lebih kecil dari Harga Minimal.
6. **Toggle Tampilan Grid / List (Challenge C = 3)**: Pengguna dapat beralih antara tata letak Grid atau List, dan preferensi ini tersimpan di `localStorage`.

---

## 6. Cara Menjalankan Project
1. Buka folder project di VS Code atau editor kode lainnya.
2. Buka file `index.html` langsung di browser, atau gunakan ekstensi *Live Server*.
3. Pastikan komputer terhubung ke internet agar dapat memuat data dari DummyJSON API.

---

## 7. Struktur File Project
```text
PTS/
├── css/
│   └── style.css       (Responsive layout - CSS Grid & Flexbox)
├── js/
│   └── script.js       (Vanilla JS - Fetch API, LocalStorage, Filter)
├── index.html          (HTML5 semantik & aksesibel)
├── AI_USAGE_LOG.md     (Log penggunaan AI)
└── README.md           (Dokumentasi lengkap)
```

---

## 8. Jawaban 10 Pertanyaan Penjelasan Kode

### 1. Jelaskan alur sejak halaman dibuka sampai data REST API tampil. Sebutkan nama fungsi pada project Anda.
**Jawaban:**
Saat file `index.html` dibuka, browser mengeksekusi baris `loadData()` di file `script.js`. Fungsi `loadData()` pertama kali menampilkan status teks `"Memuat data produk..."` di elemen `#list`. Selanjutnya fungsi memanggil API DummyJSON menggunakan `fetch('https://dummyjson.com/products?limit=12')` secara asinkron (`await`). Setelah respons diterima dan diparsing ke JSON, data array produk disimpan ke variabel `products`, lalu fungsi `render(products)` dipanggil untuk membuat elemen kartu produk dan menampilkannya ke layar DOM.

### 2. Mengapa setelah fetch() selesai Anda masih perlu memeriksa response.ok? Jelaskan dengan kasus pada aplikasi Anda.
**Jawaban:**
Karena `fetch()` hanya akan melempar (*reject*) error jika terjadi kegagalan jaringan (seperti koneksi terputus). Jika server merespons dengan status error HTTP seperti 404 (Not Found) atau 500 (Internal Server Error), `fetch()` tetap menganggap Promise berhasil (*resolved*). Pengecekan `if (!res.ok)` memastikan bahwa jika status kode di luar rentang 200–299, sistem secara eksplisit melempar `new Error` sehingga langsung ditangkap oleh blok `catch` untuk menampilkan pesan kesalahan yang ramah kepada pengguna.

### 3. Pilih satu data JSON dari API dan jelaskan bagaimana data tersebut diubah menjadi elemen DOM yang terlihat.
**Jawaban:**
Data JSON produk memiliki properti seperti `{ title: "iPhone 9", price: 549, thumbnail: "..." }`. Di dalam fungsi `render()`, method `items.map()` digunakan untuk mengiterasi setiap objek produk dan mengonversinya menjadi template string HTML:
```javascript
<div class="card">
  <img src="${p.thumbnail}" alt="${p.title}">
  <h3>${p.title}</h3>
  <p>Harga: $${p.price} | Rating: ${p.rating}</p>
  ...
</div>
```
String HTML dari seluruh produk digabungkan dengan `.join('')` dan dimasukkan ke properti `listEl.innerHTML`, sehingga browser merendernya menjadi elemen DOM visual.

### 4. Apa yang terjadi jika internet terputus, endpoint salah, atau server mengembalikan HTTP 404/500? Jelaskan penanganannya.
**Jawaban:**
Jika koneksi internet putus, `fetch()` akan gagal dan alur kode langsung melompat ke blok `catch (err)`. Jika endpoint salah atau server merespons 404/500, pengecekan `!res.ok` akan melempar pesan kesalahan yang juga ditangkap oleh blok `catch`. Di dalam blok `catch`, elemen `#list` diisi teks pemberitahuan error yang jelas: `<p class="err">Gagal memuat: ${err.message}</p>`, sehingga pengguna mengetahui penyebab kegagalan tanpa membuat halaman macet (*crash*).

### 5. Jelaskan bagaimana fitur berdasarkan digit Y bekerja. Cantumkan nama fungsi/event yang digunakan.
**Jawaban:**
Fitur digit Y = 2 adalah *Favorite/Bookmark*. Fitur ini dikelola oleh fungsi `toggleFav(id)`. Ketika tombol pada kartu produk diklik (`onclick="toggleFav(id)"`), fungsi memeriksa apakah ID produk sudah ada di array `favs`. Jika sudah ada, ID dihapus (`filter`); jika belum, ID ditambahkan (`spread operator`). Array `favs` kemudian disimpan ke penyimpanan peramban menggunakan `localStorage.setItem('favs', JSON.stringify(favs))`, lalu fungsi `render(products)` dipanggil kembali untuk memperbarui ikon tombol (❤️ / 🤍).

### 6. Jelaskan bagaimana validasi berdasarkan digit Z bekerja dan mengapa input tidak valid tidak boleh langsung diproses.
**Jawaban:**
Fitur digit Z = 9 memvalidasi dua input saling terkait: Harga Minimal (`#minPrice`) dan Harga Maksimal (`#maxPrice`). Validasi terjadi pada event `submit` form (`#formFilter`). Kode mengecek apakah kedua nilai valid berupa angka, dan memastikan bahwa nilai Maksimal tidak boleh lebih kecil daripada nilai Minimal (`max < min`). Input tidak valid tidak boleh diproses agar tidak menghasilkan filter data yang salah, membingungkan pengguna, atau menyebabkan anomali query pada sistem.

### 7. Jika project Anda menggunakan localStorage, jelaskan data apa yang disimpan, kapan data dibaca/diubah, dan alasan penggunaannya.
**Jawaban:**
Aplikasi menyimpan dua data pada `localStorage`:
1. `'favs'`: Menyimpan array ID produk favorit dalam format string JSON. Dibaca saat halaman pertama kali dibuka, dan diubah setiap kali pengguna mengklik tombol favorit. Tujuannya agar daftar favorit pengguna tidak hilang saat halaman di-refresh.
2. `'viewMode'`: Menyimpan string preferensi tampilan (`'grid'` atau `'list'`). Dibaca saat inisialisasi halaman (`setView(...)`), dan diubah setiap kali tombol Grid/List diklik agar preferensi kenyamanan tampilan pengguna tetap terjaga.

### 8. Pilih satu fungsi JavaScript penting, lampirkan potongan maksimal 15 baris, lalu jelaskan input - proses - output.
**Potongan Kode:**
```javascript
function toggleFav(id) {
  favs = favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id];
  localStorage.setItem('favs', JSON.stringify(favs));
  render(products);
}
```
**Penjelasan:**
* **Input**: Parameter `id` bertipe angka/integer yang mewakili ID unik produk.
* **Proses**: Memeriksa apakah `id` sudah ada di dalam array `favs`. Jika ada, `filter()` menghapusnya; jika tidak ada, dimasukkan ke array. Nilai array terbaru kemudian disimpan ke `localStorage`.
* **Output**: Memperbarui data penyimpanan lokal dan memperbarui tampilan UI DOM melalui `render(products)` dengan status tombol favorit terbaru.

### 9. Sebutkan bug/error paling sulit selama PTS, penyebabnya, cara menemukannya, dan cara memperbaikinya.
**Jawaban:**
* **Bug/Error**: Data input dari elemen form bertipe string, sehingga saat membandingkan angka `"100"` dan `"20"`, evaluasi string `"100" < "20"` menghasilkan nilai `true`.
* **Penyebab**: Nilai properti `.value` dari input HTML selalu bertipe data String, bukan Number.
* **Cara Menemukan**: Melakukan inspeksi nilai menggunakan `console.log(typeof min, typeof max)` di Developer Tools.
* **Cara Memperbaiki**: Membungkus nilai input dengan fungsi `parseFloat(...)` sebelum dilakukan perbandingan logika matematika.

### 10. Jika diberi satu minggu lagi, sebutkan dua perbaikan teknis yang akan Anda lakukan dan alasannya.
**Jawaban:**
1. **Fitur Debounce pada Pencarian Judul Produk**: Menambahkan input pencarian real-time dengan teknik *debounce* (delay 300ms) agar filtering berjalan halus tanpa membebani performa browser pengguna.
2. **Skeleton Loading UI**: Mengganti teks loading sederhana dengan animasi placeholder kotak abu-abu (*skeleton*) agar tampilan estetika visual aplikasi saat memuat data terlihat jauh lebih modern dan profesional.

---

## 9. AI Usage Log
Log penggunaan AI terdokumentasi secara lengkap dan terpisah pada berkas [AI_USAGE_LOG.md](AI_USAGE_LOG.md) sesuai dengan format tabel kebijakan penggunaan AI pada dokumen soal PTS.

---

## 10. Panduan Git Commit (Minimal 8 Meaningful Commits)
Jalankan perintah berikut di terminal secara bertahap untuk memenuhi syarat minimal 8 commit:

```bash
git init
git add index.html
git commit -m "init project structure"

git add css/style.css
git commit -m "create responsive layout"

git add js/script.js
git commit -m "add API configuration"

git commit -am "implement fetch data"

git commit -am "render data to DOM"

git commit -am "add feature by NIM"

git commit -am "implement form validation"

git commit -am "handle loading and errors"

git add README.md
git commit -m "add complete documentation and questions"

git tag v0.1-PTS
```
