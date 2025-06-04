<template>
  <div class="form-wrapper">
    <h2 class="form-title">Form Surat Tugas</h2>
    <form @submit.prevent="handleSubmit" class="form-body">
      
      <!-- Section: Data Mahasiswa -->
      <div class="section-header">
        <h3 class="section-title">Data Mahasiswa</h3>
      </div>
      
      <div class="input-row">
        <div class="input-group">
          <input 
            v-model="form.nrp" 
            type="text" 
            placeholder="NRP" 
            class="form-input" 
            required
          />
        </div>
        <div class="input-group">
          <input 
            v-model="form.nama" 
            type="text" 
            placeholder="Nama Lengkap" 
            class="form-input" 
            required
          />
        </div>
      </div>
      
      <div class="input-group">
        <input 
          v-model="form.prodi" 
          type="text" 
          placeholder="Program Studi" 
          class="form-input" 
          required
        />
      </div>

      <!-- Section: Detail Kegiatan -->
      <div class="section-header">
        <h3 class="section-title">Detail Kegiatan</h3>
      </div>
      
      <div class="input-group">
        <input 
          v-model="form.namaKegiatan" 
          type="text" 
          placeholder="Nama Kegiatan (lomba/beasiswa/dll)" 
          class="form-input" 
          required
        />
      </div>
      
      <div class="input-row">
        <div class="input-group">
          <input 
            v-model="form.penyelenggaraKegiatan" 
            type="text" 
            placeholder="Penyelenggara Kegiatan" 
            class="form-input" 
            required
          />
        </div>
        <div class="input-group">
          <input 
            v-model="form.lokasiKegiatan" 
            type="text" 
            placeholder="Lokasi Kegiatan" 
            class="form-input" 
            required
          />
        </div>
      </div>
      
      <div class="input-group">
        <input 
          v-model="form.linkFilePendukung" 
          type="url" 
          placeholder="Link File Pendukung Kegiatan (flyer/poster/dll)" 
          class="form-input" 
        />
      </div>

      <button type="submit" class="submit-btn" :disabled="isSubmitting">
        <span v-if="isSubmitting">
          <svg class="loading-spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12a9 9 0 11-6.219-8.56"/>
          </svg>
          Memproses...
        </span>
        <span v-else>
          📋 Kirim Surat Tugas
        </span>
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isSubmitting: false,
      form: {
        nrp: '',
        nama: '',
        prodi: '',
        namaKegiatan: '',
        penyelenggaraKegiatan: '',
        lokasiKegiatan: '',
        linkFilePendukung: ''
      }
    };
  },
  methods: {
    async handleSubmit() {
      this.isSubmitting = true;
      
      try {
        await axios.post('http://localhost:5000/api/tugas', this.form);
        
        // Reset form setelah submit
        this.form = {
          nrp: '',
          nama: '',
          prodi: '',
          namaKegiatan: '',
          penyelenggaraKegiatan: '',
          lokasiKegiatan: '',
          linkFilePendukung: ''
        };
      } catch (error) {
        this.isSubmitting = false;
      }
    }
  }
};
</script>

<style scoped>
.form-wrapper {
  max-width: 800px;
  margin: 2rem auto;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9));
  backdrop-filter: blur(20px);
  padding: 2.5rem;
  border-radius: 24px;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.1),
    0 8px 16px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  font-family: 'Inter', 'Segoe UI', sans-serif;
}

.form-title {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 2rem;
  text-align: center;
  letter-spacing: -0.5px;
}

.form-body {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-header {
  margin: 2rem 0 1rem 0;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.5rem;
}

.section-header:first-of-type {
  margin-top: 0;
}

.section-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #374151;
  margin: 0;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.input-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-input {
  padding: 1rem 1.25rem;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: #374151;
  font-family: inherit;
}

.form-input:focus {
  border-color: #667eea;
  outline: none;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  transform: translateY(-2px);
}

.form-input:hover {
  border-color: #9ca3af;
  transform: translateY(-1px);
}

.submit-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 16px;
  cursor: pointer;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.loading-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .form-wrapper {
    margin: 1rem;
    padding: 1.5rem;
  }
  
  .form-title {
    font-size: 1.5rem;
  }
  
  .section-title {
    font-size: 1.1rem;
  }
  
  .input-row {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .form-wrapper {
    padding: 1rem;
  }
  
  .section-header {
    margin: 1.5rem 0 0.75rem 0;
  }
}
</style>