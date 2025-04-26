<template>
  <section class="hero-section">
  <div class="overlay"></div>
  <div class="overlay-content">
    <h1>WELCOME TO DTI-CARE</h1>
    <p>
      “DTI CARE (Department of Information Technology – Customer Assistance & Request for Everyone)” adalah platform layanan daring yang disediakan oleh Departemen Teknologi Informasi ITS.
      <br><br>
      Melalui DTI CARE, mahasiswa dapat dengan mudah mengajukan berbagai jenis permohonan surat, seperti surat tugas, surat rekomendasi, peminjaman ruangan, hingga surat pengantar kerja praktik dan tugas akhir.
      <br><br>
      Kami hadir untuk mempermudah akses layanan akademik dan administratif secara cepat, transparan, dan efisien.
    </p>
  </div>
</section>

  <div class="overlay-layanan">
    <section class="layanan-section">
      <div class="layanan-container">
        <div class="card-container">
          <SuratCard 
            title="Surat Peminjaman" 
            description="Ajukan surat peminjaman ruangan atau alat untuk keperluan akademik." 
            image="peminjaman.png"
          />
          <SuratCard 
            title="Surat Pengantar Pengambilan Data TA" 
            description="Diperlukan untuk mengambil data dari instansi untuk Tugas Akhir." 
            image="data-ta.png"
          />
          <SuratCard 
            title="Surat Pengantar Kerja Praktik" 
            description="Digunakan untuk mendaftar kerja praktik di perusahaan/instansi." 
            image="kerja-praktik.png"
          />
          <SuratCard 
            title="Surat Rekomendasi Exchange/Beasiswa/Lomba" 
            description="Surat rekomendasi resmi dari jurusan untuk keperluan beasiswa dan lainnya." 
            image="rekomendasi.png"
          />
        </div>
      </div>
    </section>
  </div>

  <div class="overlay-process">
    <section class="process-section">
      <TimelineProcess />
    </section>
  </div>

  <footer class="footer">
    <div class="footer-content">
      <p><strong>DEPARTEMEN TEKNOLOGI INFORMASI</strong></p>
      <p>Gedung Tower 2, Lantai 2, Kampus ITS Sukolilo</p>
      <p>Surabaya, Indonesia 60111</p>
      <p>Phone: +62 31-5994251-54 (Hunting)</p>
      <p>Mobile: +62 81234511434</p>
      <p>E-mail: tinformasi@its.ac.id</p>
    </div>
  </footer>
</template>

<script>
import SuratCard from "@/components/SuratCard.vue";
import TimelineProcess from "@/components/TimelineProcess.vue";

export default {
  name: "HomePage",
  components: {
    SuratCard,
    TimelineProcess
  }
};
</script>

<style scoped>
.hero-section {
  min-height: 100vh;
  background-image: url('@/assets/background.png');
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}

.hero-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 400px;
  background: linear-gradient(to top, rgba(73, 219, 255, 0.4), transparent);
  z-index: 2; /* Shadow biru di atas overlay hitam */
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    rgba(0, 0, 0, 0.7) 0%, 
    rgba(0, 0, 0, 0.3) 50%, 
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 1; /* Overlay hitam */
}

.overlay-content {
  position: relative;
  z-index: 3; /* Text di atas semua */
  color: white;
  padding: 5rem 3rem;
  text-align: center;
  animation: fadeIn 1.5s ease-out forwards; /* 🔥 Tambah animasi */
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

h1 {
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

p {
  max-width: 100%;
  line-height: 1.6;
  word-break: break-word;
  text-align: justify;
}



/* Layanan & Process Section */
.overlay-layanan,
.overlay-process {
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
}

.layanan-section,
.process-section {
  background-image: url('@/assets/background.png');
  background-size: cover;
  background-position: center;
  position: relative;
  min-height: 100vh;
  z-index: 1;
  padding: 3rem 1rem;
}

.layanan-section::after,
.process-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 400px;
  background: linear-gradient(to top, rgba(73, 219, 255, 0.4), transparent);
  z-index: 0;
}

.layanan-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  background-color: #003366;
  padding: 2rem;
  border-radius: 2rem;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}

/* Footer */
.footer {
  background-color: #003366;
  color: white;
  text-align: center;
  padding: 2rem 1rem;
  font-size: 0.95rem;
}
.footer-content p {
  margin: 0.3rem 0;
}

/* 📱 Responsif untuk Mobile */
@media (max-width: 768px) {
  .hero-content {
    padding: 2rem 1rem;
  }
  h1 {
    font-size: 2rem;
  }
  p {
    font-size: 0.9rem;
  }
  .layanan-container {
    padding: 1rem;
    flex-direction: column;
  }
  .card-container {
    flex-direction: column;
    gap: 1rem;
  }
  .layanan-section,
  .process-section {
    padding: 2rem 1rem;
  }
}
</style>
