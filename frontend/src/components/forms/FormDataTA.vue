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
            <label class="input-label">NRP Mahasiswa {{ i }}</label>
            <input 
              v-model="formData[`nrp${i}`]" 
              type="text" 
              :placeholder="`Masukkan NRP Mahasiswa ${i}`" 
              class="form-input" 
            />
          </div>
          <div class="input-group">
            <label class="input-label">Nama Mahasiswa {{ i }}</label>
            <input 
              v-model="formData[`nama${i}`]" 
              type="text" 
              :placeholder="`Masukkan Nama Mahasiswa ${i}`" 
              class="form-input" 
            />
          </div>
        </div>
      </div>

      <!-- Section: Data Institusi -->
      <div class="section-header">
        <h3 class="section-title">Data Institusi Tujuan</h3>
      </div>
      
      <div class="input-row">
        <div class="input-group">
          <label class="input-label">Nama Pejabat *</label>
          <input 
            v-model="formData.nama_pejabat" 
            type="text" 
            placeholder="Masukkan nama pejabat" 
            class="form-input" 
            required
          />
        </div>
        <div class="input-group">
          <label class="input-label">Jabatan Pejabat *</label>
          <input 
            v-model="formData.nama_jabatan" 
            type="text" 
            placeholder="Masukkan jabatan pejabat" 
            class="form-input" 
            required
          />
        </div>
      </div>
      
      <div class="input-group">
        <label class="input-label">Nama Institusi *</label>
        <input 
          v-model="formData.nama_institusi" 
          type="text" 
          placeholder="Masukkan nama institusi" 
          class="form-input" 
          required
        />
      </div>
      
      <div class="input-group">
        <label class="input-label">Alamat Institusi *</label>
        <textarea 
          v-model="formData.alamat" 
          placeholder="Masukkan alamat lengkap institusi" 
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
          <label class="input-label">Tanggal Mulai *</label>
          <input 
            v-model="formData.tgl_mulai" 
            type="date" 
            class="form-input" 
            required
          />
        </div>
        <div class="input-group">
          <label class="input-label">Tanggal Selesai *</label>
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
          <label class="input-label">Kode Mata Kuliah *</label>
          <input 
            v-model="formData.kode" 
            type="text" 
            placeholder="Contoh: IF123456" 
            class="form-input" 
            required
          />
        </div>
        <div class="input-group">
          <label class="input-label">Nama Mata Kuliah *</label>
          <input 
            v-model="formData.nama_mk" 
            type="text" 
            placeholder="Masukkan nama mata kuliah" 
            class="form-input" 
            required
          />
        </div>
      </div>
      
      <div class="input-group">
        <label class="input-label">Nama Dosen Pembimbing *</label>
        <input 
          v-model="formData.nama_dosen" 
          type="text" 
          placeholder="Masukkan nama dosen pembimbing" 
          class="form-input" 
          required
        />
      </div>
      
      <div class="input-group">
        <label class="input-label">Judul TA / Topik</label>
        <input 
          v-model="formData.judul" 
          type="text" 
          placeholder="Masukkan judul TA atau ketik '-' jika tidak ada" 
          class="form-input" 
        />
      </div>

      <!-- Section: Data yang Diperlukan -->
      <div class="section-header">
        <h3 class="section-title">Data yang Diperlukan</h3>
      </div>
      
      <div v-for="i in 5" :key="`data-${i}`" class="input-group">
        <label class="input-label">Data {{ i }}</label>
        <input 
          v-model="formData[`data_yang_diperlukan${i}`]" 
          type="text" 
          :placeholder="`Masukkan data yang diperlukan ${i} atau ketik '-' jika tidak ada`" 
          class="form-input" 
        />
      </div>

      <!-- Section: Tanda Tangan -->
      <div class="section-header">
        <h3 class="section-title">Tanda Tangan Digital</h3>
      </div>
      
      <div class="signature-section">
        <div class="signature-upload-area" :class="{ 'has-signature': signaturePreview }">
          <input 
            ref="signatureInput"
            type="file" 
            accept="image/*" 
            @change="handleSignatureUpload" 
            class="signature-input"
            id="signature-upload"
          />
          
          <div v-if="!signaturePreview" class="upload-placeholder">
            <div class="upload-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </div>
            <div class="upload-text">
              <p class="upload-title">Upload Tanda Tangan</p>
              <p class="upload-subtitle">PNG, JPG, atau JPEG (maks. 5MB)</p>
              <p class="upload-info">Ukuran akan otomatis disesuaikan ke 2cm x 3.62cm</p>
            </div>
            <label for="signature-upload" class="upload-button">
              Pilih File
            </label>
          </div>
          
          <div v-if="signaturePreview" class="signature-preview">
            <img :src="signaturePreview" alt="Preview Tanda Tangan" class="signature-image" />
            <div class="signature-actions">
              <button type="button" @click="removeSignature" class="remove-signature-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                Hapus
              </button>
              <label for="signature-upload" class="change-signature-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Ganti
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Section: Informasi Tambahan -->
      <div class="section-header">
        <h3 class="section-title">Informasi Tambahan</h3>
      </div>
      
      <div class="input-group">
        <label class="input-label">Catatan Tambahan</label>
        <textarea 
          v-model="formData.catatan" 
          placeholder="Masukkan catatan tambahan atau ketik '-' jika tidak ada" 
          class="form-input form-textarea"
          rows="4"
        ></textarea>
      </div>

      <div class="input-row">
        <div class="input-group">
          <label class="input-label">Tanggal Pengajuan *</label>
          <input 
            v-model="formData.tanggal_pengajuan" 
            type="date" 
            class="form-input" 
            required
          />
        </div>
        <div class="input-group">
          <label class="input-label">Nama Mahasiswa Pengaju *</label>
          <input 
            v-model="formData.nama_pengaju" 
            type="text" 
            placeholder="Masukkan nama lengkap pengaju" 
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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14,2 14,8 20,8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10,9 9,9 8,9"></polyline>
          </svg>
          Kirim & Unduh Surat
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
      signaturePreview: null,
      signatureFile: null,
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
    async handleSignatureUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      // Validasi ukuran file (5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.$emit('show-error', '❌ Ukuran file terlalu besar. Maksimal 5MB.');
        return;
      }

      // Validasi tipe file
      if (!file.type.startsWith('image/')) {
        this.$emit('show-error', '❌ File harus berupa gambar (PNG, JPG, JPEG).');
        return;
      }

      try {
        // Resize gambar ke 2cm x 3.62cm (dengan asumsi 96 DPI: 2cm ≈ 76px, 3.62cm ≈ 137px)
        const resizedImage = await this.resizeImage(file, 76, 76);
        
        this.signatureFile = resizedImage;
        this.signaturePreview = URL.createObjectURL(resizedImage);
        
        this.$emit('show-success', '✅ Tanda tangan berhasil diupload dan diresize!');
      } catch (error) {
        console.error('Error processing signature:', error);
        this.$emit('show-error', '❌ Gagal memproses tanda tangan. Silakan coba lagi.');
      }
    },

    async resizeImage(file, width, height) {
      return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
          canvas.width = width;
          canvas.height = height;

          // Menggambar gambar dengan ukuran yang telah ditentukan
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now()
            });
            resolve(resizedFile);
          }, file.type, 0.9);
        };

        img.src = URL.createObjectURL(file);
      });
    },

    removeSignature() {
      this.signatureFile = null;
      this.signaturePreview = null;
      this.$refs.signatureInput.value = '';
    },

    async handleSubmit() {
      this.isSubmitting = true;
      
      try {
        // Membuat FormData untuk mengirim file
        const formData = new FormData();
        
        // Menambahkan semua data form
        Object.keys(this.formData).forEach(key => {
          formData.append(key, this.formData[key]);
        });

        // Menambahkan file tanda tangan jika ada
        if (this.signatureFile) {
          formData.append('signature', this.signatureFile);
        }

        const response = await axios.post('http://localhost:5000/api/dataTA', formData, {
          responseType: 'blob',
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        // Buat URL dari blob file yang diterima
        const blob = new Blob([response.data], { 
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
        });
        const url = window.URL.createObjectURL(blob);

        // Buat elemen link untuk mendownload
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Surat_Pengantar_Data_TA.docx');
        document.body.appendChild(link);
        link.click();

        // Reset form
        this.resetForm();

        // Cleanup
        window.URL.revokeObjectURL(url);
        link.remove();
        this.$emit('show-success', '✅ Surat berhasil dibuat dan diunduh!');
      } catch (error) {
        console.error(error);
        this.$emit('show-error', '❌ Gagal mengirim atau mengunduh surat. Silakan coba lagi.');
      } finally {
        this.isSubmitting = false;
      }
    },

    resetForm() {
      this.formData = {
        nrp1: '', nama1: '', nrp2: '', nama2: '', nrp3: '', nama3: '',
        nrp4: '', nama4: '', nrp5: '', nama5: '',
        data_yang_diperlukan1: '', data_yang_diperlukan2: '', data_yang_diperlukan3: '',
        data_yang_diperlukan4: '', data_yang_diperlukan5: '',
        nama_pejabat: '', nama_jabatan: '', nama_institusi: '', alamat: '',
        tgl_mulai: '', tgl_selesai: '', kode: '', nama_mk: '', nama_dosen: '',
        judul: '', catatan: '', tanggal_pengajuan: '', nama_pengaju: ''
      };
      this.removeSignature();
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.form-wrapper {
  max-width: 1000px;
  margin: 2rem auto;
  background: linear-gradient(145deg, #ffffff, #f8fafc);
  padding: 3rem;
  border-radius: 24px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.08),
    0 8px 16px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  font-family: 'Inter', 'Segoe UI', 'Apple Color Emoji', sans-serif;
  border: 1px solid rgba(229, 231, 235, 0.8);
}

.form-title {
  font-size: 2.25rem;
  font-weight: 800;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 2.5rem;
  text-align: center;
  letter-spacing: -0.75px;
  line-height: 1.2;
}

.form-body {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.section-header {
  margin: 2.5rem 0 1.5rem 0;
  position: relative;
}

.section-header::before {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  border-radius: 2px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  position: relative;
  padding-bottom: 1rem;
}

.student-group {
  padding: 2rem;
  background: linear-gradient(145deg, #f9fafb, #ffffff);
  border-radius: 20px;
  border: 1px solid #e5e7eb;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.student-group:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.student-header {
  margin-bottom: 1.5rem;
}

.student-title {
  font-size: 1.2rem;
  font-weight: 650;
  color: #374151;
  margin: 0;
  display: flex;
  align-items: center;
}

.student-title::before {
  content: '👤';
  margin-right: 0.5rem;
  font-size: 1.1rem;
}

.input-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.input-label {
  font-weight: 600;
  color: #374151;
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
}

.form-input {
  padding: 1rem 1.25rem;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  font-size: 1rem;
  background: #ffffff;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: #374151;
  font-family: inherit;
  line-height: 1.5;
}

.form-input:focus {
  border-color: #3b82f6;
  outline: none;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  transform: translateY(-1px);
}

.form-input:hover:not(:focus) {
  border-color: #9ca3af;
  transform: translateY(-1px);
}

.form-input::placeholder {
  color: #9ca3af;
  opacity: 1;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
  line-height: 1.6;
  font-family: inherit;
}

/* Signature Section Styles */
.signature-section {
  margin: 1rem 0;
}

.signature-upload-area {
  border: 2px dashed #d1d5db;
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  background: linear-gradient(145deg, #f9fafb, #ffffff);
  transition: all 0.3s ease;
  position: relative;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.signature-upload-area:hover {
  border-color: #3b82f6;
  background: linear-gradient(145deg, #eff6ff, #ffffff);
}

.signature-upload-area.has-signature {
  border-style: solid;
  border-color: #10b981;
  background: linear-gradient(145deg, #ecfdf5, #ffffff);
}

.signature-input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.upload-icon {
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.upload-text {
  text-align: center;
}

.upload-title {
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.upload-subtitle {
  color: #6b7280;
  margin: 0 0 0.25rem 0;
  font-size: 0.9rem;
}

.upload-info {
  color: #9ca3af;
  margin: 0;
  font-size: 0.85rem;
  font-style: italic;
}

.upload-button {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  display: inline-block;
  margin-top: 0.5rem;
}

.upload-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
}

.signature-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.signature-image {
  max-width: 200px;
  max-height: 120px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.signature-actions {
  display: flex;
  gap: 0.75rem;
}

.remove-signature-btn,
.change-signature-btn {
  padding: 0.5rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.remove-signature-btn {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  border: none;
}

.change-signature-btn {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  border: none;
}

.remove-signature-btn:hover,
.change-signature-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.submit-btn {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  padding: 1.25rem 2.5rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  min-height: 60px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(16, 185, 129, 0.4);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(-1px);
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
    padding: 2rem;
  }
  
  .form-title {
    font-size: 1.75rem;
  }
  
  .section-title {
    font-size: 1.25rem;
  }
  
  .input-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .student-group {
    padding: 1.5rem;
  }

  .signature-upload-area {
    padding: 1.5rem;
  }

  .signature-actions {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .form-wrapper {
    padding: 1.5rem;
  }
  
  .form-title {
    font-size: 1.5rem;
  }
  
  .section-header {
    margin: 2rem 0 1rem 0;
  }

  .signature-upload-area {
    padding: 1rem;
    min-height: 150px;
  }

  .upload-button {
    padding: 0.65rem 1.25rem;
    font-size: 0.9rem;
  }
}

/* Focus indicators for accessibility */
.form-input:focus,
.upload-button:focus,
.remove-signature-btn:focus,
.change-signature-btn:focus,
.submit-btn:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Custom scrollbar for textarea */
.form-textarea::-webkit-scrollbar {
  width: 8px;
}

.form-textarea::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.form-textarea::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.form-textarea::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Animation for form sections */
.student-group,
.signature-section {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Loading state improvements */
.submit-btn:disabled {
  background: linear-gradient(135deg, #9ca3af, #6b7280);
}

/* Better file input styling */
.signature-input:focus + .upload-placeholder .upload-button {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Improved contrast for better readability */
.input-label {
  color: #1f2937;
}

.form-input::placeholder {
  color: #6b7280;
}

/* Enhanced shadow effects */
.form-wrapper {
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.1),
    0 8px 16px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.student-group:hover {
  box-shadow: 
    0 12px 28px rgba(0, 0, 0, 0.12),
    0 4px 8px rgba(0, 0, 0, 0.08);
}

/* Print styles */
@media print {
  .form-wrapper {
    box-shadow: none;
    border: 1px solid #e5e7eb;
  }
  
  .submit-btn {
    display: none;
  }
}
</style>