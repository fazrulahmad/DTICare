<template>
    <div class="form-layanan-container">
      <div class="form-card">
        <h1 class="form-title">Form Pengajuan Surat</h1>
  
        <label class="form-label">Pilih Jenis Layanan</label>
        <select v-model="jenis" class="form-select">
          <option disabled value="">-- Pilih Layanan --</option>
          <option value="peminjaman">Peminjaman Ruangan</option>
          <option value="data-ta">Surat Pengantar Pengambilan Data TA</option>
          <option value="kp">Surat Pengantar Permohonan KP</option>
          <option value="rekomendasi">Surat Rekomendasi Exchange/Beasiswa/Lomba</option>
        </select>
  
        <transition name="fade">
          <component v-if="komponenForm" :is="komponenForm" />
        </transition>
      </div>
    </div>
  </template>
  
  <script>
  import FormPeminjaman from '../components/forms/FormPeminjaman.vue'
  import FormDataTA from '../components/forms/FormDataTA.vue'
  import FormKP from '../components/forms/FormKP.vue'
  import FormRekomendasi from '../components/forms/FormRekomendasi.vue'
  
  export default {
    data() {
      return {
        jenis: ''
      }
    },
    computed: {
      komponenForm() {
        switch (this.jenis) {
          case 'peminjaman':
            return FormPeminjaman
          case 'data-ta':
            return FormDataTA
          case 'kp':
            return FormKP
          case 'rekomendasi':
            return FormRekomendasi
          default:
            return null
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .form-layanan-container {
    min-height: 100vh;
    background: #f3f4f6;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 3rem;
    font-family: 'Segoe UI', sans-serif;
  }
  
  .form-card {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    width: 100%;
    max-width: 700px;
  }
  
  .form-title {
    font-size: 1.75rem;
    font-weight: bold;
    color: #003366;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  .form-label {
    font-weight: 600;
    margin-bottom: 0.5rem;
    display: block;
  }
  
  .form-select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    margin-bottom: 1.5rem;
    font-size: 1rem;
    transition: border-color 0.2s ease;
  }
  
  .form-select:focus {
    border-color: #003366;
    outline: none;
  }
  
  /* Simple fade transition */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  </style>
  