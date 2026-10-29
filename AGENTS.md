# AGENTS.md

## Tentang repo

- Bukan git repo. Isinya hanya satu folder: `portfolio/` — website portofolio statis milik Kalyca Suganda.
- **Tanpa build step, framework, bundler, lint, atau test.** Jangan menambahkan React/Vite/tooling kecuali diminta eksplisit.
- Hanya dua file kode:
  - `portfolio/index.html` — seluruh markup + **semua CSS di dalam `<style>`** (~1800 baris, cari blok dengan komentar `=====`).
  - `portfolio/script.js` — data (konstanta `SKILLS`, `PROJECTS`, dll.), rendering, dan semua interaksi vanilla JS.
- `portfolio/server.js` = server statis opsional (Node http, CommonJS, port `process.env.PORT` atau 3000). `package.json` tidak punya dependency sama sekali (`npm install` hanya membuat lockfile kosong).

## Menjalankan & verifikasi

- **Node.js TIDAK terpasang di mesin ini** → `npm start` gagal. Cara menjalankan: buka `index.html` langsung (file://) atau server statis apa pun yang menunjuk folder `portfolio/`.
- Tidak ada langkah build — edit file, muat ulang browser, selesai.
- Verifikasi manual yang berarti: tidak ada error di console, dan foto profil sudah diproses (`document.querySelectorAll('.hero-photo img, .about-photo')` → `img.dataset.processed === 'true'`).
- **Quirk file://** — canvas `getImageData` diblokir untuk gambar lokal, jadi di file:// background merah foto memakai fallback filter SVG (tetap tampil rapi). Fitur penuh (hapus background via canvas) hanya lewat http server.

## Fakta penting yang mudah salah

- **Ikon**: memakai `https://cdn.simpleicons.org/<slug>/<warna>`, TAPI slug `linkedin` dan `visualstudiocode` sudah dihapus dari simple-icons (404). Keduanya sengaja diarahkan ke `cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/...` — jangan dikembalikan ke simpleicons. Semua ikon & font (Google Fonts) butuh internet.
- **Urutan `init()` di script.js wajib**: `renderProjects()`/`renderSkills()` SEBELUM `initReveal()`. Kalau dibalik, kartu hasil render tidak ter-observe IntersectionObserver dan tetap `opacity: 0` (konten hilang).
- Elemen `.reveal` mulai tersembunyi; yang sudah di viewport langsung diberi class `visible`, sisanya menunggu scroll. Markup `.reveal` yang di-inject dinamis harus ikut di-observe.
- Form contact **tidak mengirim ke mana pun** (simulasi `setTimeout` di `initContactForm`). Komentar di sana menandai titik penggantian dengan `fetch` bila ada backend.

## Foto profil

- File: `images/profile.jpeg` (pasfoto 1122×1402, background merah), direferensikan 2× di index.html (Hero & About).
- Pipeline: `initProfilePhotoHarmony()` menghapus background merah via canvas → src diganti data-URL PNG, `data-processed="true"`, kelas `profile-blend-filter` dilepas. Fallback: filter SVG `#blend-profile-bg` (ada di akhir index.html).
- Mengganti foto: cukup timpa file dengan nama & format sama; pipeline otomatis menyesuaikan foto lain berbackground merah.

## CV (prioritas user: hubungkan CV ke website)

- CV asli (**CV ATS Kalyca Suganda.pdf**, ±225 KB) sudah terpasang sebagai `portfolio/cv-kalyca-suganda.pdf`.
- Dua tombol **"Download CV"** (navbar desktop + menu mobile) menunjuk file itu relatif dari root `portfolio/` dengan **`target="_blank"` tanpa atribut `download`** — tujuannya CV *terbuka/ditampilkan* di tab baru viewer PDF (user bisa download dari sana). Jangan kembalikan ke `download` tanpa diminta.
- `server.js` punya `'.pdf': 'application/pdf'` agar browser menampilkan PDF inline, bukan mengunduhnya diam-diam.
- Mengganti CV: timpa file dengan nama sama (tanpa ubah kode). Jika nama file berubah, update 2 `href` di index.html.

## Konvensi

- Seluruh teks UI, label, dan alt text berbahasa Indonesia.
- Font: heading Sora, body Plus Jakarta Sans (variabel di `:root`, bersama warna navy `#060f24` + aksen `#38bdf8`).
- Aksesibilitas yang sudah ada jangan diturunkan: skip-link, `aria-label` pada ikon tanpa teks, `aria-live` pada status form, focus-visible, `prefers-reduced-motion`.
- File UTF-8 tanpa BOM. Folder kerja berada di OneDrive dan namanya mengandung spasi (`Default Project`) — kutip path dengan benar di skrip.
