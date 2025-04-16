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
    padding: 3rem 3rem;
    display: flex;
    justify-content: center;
  }
  
  .proses-container {
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, auto);
    gap: 2rem;
    max-width: 1000px;
  }
  
  .step:nth-child(odd) {
    grid-row: 1;
  }
  .step:nth-child(even) {
    grid-row: 2;
    margin-top: 2rem;
  }
  
  .card-proses {
    background-color: white;
    padding: 1rem;
    border-radius: 1rem;
    width: 250px;
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
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #fff;
    z-index: 1;
  }
  
  .trophy {
    position: absolute;
    right: -2rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2rem;
    z-index: 2;
  }
  </style>
  