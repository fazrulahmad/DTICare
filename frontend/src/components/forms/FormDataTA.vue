<template>
  <div class="form-wrapper">
    <h2 class="form-title">Form Pengajuan Data Survei TA</h2>
    <form @submit.prevent="handleSubmit" class="form-body">
      
      <!-- Section: Data Mahasiswa -->
      <div class="section-header">
        <h3 class="section-title">Data Mahasiswa</h3>
      </div>
      
      <div v-for="i in 5" :key="i" class="student-group">
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
      </div>

      <!-- Section: Data Institusi -->
      <div class="section-header">
        <h3 class="section-title">Data Institusi Tujuan</h3>
      </div>
      
      <div class="input-group">
        <input 
          v-model="formData.nama_pejabat" 
          type="text" 
          placeholder="Nama Pejabat" 
          class="form-input" 
          required
        />
      </div>
      
      <div class="input-group">
        <input 
          v-model="formData.nama_jabatan" 
          type="text" 
          placeholder="Jabatan Pejabat" 
          class="form-input" 
          required
        />
      </div>
      
      <div class="input-group">
        <input 
          v-model="formData.nama_institusi" 
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

      <!-- Section: Rencana Survei -->
      <div class="section-header">
        <h3 class="section-title">Rencana Pengambilan Data/Survei</h3>
      </div>
      
      <div class="input-row">
        <div class="input-group">
          <label class="input-label">Tanggal Mulai</label>
          <input 
            v-model="formData.tgl_mulai" 
            type="date" 
            class="form-input" 
            required
          />
        </div>
        <div class="input-group">
          <label class="input-label">Tanggal Selesai</label>
          <input 
            v-model="formData.tgl_selesai" 
            type="date" 
            class="form-input" 
            required
          />
        </div>
      </div>

      <!-- Section: Mata Kuliah -->
      <div class="section-header">
        <h3 class="section-title">Mata Kuliah Terkait</h3>
      </div>
      
      <div class="input-row">
        <div class="input-group">
          <input 
            v-model="formData.kode" 
            type="text" 
            placeholder="Kode Mata Kuliah" 
            class="form-input" 
            required
          />
        </div>
        <div class="input-group">
          <input 
            v-model="formData.nama_mk" 
            type="text" 
            placeholder="Nama Mata Kuliah" 
            class="form-input" 
            required
          />
        </div>
      </div>
      
      <div class="input-group">
        <input 
          v-model="formData.nama_dosen" 
          type="text" 
          placeholder="Nama Dosen Pembimbing" 
          class="form-input" 
          required
        />
      </div>
      
      <div class="input-group">
        <input 
          v-model="formData.judul" 
          type="text" 
          placeholder="Judul TA / Topik (isi dengan - jika tidak ada)" 
          class="form-input" 
        />
      </div>

      <!-- Section: Data yang Diperlukan -->
      <div class="section-header">
        <h3 class="section-title">Data yang Diperlukan</h3>
      </div>
      
      <div v-for="i in 5" :key="`data-${i}`" class="input-group">
        <input 
          v-model="formData[`data_yang_diperlukan${i}`]" 
          type="text" 
          :placeholder="`Data ${i} (isi dengan - jika tidak ada)`" 
          class="form-input" 
        />
      </div>

      <!-- Section: Informasi Tambahan -->
      <div class="section-header">
        <h3 class="section-title">Informasi Tambahan</h3>
      </div>
      
      <div class="input-group">
        <textarea 
          v-model="formData.catatan" 
          placeholder="Catatan Tambahan (isi dengan - jika tidak ada)" 
          class="form-input form-textarea"
          rows="4"
        ></textarea>
      </div>

      <div class="input-row">
        <div class="input-group">
          <label class="input-label">Tanggal Pengajuan</label>
          <input 
            v-model="formData.tanggal_pengajuan" 
            type="date" 
            class="form-input" 
            required
          />
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
      </div>

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
        nrp1: '',
        nama1: '',
        nrp2: '',
        nama2: '',
        nrp3: '',
        nama3: '',
        nrp4: '',
        nama4: '',
        nrp5: '',
        nama5: '',
        data_yang_diperlukan1: '',
        data_yang_diperlukan2: '',
        data_yang_diperlukan3: '',
        data_yang_diperlukan4: '',
        data_yang_diperlukan5: '',
        nama_pejabat: '',
        nama_jabatan: '',
        nama_institusi: '',
        alamat: '',
        tgl_mulai: '',
        tgl_selesai: '',
        kode: '',
        nama_mk: '',
        nama_dosen: '',
        judul: '',
        catatan: '',
        tanggal_pengajuan: '',
        nama_pengaju: ''
      }
    };
  },
  methods: {
    async handleSubmit() {
      this.isSubmitting = true;
      
      try {
        const response = await axios.post('http://localhost:5000/api/dataTA', this.formData, {
          responseType: 'blob' // penting untuk file download
        });

        // Buat URL dari blob file yang diterima
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        const url = window.URL.createObjectURL(blob);

        // Buat elemen link untuk mendownload
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Surat_Pengantar_Data_TA.docx');
        document.body.appendChild(link);
        link.click();

        // Reset form
        this.formData = {
          nrp1: '', nama1: '', nrp2: '', nama2: '', nrp3: '', nama3: '',
          nrp4: '', nama4: '', nrp5: '', nama5: '',
          data_yang_diperlukan1: '', data_yang_diperlukan2: '', data_yang_diperlukan3: '',
          data_yang_diperlukan4: '', data_yang_diperlukan5: '',
          nama_pejabat: '', nama_jabatan: '', nama_institusi: '', alamat: '',
          tgl_mulai: '', tgl_selesai: '', kode: '', nama_mk: '', nama_dosen: '',
          judul: '', catatan: '', tanggal_pengajuan: '', nama_pengaju: ''
        };

        // Cleanup
        window.URL.revokeObjectURL(url);
        link.remove();
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