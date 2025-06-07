<template>
  <div class="form-wrapper">
    <h2 class="form-title">Form Peminjaman Ruangan</h2>
    <form @submit.prevent="handleSubmit" class="form-body">
      <div class="input-group">
        <input 
          v-model="formData.nomorSurat" 
          type="text" 
          placeholder="Nomor Surat HMIT (jika dari HMIT)" 
          class="form-input" 
        />
      </div>

      <div class="input-group">
        <input 
          v-model="formData.namaKegiatan" 
          type="text" 
          placeholder="Nama Kegiatan" 
          class="form-input" 
          required
        />
      </div>

      <div class="input-group">
        <label class="input-label">Hari/Tanggal Kegiatan</label>
        <input 
          v-model="formData.hariTanggal" 
          type="date" 
          class="form-input" 
          required
        />
      </div>

      <div class="input-group">
        <input 
          v-model="formData.pukul" 
          type="text" 
          placeholder="Pukul (contoh: 09:00 - 12:00)" 
          class="form-input" 
          required
        />
      </div>

      <div class="input-group">
        <input 
          v-model="formData.tempat" 
          type="text" 
          placeholder="Tempat/Ruangan yang Diminta" 
          class="form-input" 
          required
        />
      </div>

      <div class="input-group">
        <input 
          v-model="formData.nrp" 
          type="text" 
          placeholder="NRP yang Mengajukan" 
          class="form-input" 
          required
        />
      </div>

      <div class="input-group">
        <input 
          v-model="formData.namaPengaju" 
          type="text" 
          placeholder="Nama yang Mengajukan" 
          class="form-input" 
          required
        />
      </div>

      <div class="input-group">
        <input 
          v-model="formData.nomorHp" 
          type="tel" 
          placeholder="Nomor HP yang mengajukan" 
          class="form-input" 
          required
        />
      </div>

      <!-- Google Drive Link Section -->
      <div class="gdrive-section">
        <label class="gdrive-label">Link Google Drive Surat HMIT</label>
        <div class="gdrive-description">
          Silakan masukkan link Google Drive yang berisi surat permohonan dari HMIT. Pastikan link dapat diakses oleh siapa saja dengan link tersebut.
        </div>

        <div class="gdrive-input-container">
          <div class="gdrive-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#4285f4">
              <path d="M6.5 8.5L12 2l5.5 6.5H6.5zM6 9h12l6 10.5H0L6 9zM7.5 10.5L4.5 16h3l3-5.5h-3z"/>
            </svg>
          </div>
          <input 
            v-model="formData.gdriveLink" 
            type="url" 
            placeholder="https://drive.google.com/file/d/..." 
            class="gdrive-input" 
            @input="validateGdriveLink"
            :class="{ 'valid': isValidGdriveLink, 'invalid': formData.gdriveLink && !isValidGdriveLink }"
          />
          <div class="validation-icon">
            <svg v-if="isValidGdriveLink" width="20" height="20" viewBox="0 0 24 24" fill="#10b981">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            <svg v-else-if="formData.gdriveLink && !isValidGdriveLink" width="20" height="20" viewBox="0 0 24 24" fill="#ef4444">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </div>
        </div>

        <div class="gdrive-help">
          <div class="help-title">💡 Cara mendapatkan link Google Drive:</div>
          <ol class="help-steps">
            <li>Buka file di Google Drive</li>
            <li>Klik kanan pada file → pilih "Bagikan" atau "Share"</li>
            <li>Ubah akses menjadi "Siapa saja yang memiliki link dapat melihat"</li>
            <li>Salin link dan tempelkan di kolom di atas</li>
          </ol>
        </div>

        <div 
          v-if="formData.gdriveLink && !isValidGdriveLink" 
          class="error-message"
        >
          ⚠️ Link Google Drive tidak valid. Pastikan menggunakan link dari Google Drive.
        </div>

        <div 
          v-if="isValidGdriveLink" 
          class="success-message"
        >
          ✅ Link Google Drive valid dan dapat diakses.
        </div>
      </div>

      <button type="submit" class="submit-btn" :disabled="isSubmitting || (formData.gdriveLink && !isValidGdriveLink)">
        <span v-if="isSubmitting">
          <svg class="loading-spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12a9 9 0 11-6.219-8.56"/>
          </svg>
          Mengirim...
        </span>
        <span v-else>
          📤 Kirim Permohonan
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
      formData: {
        nomorSurat: '',
        namaKegiatan: '',
        hariTanggal: '',
        pukul: '',
        tempat: '',
        nrp: '',
        namaPengaju: '',
        nomorHp: '',
        gdriveLink: ''
      },
      isSubmitting: false,
      isValidGdriveLink: false
    };
  },
  methods: {
    validateGdriveLink() {
      const link = this.formData.gdriveLink;
      if (!link) {
        this.isValidGdriveLink = false;
        return;
      }

      // Regex untuk validasi link Google Drive
      const gdrivePatterns = [
        /^https:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9-_]+/,
        /^https:\/\/docs\.google\.com\/document\/d\/[a-zA-Z0-9-_]+/,
        /^https:\/\/docs\.google\.com\/spreadsheets\/d\/[a-zA-Z0-9-_]+/,
        /^https:\/\/docs\.google\.com\/presentation\/d\/[a-zA-Z0-9-_]+/
      ];

      this.isValidGdriveLink = gdrivePatterns.some(pattern => pattern.test(link));
    },

    async handleSubmit() {
      this.isSubmitting = true;
      
      try {
        const payload = {
          ...this.formData
        };

        await axios.post('http://localhost:5000/api/peminjaman', payload, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        // Reset form
        this.formData = {
          nomorSurat: '',
          namaKegiatan: '',
          hariTanggal: '',
          pukul: '',
          tempat: '',
          nrp: '',
          namaPengaju: '',
          nomorHp: '',
          gdriveLink: ''
        };
        this.isValidGdriveLink = false;

        this.showSuccessDialog('✅ Form berhasil dikirim!');
      } catch (error) {
        console.error(error);
        this.showErrorDialog('❌ Gagal mengirim form. Silakan coba lagi.');
      } finally {
        this.isSubmitting = false;
      }
    },

    showSuccessDialog(message) {
      // Implementasi dialog sukses
      alert(message);
    },

    showErrorDialog(message) {
      // Implementasi dialog error
      alert(message);
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

/* Google Drive Section Styles */
.gdrive-section {
  margin: 2rem 0;
  padding: 2rem;
  background: rgba(249, 250, 251, 0.8);
  border-radius: 20px;
  border: 1px solid #e5e7eb;
}

.gdrive-label {
  font-weight: 700;
  color: #374151;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  display: block;
}

.gdrive-description {
  color: #6b7280;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.gdrive-input-container {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.gdrive-icon {
  position: absolute;
  left: 1rem;
  z-index: 2;
  display: flex;
  align-items: center;
}

.gdrive-input {
  width: 100%;
  padding: 1rem 1.25rem 1rem 3.5rem;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: #374151;
  padding-right: 3rem;
}

.gdrive-input:focus {
  border-color: #4285f4;
  outline: none;
  box-shadow: 0 0 0 4px rgba(66, 133, 244, 0.1);
  transform: translateY(-2px);
}

.gdrive-input.valid {
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.05);
}

.gdrive-input.invalid {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.05);
}

.validation-icon {
  position: absolute;
  right: 1rem;
  display: flex;
  align-items: center;
}

.gdrive-help {
  background: rgba(255, 255, 255, 0.8);
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  margin-top: 1rem;
}

.help-title {
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.help-steps {
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
  padding-left: 1.25rem;
}

.help-steps li {
  margin-bottom: 0.25rem;
}

.error-message {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 0.5rem;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.success-message {
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 0.5rem;
  border: 1px solid rgba(16, 185, 129, 0.2);
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
  
  .gdrive-section {
    padding: 1.5rem;
  }
  
  .gdrive-help {
    padding: 1rem;
  }
  
  .help-steps {
    padding-left: 1rem;
  }
}
</style>