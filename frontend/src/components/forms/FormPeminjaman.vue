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

      <!-- Enhanced File Upload Section -->
      <div class="upload-section">
        <label class="upload-label">Upload File Surat HMIT</label>
        <div class="upload-description">
          Silakan upload surat permohonan dari HMIT dalam format PDF atau DOCX
        </div>

        <!-- Upload Area -->
        <div 
          class="upload-area"
          :class="{ 'drag-over': isDragOver, 'has-files': uploadedFiles.length > 0 }"
          @dragover.prevent="handleDragOver"
          @dragleave.prevent="handleDragLeave"
          @drop.prevent="handleDrop"
          @click="triggerFileInput"
        >
          <input 
            ref="fileInput"
            type="file" 
            @change="handleFileSelect" 
            class="file-input-hidden" 
            accept=".pdf,.docx,.doc"
            multiple
          />

          <div class="upload-content" v-if="uploadedFiles.length === 0">
            <div class="upload-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
            </div>
            <div class="upload-text">
              <strong>Choose a file or drag & drop it here.</strong>
            </div>
            <div class="upload-subtext">
              PDF, DOC, and DOCX formats, up to 10 MB.
            </div>
            <button type="button" class="browse-btn" @click.stop="triggerFileInput">
              Browse File
            </button>
          </div>

          <!-- File List -->
          <div class="file-list" v-if="uploadedFiles.length > 0">
            <div 
              class="file-item" 
              v-for="(file, index) in uploadedFiles" 
              :key="index"
            >
              <div class="file-icon">
                <svg v-if="file.type === 'application/pdf'" width="24" height="24" viewBox="0 0 24 24" fill="#ff4757">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <text x="7" y="15" font-size="4" fill="white" font-weight="bold">PDF</text>
                </svg>
                <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="#2e86de">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <text x="6" y="15" font-size="3" fill="white" font-weight="bold">DOC</text>
                </svg>
              </div>
              
              <div class="file-info">
                <div class="file-name">{{ file.name }}</div>
                <div class="file-details">
                  <span class="file-size">{{ formatFileSize(file.size) }}</span>
                  <span class="file-status" :class="{ 'completed': file.status === 'completed', 'uploading': file.status === 'uploading' }">
                    <span v-if="file.status === 'uploading'">📤 Uploading...</span>
                    <span v-else-if="file.status === 'completed'">✅ Completed</span>
                    <span v-else>⏳ Ready</span>
                  </span>
                </div>
                <div v-if="file.status === 'uploading'" class="progress-bar">
                  <div class="progress-fill" :style="{ width: file.progress + '%' }"></div>
                </div>
              </div>

              <button 
                type="button" 
                class="remove-file-btn" 
                @click="removeFile(index)"
                :disabled="file.status === 'uploading'"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Add more files button -->
        <button 
          v-if="uploadedFiles.length > 0" 
          type="button" 
          class="add-more-btn"
          @click="triggerFileInput"
        >
          + Add more files
        </button>
      </div>

      <button type="submit" class="submit-btn" :disabled="isSubmitting">
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
        nomorHp: ''
      },
      uploadedFiles: [],
      isDragOver: false,
      isSubmitting: false
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    handleDragOver(e) {
      e.preventDefault();
      this.isDragOver = true;
    },

    handleDragLeave(e) {
      e.preventDefault();
      this.isDragOver = false;
    },

    handleDrop(e) {
      e.preventDefault();
      this.isDragOver = false;
      const files = Array.from(e.dataTransfer.files);
      this.processFiles(files);
    },

    handleFileSelect(e) {
      const files = Array.from(e.target.files);
      this.processFiles(files);
    },

    processFiles(files) {
      const validFiles = files.filter(file => {
        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        const maxSize = 10 * 1024 * 1024; // 10MB
        
        if (!validTypes.includes(file.type)) {
          alert(`File ${file.name} bukan format yang didukung. Silakan upload file PDF atau DOCX.`);
          return false;
        }
        
        if (file.size > maxSize) {
          alert(`File ${file.name} terlalu besar. Maksimal ukuran file adalah 10MB.`);
          return false;
        }
        
        return true;
      });

      validFiles.forEach(file => {
        const fileObj = {
          file: file,
          name: file.name,
          size: file.size,
          type: file.type,
          status: 'ready',
          progress: 0
        };
        
        this.uploadedFiles.push(fileObj);
        this.simulateUpload(fileObj);
      });
    },

    simulateUpload(fileObj) {
      fileObj.status = 'uploading';
      
      const interval = setInterval(() => {
        fileObj.progress += Math.random() * 30;
        
        if (fileObj.progress >= 100) {
          fileObj.progress = 100;
          fileObj.status = 'completed';
          clearInterval(interval);
        }
      }, 200);
    },

    removeFile(index) {
      this.uploadedFiles.splice(index, 1);
    },

    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    },

    async handleSubmit() {
      this.isSubmitting = true;
      
      try {
        const payload = new FormData();
        
        // Add form data
        for (const key in this.formData) {
          payload.append(key, this.formData[key]);
        }

        // Add files
        this.uploadedFiles.forEach((fileObj, index) => {
          payload.append(`files[${index}]`, fileObj.file);
        });

        await axios.post('http://localhost:5000/api/peminjaman', payload, {
          headers: {
            'Content-Type': 'multipart/form-data'
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
  nomorHp: ''
};
this.uploadedFiles = [];

// alert('✅ Form berhasil dikirim!'); // Hapus ini
this.showSuccessDialog('✅ Form berhasil dikirim!');
} catch (error) {
console.error(error);
// alert('❌ Gagal mengirim form. Silakan coba lagi.'); // Hapus ini
this.showErrorDialog('❌ Gagal mengirim form. Silakan coba lagi.');
} finally {
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

/* Upload Section Styles */
.upload-section {
  margin: 2rem 0;
}

.upload-label {
  font-weight: 700;
  color: #374151;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  display: block;
}

.upload-description {
  color: #6b7280;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.upload-area {
  border: 2px dashed #d1d5db;
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  background: rgba(249, 250, 251, 0.8);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-area:hover {
  border-color: #9ca3af;
  background: rgba(243, 244, 246, 0.9);
  transform: translateY(-2px);
}

.upload-area.drag-over {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.05);
  transform: scale(1.02);
}

.upload-area.has-files {
  border-style: solid;
  border-color: #d1d5db;
  background: white;
  padding: 1.5rem;
}

.file-input-hidden {
  display: none;
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.upload-icon {
  color: #9ca3af;
  opacity: 0.7;
}

.upload-text {
  color: #374151;
  font-size: 1.1rem;
}

.upload-subtext {
  color: #9ca3af;
  font-size: 0.9rem;
}

.browse-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.browse-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

/* File List Styles */
.file-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(249, 250, 251, 0.8);
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
}

.file-item:hover {
  background: rgba(243, 244, 246, 0.9);
  transform: translateX(4px);
}

.file-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.file-info {
  flex: 1;
  min-width: 0;
}

.file-name {
  font-weight: 600;
  color: #374151;
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
  word-break: break-word;
}

.file-details {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.85rem;
}

.file-size {
  color: #6b7280;
}

.file-status.uploading {
  color: #3b82f6;
  font-weight: 500;
}

.file-status.completed {
  color: #10b981;
  font-weight: 500;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  margin-top: 0.5rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.remove-file-btn {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.remove-file-btn:hover:not(:disabled) {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.remove-file-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.add-more-btn {
  margin-top: 1rem;
  background: white;
  border: 2px dashed #d1d5db;
  color: #667eea;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;
}

.add-more-btn:hover {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.05);
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
  
  .upload-area {
    padding: 1.5rem;
    min-height: 150px;
  }
  
  .file-item {
    padding: 0.75rem;
  }
  
  .file-details {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
}
</style>