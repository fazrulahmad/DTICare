<template>
    <div class="form-layanan-container">
      <!-- Animated background elements -->
      <div class="bg-animation">
        <div class="floating-shape shape-1"></div>
        <div class="floating-shape shape-2"></div>
        <div class="floating-shape shape-3"></div>
        <div class="floating-shape shape-4"></div>
      </div>

      <div class="form-card">
        <div class="form-header">
          <div class="logo-section">
            <div class="logo-icon">
              <span>DTI</span>
            </div>
            <h1 class="form-title">Form Pengajuan Surat</h1>
            <p class="form-subtitle">Sistem Layanan Digital Departemen Teknologi Informasi</p>
          </div>
        </div>

        <div class="form-content">
          <div class="input-group">
            <label class="form-label">
              <i class="icon">📋</i>
              Pilih Jenis Layanan
            </label>
            <div class="select-wrapper">
              <select v-model="jenis" class="form-select">
                <option disabled value="">-- Pilih Layanan --</option>
                <option value="peminjaman">📍 Peminjaman Ruangan</option>
                <option value="data-ta">📊 Surat Pengantar Pengambilan Data TA</option>
                <option value="kp">💼 Surat Pengantar Permohonan KP</option>
                <option value="rekomendasi">🏆 Surat Tugas Kompetisi</option>
              </select>
              <div class="select-arrow">▼</div>
            </div>
          </div>

          <transition name="slide-fade">
            <component v-if="komponenForm" :is="komponenForm" class="dynamic-form" />
          </transition>

          <!-- Stats section -->
          <div class="stats-section" v-if="!komponenForm">
            <div class="stat-item">
              <div class="stat-number">1000+</div>
              <div class="stat-label">Mahasiswa Terlayani</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">24/7</div>
              <div class="stat-label">Layanan Online</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">100%</div>
              <div class="stat-label">Digital Process</div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import FormPeminjaman from '../components/forms/FormPeminjaman.vue'
import FormDataTA from '../components/forms/FormDataTA.vue'
import FormKP from '../components/forms/FormKP.vue'
import FormTugas from '../components/forms/FormTugas.vue'

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
        case 'tugas':
          return FormTugas
        default:
          return null
      }
    }
  }
}
</script>

<style scoped>
/* Global Styles */
.form-layanan-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  position: relative;
  overflow: hidden;
}

/* Animated Background */
.bg-animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-shape {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 80px;
  height: 80px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 120px;
  height: 120px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.shape-3 {
  width: 60px;
  height: 60px;
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

.shape-4 {
  width: 100px;
  height: 100px;
  top: 10%;
  right: 30%;
  animation-delay: 1s;
}

/* Main Form Card */
.form-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 0;
  border-radius: 24px;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.15),
    0 8px 16px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  width: 100%;
  max-width: 800px;
  position: relative;
  z-index: 2;
  overflow: hidden;
  transform: translateY(20px);
  animation: slideUp 0.8s ease-out forwards;
}

.form-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 3rem 2rem 2rem;
  text-align: center;
  position: relative;
}

.form-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
  opacity: 0.3;
}

.logo-section {
  position: relative;
  z-index: 1;
}

.logo-icon {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-weight: bold;
  font-size: 1.5rem;
  color: white;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  animation: pulse 2s ease-in-out infinite;
}

.form-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin: 0 0 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.5px;
}

.form-subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  margin: 0;
  font-weight: 300;
}

.form-content {
  padding: 2.5rem;
}

/* Input Styles */
.input-group {
  margin-bottom: 2rem;
}

.form-label {
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
}

.form-label .icon {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

.select-wrapper {
  position: relative;
}

.form-select {
  width: 100%;
  padding: 1rem 3rem 1rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  appearance: none;
  cursor: pointer;
  color: #374151;
}

.form-select:focus {
  border-color: #667eea;
  outline: none;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  transform: translateY(-2px);
}

.form-select:hover {
  border-color: #9ca3af;
  transform: translateY(-1px);
}

.select-arrow {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  pointer-events: none;
  transition: transform 0.3s ease;
}

.form-select:focus + .select-arrow {
  transform: translateY(-50%) rotate(180deg);
  color: #667eea;
}

/* Stats Section */
.stats-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.stat-item {
  text-align: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  border-radius: 16px;
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
}

.stat-number {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #6b7280;
  font-size: 0.9rem;
  font-weight: 500;
}

/* Animations */
@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* Transitions */
.slide-fade-enter-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-enter-from {
  transform: translateY(30px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}

.dynamic-form {
  margin-top: 2rem;
  padding: 2rem;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(102, 126, 234, 0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .form-layanan-container {
    padding: 1rem;
  }
  
  .form-card {
    margin: 1rem 0;
  }
  
  .form-title {
    font-size: 2rem;
  }
  
  .stats-section {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .floating-shape {
    display: none;
  }
}

/* Smooth scrolling and performance */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.form-card {
  will-change: transform;
}

.floating-shape {
  will-change: transform;
}
</style>