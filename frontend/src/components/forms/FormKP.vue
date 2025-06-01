<template>
  <div class="form-wrapper">
    <h2 class="form-title">Form Pengajuan Kerja Praktik (KP)</h2>
    <form @submit.prevent="handleSubmit" class="form-body">
      
      <!-- Section: Data Mahasiswa -->
      <div class="section-header">
        <h3 class="section-title">Data Mahasiswa</h3>
      </div>
      
      <div v-for="i in 4" :key="i" class="student-group">
        <div class="student-header">
          <h4 class="student-title">Mahasiswa {{ i }}</h4>
        </div>
        
        <div class="input-row">
          <div class="input-group">
            <input 
              v-model="formData[`nrp${i}`]" 
              type="text" 
              :placeholder="`NRP Mahasiswa ${i}`" 
              class="form-input" 
            />
          </div>
          <div class="input-group">
            <input 
              v-model="formData[`nama${i}`]" 
              type="text" 
              :placeholder="`Nama Mahasiswa ${i}`" 
              class="form-input" 
            />
          </div>
        </div>
        
        <div class="input-row">
          <div class="input-group">
            <input 
              v-model="formData[`email${i}`]" 
              type="email" 
              :placeholder="`Email Mahasiswa ${i}`" 
              class="form-input" 
            />
          </div>
          <div class="input-group">
            <input 
              v-model="formData[`nomer${i}`]" 
              type="tel" 
              :placeholder="`No HP Mahasiswa ${i}`" 
              class="form-input" 
            />
          </div>
        </div>
        
        <div class="input-group">
          <input 
            v-model="formData[`sks${i}`]" 
            type="number" 
            :placeholder="`Jumlah SKS Mahasiswa ${i}`" 
            class="form-input sks-input" 
            min="1"
            max="24"
          />
        </div>
      </div>

      <!-- Section: Data Institusi -->
      <div class="section-header">
        <h3 class="section-title">Data Institusi Tujuan KP</h3>
      </div>
      
      <div class="input-row">
        <div class="input-group">
          <input 
            v-model="formData.pejabat" 
            type="text" 
            placeholder="Nama Pejabat" 
            class="form-input" 
            required
          />
        </div>
        <div class="input-group">
          <input 
            v-model="formData.jabatan" 
            type="text" 
            placeholder="Jabatan Pejabat" 
            class="form-input" 
            required
          />
        </div>
      </div>
      
      <div class="input-group">
        <input 
          v-model="formData.institusi" 
          type="text" 
          placeholder="Nama Institusi" 
          class="form-input" 
          required
        />
      </div>
      
      <div class="input-group">
        <textarea 
          v-model="formData.alamat" 
          placeholder="Alamat Institusi" 
          class="form-input form-textarea" 
          rows="3"
          required
        ></textarea>
      </div>
      
      <div class="input-group">
        <input 
          v-model="formData.nomertelp" 
          type="tel" 
          placeholder="No Telepon Institusi" 
          class="form-input" 
          required
        />
      </div>

      <!-- Section: Periode KP -->
      <div class="section-header">
        <h3 class="section-title">Periode Kerja Praktik</h3>
      </div>
      
      <div class="input-group">
        <label class="input-label">Durasi KP</label>
        <div class="duration-input-wrapper">
          <input 
            v-model="formData.rencanaperiode" 
            type="number" 
            placeholder="Durasi KP" 
            class="form-input duration-input" 
            min="1"
            max="12"
            required
          />
          <span class="duration-unit">Bulan</span>
        </div>
      </div>
      
      <div class="input-row">
        <div class="input-group">
          <label class="input-label">Tanggal Mulai Kerja Praktik</label>
          <input 
            v-model="formData.tanggalmulai" 
            type="date" 
            class="form-input" 
            required
          />
        </div>
        <div class="input-group">
          <label class="input-label">Tanggal Selesai Kerja Praktik</label>
          <input 
            v-model="formData.tanggalselesai" 
            type="date" 
            class="form-input" 
            required
          />
        </div>
      </div>

      <!-- Section: Informasi Tambahan -->
      <div class="section-header">
        <h3 class="section-title">Informasi Tambahan</h3>
      </div>
      
      <div class="input-group">
        <textarea 
          v-model="formData.catatan" 
          placeholder="Catatan Tambahan (opsional)" 
          class="form-input form-textarea"
          rows="4"
        ></textarea>
      </div>
      
      <div class="input-group">
        <input 
          v-model="formData.nama_pengaju" 
          type="text" 
          placeholder="Nama Mahasiswa Pengaju" 
          class="form-input" 
          required
        />
      </div>

      <!-- Tanggal pengajuan otomatis, tidak ditampilkan -->
      <input type="hidden" v-model="formData.haripengajuan" />

      <button type="submit" class="submit-btn" :disabled="isSubmitting">
        <span v-if="isSubmitting">
          <svg class="loading-spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12a9 9 0 11-6.219-8.56"/>
          </svg>
          Memproses...
        </span>
        <span v-else>
          📄 Kirim & Unduh Surat
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
      formData: {
        nrp1: '', nama1: '', email1: '', nomer1: '', sks1: '',
        nrp2: '', nama2: '', email2: '', nomer2: '', sks2: '',
        nrp3: '', nama3: '', email3: '', nomer3: '', sks3: '',
        nrp4: '', nama4: '', email4: '', nomer4: '', sks4: '',
        pejabat: '', jabatan: '', institusi: '', alamat: '', nomertelp: '',
        rencanaperiode: '', tanggalmulai: '', tanggalselesai: '',
        catatan: '', haripengajuan: '', nama_pengaju: ''
      }
    };
  },
  methods: {
    getCurrentDateFormatted() {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = today.getFullYear();
      return `${day}/${month}/${year}`;
    },
    
    async handleSubmit() {
      this.isSubmitting = true;
      this.formData.haripengajuan = this.getCurrentDateFormatted();

      try {
        const response = await axios.post('http://localhost:5000/api/dataKP', this.formData, {
          responseType: 'blob'
        });

        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Surat_Pengajuan_KP.docx');
        document.body.appendChild(link);
        link.click();

        // Reset form
        this.formData = {
          nrp1: '', nama1: '', email1: '', nomer1: '', sks1: '',
          nrp2: '', nama2: '', email2: '', nomer2: '', sks2: '',
          nrp3: '', nama3: '', email3: '', nomer3: '', sks3: '',
          nrp4: '', nama4: '', email4: '', nomer4: '', sks4: '',
          pejabat: '', jabatan: '', institusi: '', alamat: '', nomertelp: '',
          rencanaperiode: '', tanggalmulai: '', tanggalselesai: '',
          catatan: '', haripengajuan: '', nama_pengaju: ''
        };

        link.remove();
        window.URL.revokeObjectURL(url);
        alert('✅ Surat berhasil dibuat dan diunduh!');
      } catch (error) {
        console.error(error);
        alert('❌ Gagal mengirim atau mengunduh surat. Silakan coba lagi.');
      } finally {
        this.isSubmitting = false;
      }
    }
  }
};
</script>

<style scoped>
.form-wrapper {
  max-width: 900px;
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

.student-group {
  padding: 1.5rem;
  background: rgba(249, 250, 251, 0.8);
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  margin-bottom: 1rem;
}

.student-header {
  margin-bottom: 1rem;
}

.student-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #4b5563;
  margin: 0;
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

.input-label {
  font-weight: 600;
  color: #374151;
  font-size: 0.95rem;
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

.form-textarea {
  resize: vertical;
  min-height: 80px;
  line-height: 1.5;
}

.sks-input {
  max-width: 200px;
}

.duration-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  max-width: 250px;
}

.duration-input {
  padding-right: 80px;
  margin: 0;
}

.duration-unit {
  position: absolute;
  right: 1rem;
  color: #6b7280;
  font-weight: 500;
  pointer-events: none;
  background: white;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
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
  
  .student-group {
    padding: 1rem;
  }
  
  .duration-input-wrapper {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .form-wrapper {
    padding: 1rem;
  }
  
  .section-header {
    margin: 1.5rem 0 0.75rem 0;
  }
  
  .sks-input,
  .duration-input-wrapper {
    max-width: 100%;
  }
}
</style>