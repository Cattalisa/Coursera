// 1. Fungsi untuk mengambil data dari JSON
async function fetchCertificates() {
    try {
        const r = await fetch('cert-data.json');
        return await r.json();
    } catch (e) {
        console.error('Gagal memuat cert-data.json', e);
        return [];
    }
}

// 2. Fungsi utama untuk menampilkan sertifikat berdasarkan ID di URL
async function displayCertificate() {
    const certificates = await fetchCertificates();

    // Mengambil ID dari URL (Contoh: website.com/?id=ABCDE)
    const urlParams = new URLSearchParams(window.location.search);
    const certId = urlParams.get('id') ? urlParams.get('id').toUpperCase() : null;

    if (!certId) {
        console.warn("ID tidak ditemukan di URL. Menampilkan data pertama sebagai default.");
    }

    // Mencari data yang ID-nya cocok dengan yang ada di URL
    // Jika ID di URL kosong, ambil data pertama (indeks 0)
    const data = certId 
        ? certificates.find(c => c.id === certId) 
        : certificates[0];

    if (data) {
        // Mengisi teks identitas
        document.getElementById('user-name').textContent = data.name;
        document.getElementById('user-name-small').textContent = data.name;
        document.getElementById('cert-date').innerText = data.date;
        document.getElementById('duration').innerText = data.hours + ' jam (kira-kira)';
        document.getElementById('course-title').innerText = data.course;

        // Mengisi gambar (Foto profil & Sertifikat)
        document.getElementById('user-photo').src = data.photo;
        document.getElementById('cert-image').src = data.image;

        // Menangani tombol download
        const downloadBtn = document.getElementById('btn-download');
        if (data.pdf_url) {
            downloadBtn.href = data.pdf_url;
            downloadBtn.setAttribute('download', `Sertifikat-${data.name}.pdf`);
        }
    } else {
        // Jika kode ID salah atau tidak ditemukan di JSON
        document.body.innerHTML = `<div style="text-align:center; padding-top:50px;">
            <h1>404 - Sertifikat Tidak Valid</h1>
            <p>Maaf, kode kredensial <b>${certId}</b> tidak terdaftar di sistem kami.</p>
        </div>`;
    }
}

// Jalankan fungsi saat halaman dimuat
displayCertificate();