# API Documentation

## User Endpoints

### POST - /api/login

#### Request Body

```json
{
  "email": "",
  "password": ""
}
```

#### Response (Success)

```json
{
  "token": "",
  "email": "",
  "role": "",
  "message": "Berhasil masuk."
}
```

#### Response (Error)

```json
{
  "message": ""
}
```

---

### POST - /api/register

#### Request Body

```json
{
  "email": "",
  "password": ""
}
```

#### Response (Success)

```json
{
  "email": "",
  "message": "Verifikasi akun terlebih dahulu."
}
```

---

### POST - /api/otp

#### Request Body

```json
{
  "email": "",
  "type": "register/forgot",
  "otp": ""
}
```

#### Response (Success)

```json
{
  "token": "",
  "email": "",
  "message": "Selamat akun berhasil di verifikasi."
}
```

---

### GET - /api/otp

#### Request Parameter

```json
{
  "email": "",
  "type": "register/forgot"
}
```

#### Response (Success)

```json
{
  "message": "Otp berhasil dikirim."
}
```

---

### POST - /api/forgot

#### Request Body

```json
{
  "email": "",
  "type": "register/forgot"
}
```

#### Response (Success)

```json
{
  "email": "",
  "message": "Verifikasi akun terlebih dahulu."
}
```

---

### POST - /api/reset_password

#### Request Body

```json
{
  "token": "",
  "email": "",
  "new_password": ""
}
```

#### Response (Success)

```json
{
  "email": "",
  "message": "Kata sandi berhasil diubah."
}
```

---

### GET - /api/me

#### Request Parameter

```json
{
  "token": ""
}
```

#### Response (Success)

```json
{
  "token": "",
  "email": "",
  "role": "",
  "message": "Berhasil masuk."
}
```

---

### GET - /api/riwayat_pembayaran

#### Request Bearer

```json
{
  "token": ""
}
```

#### Response (Success)

```json
{
  "data": [
    {
      "id": "",
      "type": "Pembayaran SPP/Daftar Ulang Siswa Baru/Daftar Ulang Kenaikan Kelas/Pembayaran Ijazah",
      "status": "lunas/tidak",
      "tanggal": "",
      "tagihan": ""
    }
  ]
}
```

---

## Admin Endpoints

### POST - /api/tahun_ajaran

#### Request Bearer

```json
{
  "token": ""
}
```

#### Request Body

```json
{
  "tahun_ajaran": "",
  "besar_spp": "",
  "biaya_daftar": ""
}
```

#### Response (Success)

```json
{
  "message": "Berhasil menambahkan tahun ajaran."
}
```

---

### PATCH - /api/tahun_ajaran/:id

#### Request Bearer

```json
{
  "token": ""
}
```

#### Request Body

```json
{
  "besar_spp": "",
  "biaya_daftar": ""
}
```

#### Response (Success)

```json
{
  "message": "Berhasil merubah tahun ajaran."
}
```

---

### GET - /api/tahun_ajaran

#### Request Bearer

```json
{
  "token": ""
}
```

#### Response (Success)

```json
{
  "data": [
    {
      "id": "",
      "tahun_ajaran": "",
      "besar_spp": "",
      "biaya_daftar": ""
    }
  ]
}
```

---

### GET - /api/tahun_ajaran/:id

#### Request Bearer

```json
{
  "token": ""
}
```

#### Response (Success)

```json
{
  "data": {
    "id": "",
    "tahun_ajaran": "",
    "besar_spp": "",
    "biaya_daftar": ""
  }
}
```

---

### POST - /api/kelas

#### Request Bearer

```json
{
  "token": ""
}
```

#### Request Body

```json
{
  "jenjang": "",
  "tahun_ajaran": ""
}
```

#### Response (Success)

```json
{
  "message": "Berhasil menambahkan kelas."
}
```

---

### PATCH - /api/kelas/:id

#### Request Bearer

```json
{
  "token": ""
}
```

#### Request Body

