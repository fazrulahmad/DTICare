<template>
  <div class="error-container">
    <div class="error-content">
      <!-- Animated 404 Number -->
      <div class="error-number">
        <span class="four">4</span>
        <span class="zero">0</span>
        <span class="four">4</span>
      </div>
      
      <!-- Error Message -->
      <h1 class="error-title">Halaman Tidak Ditemukan</h1>
      <p class="error-description">
        Maaf, halaman yang Anda cari tidak dapat ditemukan. 
        Mungkin halaman telah dipindahkan atau URL yang dimasukkan salah.
      </p>
      
      <!-- Action Buttons -->
      <div class="error-actions">
        <button @click="goHome" class="btn-primary">
          🏠 Kembali ke Beranda
        </button>
        <button @click="goBack" class="btn-secondary">
          ← Kembali
        </button>
      </div>
      
      <!-- Decorative Elements -->
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // PERBAIKAN: Ubah nama komponen menjadi multi-word sesuai Vue style guide
  name: 'ErrorPageNotFound',
  methods: {
    goHome() {
      this.$router.push('/');
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.error-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Inter', 'Segoe UI', sans-serif;
  position: relative;
  overflow: hidden;
}

.error-content {
  text-align: center;
  color: white;
  z-index: 10;
  position: relative;
  max-width: 600px;
  padding: 2rem;
}

.error-number {
  font-size: 8rem;
  font-weight: 900;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.error-number span {
  display: inline-block;
  animation: bounce 2s infinite;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.four:first-child {
  animation-delay: 0s;
}

.zero {
  animation-delay: 0.2s;
  color: #fbbf24;
}

.four:last-child {
  animation-delay: 0.4s;
}

.error-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.error-description {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary, .btn-secondary {
  padding: 1rem 2rem;
  border: none;
  border-radius: 16px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-primary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.8);
  transform: translateY(-2px);
}

.floating-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.shape {
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
  width: 60px;
  height: 60px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.shape-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

.shape-4 {
  width: 40px;
  height: 40px;
  top: 30%;
  right: 30%;
  animation-delay: 1s;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .error-number {
    font-size: 5rem;
    gap: 0.5rem;
  }
  
  .error-title {
    font-size: 1.8rem;
  }
  
  .error-description {
    font-size: 1rem;
    padding: 0 1rem;
  }
  
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-primary, .btn-secondary {
    width: 100%;
    max-width: 250px;
  }
}

@media (max-width: 480px) {
  .error-content {
    padding: 1rem;
  }
  
  .error-number {
    font-size: 4rem;
  }
  
  .error-title {
    font-size: 1.5rem;
  }
}
</style>