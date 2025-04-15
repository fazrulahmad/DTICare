<template>
  <div>
    <div class="hero-section">
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
    </div>

    <!-- Section Layanan Surat -->
    <section class="layanan-section">
      <h2>Layanan Surat</h2>
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

export default {
  name: "HomePage",
  components: {
    SuratCard
  }
};
</script>

<style scoped>
.hero-section {
  height: calc(100vh - 70px);
  background-image: url('@/assets/dti-care-bg.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
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
.layanan-section {
  height: calc(100vh - 70px);
  background-color: #f5f5f5;
  padding: 2rem 4rem;
  text-align: center;
}
.layanan-section h2 {
  background-color: #f5f5f5;
  color: #003366;
  margin-bottom: 2rem;
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
.footer-content p {
  margin: 0.3rem 0;
}
</style>
