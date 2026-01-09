async function fetchCertificates() {
    try {
        const r = await fetch('cert-data.json');
        return await r.json();
    } catch (e) {
        console.error('Gagal memuat cert-data.json', e);
        return [];
    }
}

function updateEl(id, value, attr = 'text') {
    const el = document.getElementById(id);
    if (!el) return; // Lewati jika ID tidak ditemukan di HTML
    
    if (attr === 'src') el.src = value;
    else if (attr === 'href') el.href = value;
    else el.textContent = value;
}

async function displayCertificate() {
    const certificates = await fetchCertificates();
    const urlParams = new URLSearchParams(window.location.search);
    const certId = urlParams.get('id');

    // Cari data berdasarkan ID, jika tidak ada ambil data pertama (indeks 0)
    const data = certId 
        ? certificates.find(c => c.id.toUpperCase() === certId.toUpperCase()) 
        : certificates[0];

    if (data) {
        // Isi Teks
        updateEl('course-title', data.course);
        updateEl('user-name', data.name);
        updateEl('user-name-small', data.name);
        updateEl('cert-date', data.date);
        updateEl('duration', data.hours + ' jam (kira-kira)');
        updateEl('uni-name', data.institution);
        updateEl('rating', data.rating);
        updateEl('enrolled', data.enrolled);

        // Isi Gambar
        updateEl('user-photo', data.photo, 'src');
        updateEl('cert-image', data.image, 'src');
        updateEl('uni-logo', data.institutionLogo, 'src');

        // Tombol Download
        updateEl('btn-download', data.pdf_url, 'href');

        // Render Skills (Daftar Keahlian)
        const skillBox = document.getElementById('skills-container');
        if (skillBox && data.skills) {
            skillBox.innerHTML = data.skills.map(s => 
                `<span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium border border-gray-200">${s}</span>`
            ).join('');
        }
    }
}

displayCertificate();
