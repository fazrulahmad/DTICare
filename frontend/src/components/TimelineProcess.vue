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
  border-radius: 1rem;
}

.proses-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  max-width: 1000px;
  width: 100%;
}

.step {
  width: 100%;
  display: flex;
  justify-content: center;
}

.card-proses {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 1rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
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
  display: none;
}

.trophy {
  display: none;
}

/* Untuk tablet dan desktop */
@media (min-width: 768px) {
  .proses-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, auto);
    gap: 2rem;
  }

  .step {
    width: auto;
    justify-content: center;
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

  
  