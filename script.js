async function fetchCertificates() {
    try {
        const r = await fetch('cert-data.json');
        return await r.json();
    } catch (e) {
        console.error('Gagal memuat cert-data.json', e);
        return [];
    }
}

// Fungsi pembantu agar tidak error jika ID di HTML tidak ditemukan
function safeSet(id, value, type = 'text') {
    const el = document.getElementById(id);
    if (!el) return;
    if (type === 'src') el.src = value;
    else if (type === 'href') el.href = value;
    else el.textContent = value;
}

async function displayCertificate() {
    const certificates = await fetchCertificates();
    const urlParams = new URLSearchParams(window.location.search);
    
    // Mengambil ID dari URL (Contoh: ?id=ABCDE)
    let certId = urlParams.get('id');

    // MENCARI DATA: Cari yang ID-nya cocok (Case Insensitive)
    // Jika ID di URL kosong atau tidak ditemukan, ambil data pertama [0]
    const data = certId 
        ? certificates.find(c => c.id.toUpperCase() === certId.toUpperCase()) 
        : certificates[0];

    if (data) {
        // 1. Mengisi Nama & Kursus
        safeSet('user-name', data.name);
        safeSet('user-name-small', data.name);
        safeSet('course-title', data.course);
        safeSet('cert-date', data.date);
        safeSet('duration', data.hours + ' jam (kira-kira)');

        // 2. Mengisi Data Institusi & Rating
        safeSet('uni-name', data.institution);
        safeSet('rating', data.rating);
        safeSet('enrolled', data.enrolled);
        safeSet('uni-logo', data.institutionLogo, 'src');

        // 3. Mengisi Gambar Sertifikat & Preview
        safeSet('cert-image', data.image, 'src');
        safeSet('cert-preview', data.ppdf_url, 'href');

        // 4. Mengisi Tombol Download
        safeSet('btn-download', data.pdf_url, 'href');

        // 5. Render Skills (Daftar Keahlian)
        const skillsContainer = document.getElementById('skills-container');
        if (skillsContainer && data.skills) {
            skillsContainer.innerHTML = data.skills.map(skill => 
                `<span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium border border-gray-200">${skill}</span>`
            ).join('');
        }
    }
}

displayCertificate();