```json
{
  "jenjang": "",
  "tahun_ajaran": ""
}
```

#### Response (Success)

```json
{
  "message": "Berhasil merubah kelas."
}
```

---

### DELETE - /api/kelas/:id

#### Request Bearer

```json
{
  "token": ""
}
```

#### Request Body

```json
{
  "jenjang": "",
  "tahun_ajaran": ""
}
```

#### Response (Success)

```json
{
  "message": "Berhasil merubah kelas."
}
```

---

### GET (User) - /api/daftar_siswa

#### Request Bearer

```json
{
  "token": ""
}
```

#### Response (Success)

```json
{
  "data": [
    {
      "id": "",
      "imgUrl": "",
      "nama": "",
      "jenis_kelamin": "",
      "status": "pendaftar/siswa/keluar/lulus",
      "tahun_ajaran": "",
      "nis": "",
      "no_pendaftaran": "",
      "jenjang": "",
      "kelas": "",
      "created_at": ""
    }
  ]
}
```

---

### POST (User) dan PATCH (User/Admin) - /api/daftar_siswa {PATCH + /:id}

#### Request Body

```json
{
  "siswa": {
    "nama": "",
    "tempat_lahir": "",
    "tanggal_lahir": "",
    "umur": "",
    "jenis_kelamin": "",
    "agama": "",
    "tinggi_badan": "",
    "berat_badan": ""
  },
  "wali": {
    "nama_ibu": "",
    "nama_bapak": "",
    "nama_wali": "",
    "pekerjaan": "",
    "no_telepon": "",
    "alamat": ""
  },
  "akta": "File",
  "kartu_keluarga": "File",
  "foto": "File", // JPEG, PNG, PDF - MAX.1MB
  "jenjang": "",
  "tahun_ajaran": ""
}
```

#### Response (Success)

```json
{
  "id": "",
  "message": "Pendaftaran berhasil silahkan selesaikan pembayaran."
}
```

---

### GET (User/Admin) - /api/daftar_siswa/:id

#### Request Bearer

```json
{
  "token": ""
}
```

#### Response (Success)

```json
{
  "data": {
    "id": "",
    "status": "",
    "siswa": {
      "nama": "",
      "tempat_lahir": "",
      "tanggal_lahir": "",
      "umur": "",
      "jenis_kelamin": "",
      "agama": "",
      "tinggi_badan": "",
      "berat_badan": ""
    },
    "wali": {
      "nama_ibu": "",
      "nama_bapak": "",
      "nama_wali": "",
      "pekerjaan": "",
      "no_telepon": "",
      "alamat": ""
    },
    "akta": "File",
    "kartu_keluarga": "File",
    "foto": "File", // JPEG, PNG, PDF - MAX.1MB
    "jenjang": "",
    "tahun_ajaran": ""
  }
}
```

---

### GET (Admin) - /api/siswa {query=status}

#### Request Bearer

```json
{
  "token": ""
}
```

#### Response (Success)

```json
{
  "data": [
    {
      "id": "",
      "imgUrl": "",
      "nama": "",
      "jenis_kelamin": "",
      "status": "pendaftar/siswa/keluar/lulus",
      "tahun_ajaran": "",
      "nis": "",
      "no_pendaftaran": "",
      "jenjang": "",
      "kelas": ""
    }
  ]
}
```

---

### POST (Admin) - /api/siswa/acc

#### Request Bearer

```json
{
  "token": ""
}
```

#### Request Body

```json
{
  "siswa_id": "",
  "kelas": ""
}
```

---

### POST (Admin) - /api/siswa/keluar

#### Request Bearer

```json
{
  "token": ""
}
```

#### Request Body

```json
{
  "siswa_id": "",
  "keterangan": ""
}
```

---

### POST (Admin) - /api/siswa/lulus

#### Request Bearer

```json
{
  "token": ""
}
```

#### Request Body

```json
{
  "siswa_id": "",
  "ijazah": "File"
}
```
