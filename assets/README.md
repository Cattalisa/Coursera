assets/ — Petunjuk penggunaan

Tujuan
- Menyimpan referensi file gambar yang digunakan oleh proyek.

Struktur
- assets/
  - images/         <- tempat taruh file gambar (PNG, JPG, webp, dll)
  - assets.json     <- peta kunci -> path lokal (atau fallback URL)

Contoh `assets/assets.json`:

{
  "userPhoto": "assets/images/user-photo.png",
  "institutionLogo": "assets/images/institution-logo.png",
  "certImage": "assets/images/cert-image.png",
  "previewImage": "assets/images/preview-img.png",
  "placeholders": {
    "userPhoto": "https://via.placeholder.com/150",
    "institutionLogo": "https://via.placeholder.com/50",
    "certImage": "https://via.placeholder.com/800x560"
  }
}

Cara pakai
1. Taruh file gambar di `assets/images/` dengan nama sesuai kunci di `assets.json`.
2. Di `cert-data.json` ganti URL gambar dengan path relatif, misal:
   "photo": "assets/images/user-photo.png"
3. Atau, di `script.js` Anda dapat memuat `assets/assets.json` terlebih dahulu dan memilih asset lokal lalu fallback ke `placeholders`.

Contoh snippet untuk `script.js`:

```js
// muat peta asset lalu gunakan nilai-nilai tersebut saat populasi
const assets = await fetch('assets/assets.json').then(r => r.json());
const userPhoto = assets.userPhoto || assets.placeholders.userPhoto;
document.getElementById('user-photo').src = userPhoto;
```

Catatan
- File gambar tidak dibuat otomatis; tambahkan sendiri ke folder `assets/images/`.
- Gunakan path relatif sehingga file dapat di-serve bersama proyek.
