# 📌 MyTask Manager

**MyTask Manager** adalah aplikasi web manajemen tugas modern yang memungkinkan pengguna untuk mengatur, memantau, dan menyelesaikan tugas-tugas mereka secara efisien. Aplikasi ini dibangun dengan teknologi **React.js** untuk frontend dan **Python Pyramid + PostgreSQL** untuk backend, serta dirancang dengan antarmuka yang bersih dan responsif.

---

## 📝 Deskripsi Aplikasi

MyTask Manager membantu pengguna untuk:
- Membuat dan mengelola daftar tugas.
- Mengelompokkan tugas ke dalam kategori tertentu.
- Melihat progres penyelesaian tugas secara visual.
- Menggunakan sistem login dan register untuk manajemen user.
- Mendukung multi-user dengan database relational PostgreSQL.

---

## 📦 Dependensi Paket

### Backend (Python - Pyramid):
- `pyramid`
- `pyramid_jinja2`
- `SQLAlchemy`
- `alembic`
- `psycopg2-binary`
- `bcrypt`
- `zope.sqlalchemy`
- `pyramid_tm`
- `waitress`

### Frontend (React.js):
- `react-router-dom`
- `axios`
- `tailwindcss`
- `@heroicons/react`
- `react-icons`

> Pastikan `Node.js`, `npm`, dan `Python` telah terinstal di sistem Anda.

---

## ⚙️ Fitur Aplikasi

### 🔐 Autentikasi
- Login dan Register user
- Password disimpan menggunakan hashing `bcrypt`

### 📂 Manajemen Tugas
- Tambah, edit, hapus, dan tandai tugas sebagai selesai
- Filter tugas berdasarkan kategori

### 🗃️ Manajemen Kategori
- Tambah, edit, dan hapus kategori tugas
- Kategori terhubung ke user dan tugas secara relasional

### 📊 Dashboard
- Statistik visual: jumlah tugas, progres penyelesaian, daftar tugas terbaru
- Tampilan modern dengan animasi dan gradient UI

### 🛡️ Keamanan
- Proteksi API dengan middleware
- Validasi input pada form

---

## 📚 Referensi

- [Pyramid Web Framework Documentation](https://docs.pylonsproject.org/projects/pyramid/en/latest/)
- [SQLAlchemy ORM](https://www.sqlalchemy.org/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [React.js Official Docs](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [bcrypt for Python](https://pypi.org/project/bcrypt/)

---

📌 _Proyek ini dikembangkan sebagai bagian dari Tugas Besar Pemrograman Web 2024/2025 di Institut Teknologi Sumatera._