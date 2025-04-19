<template>
    <section class="hero-section">
      <div class="overlay">
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

    <!-- Section Layanan Surat -->
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
      <!-- Footer -->
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
  height: calc(100vh - 70px);
  background-image: url('@/assets/background.png');
  background-size: cover;
  background-position: center;
  position: relative;
}
.hero-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 400px; /* tinggi shadow */
  background: linear-gradient(to top, rgba(73, 219, 255, 0.4), transparent);
  z-index: 0;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  padding: 5rem 3rem;
  height: 77.5%;
}
h1 {
  font-size: 4rem;
  font-weight: bold;
}
.overlay-layanan {
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  padding: 0rem 0rem;
  height: 77.5%;
}
.layanan-section {
  background-image: url('@/assets/background.png');
  background-size: cover;
  background-position: center;
  position: relative;
  height: calc(100vh - 70px);
  z-index: 1;
  padding: 3rem 1rem;
  text-align: center;
  justify-content: center;
}
.layanan-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 400px; /* tinggi shadow */
  background: linear-gradient(to top, rgba(73, 219, 255, 0.4), transparent);
  z-index: 0;
}
.layanan-section h2 {
  background-color: #f5f5f5;
  color: #003366;
  margin-bottom: 0;
}

.layanan-container {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
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
.footer {
  background-color: #003366;
  color: white;
  text-align: center;
  padding: 2rem 1rem;
  font-size: 0.95rem;
}
.overlay-process {
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  padding: 0rem 0rem;
  height: 77.5%;
}
.process-section {
  background-image: url('@/assets/background.png');
  height: calc(100vh - 70px);
  padding: 3rem 1rem;
  background-size: cover;
  background-position: center;
  position: relative;
}
.process-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 400px; /* tinggi shadow */
  background: linear-gradient(to top, rgba(73, 219, 255, 0.4), transparent);
  z-index: 0;
}
.footer-content p {
  margin: 0.3rem 0;
}
</style>
