<template>
    <section class="proses-section">
      <div class="proses-container">
        <div class="step" v-for="(step, index) in steps" :key="index">
          <div class="card-proses">
            <span class="step-number">#{{ step.no }}</span>
            <h3>{{ step.title }}</h3>
            <p>{{ step.desc }}</p>
          </div>
        </div>
        <div class="timeline-line"></div>
        <div class="trophy">🏆</div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: "TimelineProcess",
    data() {
      return {
        steps: [
          { no: 1, title: "Isi biodata Mahasiswa", desc: "Mengisi nama, nrp, angkatan dari pihak yang melakukan pengajuan surat" },
          { no: 2, title: "Pilih Jenis Layanan", desc: "Pilih jenis layanan yang ingin diakses" },
          { no: 3, title: "Isi Form dan Upload File Pendukung", desc: "Isi form sesuai masing-masing layanan dan upload file yang diperlukan" },
          { no: 4, title: "Dicek Oleh Petugas", desc: "Petugas akan mengecek form yang telah diisi" },
          { no: 5, title: "Proses Pengurusan Surat", desc: "Surat akan diproses oleh petugas" },
          { no: 6, title: "Selesai", desc: "Pihak yang mengajukan surat akan dikabari ketika surat sudah siap digunakan" },
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .proses-section {
    background-color: #003366;
    padding: 3rem 1.5rem;
    display: flex;
    justify-content: center;
  }
  
  .proses-container {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    max-width: 1000px;
  }
  
  /* Menghilangkan posisi baris ganjil/genap agar tidak "patah" di layar kecil */
  .step {
    display: flex;
    justify-content: center;
  }
  
  .card-proses {
    background-color: rgba(255, 255, 255, 0.8); /* transparan untuk efek glassy */
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    padding: 1rem;
    border-radius: 1rem;
    width: 100%;
    max-width: 250px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .step-number {
    color: #c1121f;
    font-weight: bold;
    font-size: 0.95rem;
  }
  
  h3 {
    font-size: 1rem;
    margin: 0.5rem 0;
  }
  
  p {
    font-size: 0.85rem;
    color: #333;
  }
  
  .timeline-line {
    display: none; /* Sembunyikan garis horizontal di mobile */
  }
  
  .trophy {
    display: none; /* Sembunyikan di mobile juga */
  }
  
  /* Media Query untuk layar besar (tampilkan garis dan trophy) */
  @media (min-width: 768px) {
    .proses-container {
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, auto);
    }
  
    .step:nth-child(odd) {
      grid-row: 1;
    }
  
    .step:nth-child(even) {
      grid-row: 2;
      margin-top: 2rem;
    }
  
    .timeline-line {
      display: block;
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 2px;
      background-color: #fff;
      z-index: 1;
    }
  
    .trophy {
      display: block;
      position: absolute;
      right: -2rem;
      top: 50%;
      transform: translateY(-50%);
      font-size: 2rem;
      z-index: 2;
    }
  }
  </style>
  
  