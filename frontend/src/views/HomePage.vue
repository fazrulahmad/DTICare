<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero-section" ref="heroSection">
      <div class="hero-background">
        <div class="gradient-overlay"></div>
        <div class="floating-elements">
          <div class="floating-circle circle-1"></div>
          <div class="floating-circle circle-2"></div>
          <div class="floating-circle circle-3"></div>
        </div>
      </div>
      
      <div class="hero-content">
        <div class="hero-text" data-aos="fade-up" data-aos-delay="200">
          <h1 class="hero-title">
            <span class="title-main">WELCOME TO</span>
            <span class="title-highlight">DTI-CARE</span>
          </h1>
          <p class="hero-description">
            <strong>DTI CARE</strong> adalah platform layanan digital yang disediakan oleh 
            Departemen Teknologi Informasi ITS untuk mempermudah akses layanan akademik 
            dan administratif secara cepat, transparan, dan efisien.
          </p>
          <div class="hero-stats">
            <div class="stat-item" data-aos="fade-up" data-aos-delay="400">
              <span class="stat-number">1000+</span>
              <span class="stat-label">Mahasiswa Terlayani</span>
            </div>
            <div class="stat-item" data-aos="fade-up" data-aos-delay="500">
              <span class="stat-number">24/7</span>
              <span class="stat-label">Layanan Online</span>
            </div>
            <div class="stat-item" data-aos="fade-up" data-aos-delay="600">
              <span class="stat-number">100%</span>
              <span class="stat-label">Digital Process</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="scroll-indicator">
        <div class="scroll-arrow"></div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services-section" ref="servicesSection">
      <div class="section-container">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title">Layanan Kami</h2>
          <p class="section-subtitle">Berbagai jenis surat dan layanan administratif untuk kebutuhan akademik Anda</p>
        </div>
        
        <div class="services-grid">
          <div class="service-card" data-aos="fade-up" data-aos-delay="100">
            <div class="card-icon">
              <div class="icon-bg icon-bg-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 7V17A2 2 0 0 0 5 19H19A2 2 0 0 0 21 17V7"/>
                  <path d="M21 7L12 13L3 7"/>
                  <rect x="3" y="5" width="18" height="2"/>
                </svg>
              </div>
            </div>
            <h3 class="card-title">Surat Peminjaman</h3>
            <p class="card-description">Ajukan surat peminjaman ruangan atau alat untuk keperluan akademik dengan proses yang mudah dan cepat.</p>
            <div class="card-footer">
              <button class="card-button" @click="navigateToForm('peminjaman')">
                <span class="button-text">Ajukan Sekarang</span>
                <span class="button-icon">→</span>
              </button>
            </div>
          </div>

          <div class="service-card" data-aos="fade-up" data-aos-delay="200">
            <div class="card-icon">
              <div class="icon-bg icon-bg-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6A2 2 0 0 0 4 4V20A2 2 0 0 0 6 22H18A2 2 0 0 0 20 20V8Z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              </div>
            </div>
            <h3 class="card-title">Surat Pengantar TA</h3>
            <p class="card-description">Diperlukan untuk mengambil data dari instansi eksternal untuk keperluan Tugas Akhir Anda.</p>
            <div class="card-footer">
              <button class="card-button" @click="navigateToForm('pengantar-ta')">
                <span class="button-text">Ajukan Sekarang</span>
                <span class="button-icon">→</span>
              </button>
            </div>
          </div>

          <div class="service-card" data-aos="fade-up" data-aos-delay="300">
            <div class="card-icon">
              <div class="icon-bg icon-bg-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
            </div>
            <h3 class="card-title">Surat Kerja Praktik</h3>
            <p class="card-description">Digunakan untuk mendaftar kerja praktik di perusahaan atau instansi sesuai bidang studi.</p>
            <div class="card-footer">
              <button class="card-button" @click="navigateToForm('kerja-praktik')">
                <span class="button-text">Ajukan Sekarang</span>
                <span class="button-icon">→</span>
              </button>
            </div>
          </div>

          <div class="service-card" data-aos="fade-up" data-aos-delay="400">
            <div class="card-icon">
              <div class="icon-bg icon-bg-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 2L3 6V20A2 2 0 0 0 5 22H19A2 2 0 0 0 21 20V6L18 2Z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10A4 4 0 0 1 12 14A4 4 0 0 1 8 10"/>
                </svg>
              </div>
            </div>
            <h3 class="card-title">Surat Tugas Kompetisi</h3>
            <p class="card-description">Surat tugas resmi untuk mengikuti berbagai kompetisi akademik dan non-akademik.</p>
            <div class="card-footer">
              <button class="card-button" @click="navigateToForm('tugas-kompetisi')">
                <span class="button-text">Ajukan Sekarang</span>
                <span class="button-icon">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="process-section" ref="processSection">
      <div class="section-container">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title">Proses Pengajuan</h2>
          <p class="section-subtitle">Langkah mudah untuk mengajukan surat Anda</p>
        </div>
        
        <div class="timeline-container">
          <div class="timeline-item" data-aos="fade-right" data-aos-delay="100">
            <div class="timeline-icon">
              <span class="step-number">1</span>
            </div>
            <div class="timeline-content">
              <h3>Pilih Jenis Surat</h3>
              <p>Pilih jenis surat yang Anda butuhkan dari layanan yang tersedia</p>
            </div>
          </div>

          <div class="timeline-item" data-aos="fade-left" data-aos-delay="200">
            <div class="timeline-icon">
              <span class="step-number">2</span>
            </div>
            <div class="timeline-content">
              <h3>Isi Form Pengajuan</h3>
              <p>Lengkapi formulir dengan data yang diperlukan secara akurat</p>
            </div>
          </div>

          <div class="timeline-item" data-aos="fade-right" data-aos-delay="300">
            <div class="timeline-icon">
              <span class="step-number">3</span>
            </div>
            <div class="timeline-content">
              <h3>Submit & Tunggu Verifikasi</h3>
              <p>Submit pengajuan dan tunggu proses verifikasi dari admin</p>
            </div>
          </div>

          <div class="timeline-item" data-aos="fade-left" data-aos-delay="400">
            <div class="timeline-icon">
              <span class="step-number">4</span>
            </div>
            <div class="timeline-content">
              <h3>Download Surat</h3>
              <p>Surat siap diunduh setelah proses verifikasi selesai</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer" data-aos="fade-up">
      <div class="footer-content">
        <div class="footer-main">
          <div class="footer-brand">
            <h3>DEPARTEMEN TEKNOLOGI INFORMASI</h3>
            <p>Institut Teknologi Sepuluh Nopember</p>
          </div>
          
          <div class="footer-info">
            <div class="info-section">
              <h4>Kontak</h4>
              <p>📍 Gedung Tower 2, Lantai 2, Kampus ITS Sukolilo</p>
              <p>📍 Surabaya, Indonesia 60111</p>
              <p>📞 +62 31-5994251-54</p>
              <p>📱 +62 81234511434</p>
              <p>✉️ tinformasi@its.ac.id</p>
            </div>
            
            <div class="info-section">
              <h4>Layanan</h4>
              <div class="footer-links">
                <a href="#" @click.prevent="navigateToForm('peminjaman')" class="footer-link">
                  <span>Surat Peminjaman</span>
                  <span class="link-arrow">→</span>
                </a>
                <a href="#" @click.prevent="navigateToForm('pengantar-ta')" class="footer-link">
                  <span>Surat Pengantar TA</span>
                  <span class="link-arrow">→</span>
                </a>
                <a href="#" @click.prevent="navigateToForm('kerja-praktik')" class="footer-link">
                  <span>Surat Kerja Praktik</span>
                  <span class="link-arrow">→</span>
                </a>
                <a href="#" @click.prevent="navigateToForm('tugas-kompetisi')" class="footer-link">
                  <span>Surat Tugas Kompetisi</span>
                  <span class="link-arrow">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; 2024 Departemen Teknologi Informasi ITS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  mounted() {
    this.initScrollAnimations();
    this.initParallaxEffects();
  },
  methods: {
    navigateToForm(serviceType) {
      // Add ripple effect to the clicked button or link
      const element = event.target.closest('.card-button, .footer-link');
      
      if (element.classList.contains('card-button')) {
        this.createRippleEffect(element, event);
      } else if (element.classList.contains('footer-link')) {
        this.createPulseEffect(element);
      }
      
      // Navigate after a short delay to show the animation
      setTimeout(() => {
        this.$router.push({
          name: 'FormLayanan',
          query: { service: serviceType }
        });
      }, 200);
    },

    createRippleEffect(element, event) {
      const ripple = document.createElement('span');
      const rect = element.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      element.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    },

    createPulseEffect(element) {
      element.classList.add('clicked');
      setTimeout(() => {
        element.classList.remove('clicked');
      }, 400);
    },

    initScrollAnimations() {
      // Simple scroll animation observer
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, observerOptions);

      // Observe elements with data-aos attribute
      document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
      });
    },

    initParallaxEffects() {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.floating-elements');
        if (parallax) {
          const speed = scrolled * 0.5;
          parallax.style.transform = `translateY(${speed}px)`;
        }
      });
    }
  }
};
</script>

<style scoped>
/* Reset & Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.landing-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
  color: #1a202c;
  overflow-x: hidden;
}

/* Hero Section */
.hero-section {
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.9) 0%,
    rgba(118, 75, 162, 0.8) 50%,
    rgba(6, 182, 212, 0.9) 100%
  );
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.floating-circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  backdrop-filter: blur(10px);
  animation: float 6s ease-in-out infinite;
}

.circle-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.circle-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.circle-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-text {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 1s ease-out 0.5s forwards;
}

.hero-title {
  margin-bottom: 2rem;
}

.title-main {
  display: block;
  font-size: 2.5rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.5rem;
  letter-spacing: 2px;
}

.title-highlight {
  display: block;
  font-size: 4rem;
  font-weight: 800;
  color: white;
  background: linear-gradient(45deg, #ffffff, #f0f9ff, #e0f2fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 20px rgba(255, 255, 255, 0.3);
}

.hero-description {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 800px;
  margin: 0 auto 3rem auto;
  line-height: 1.7;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 3rem;
}

.stat-item {
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 1s ease-out forwards;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.scroll-arrow {
  width: 2px;
  height: 40px;
  background: rgba(255, 255, 255, 0.6);
  position: relative;
  animation: scrollBounce 2s infinite;
}

.scroll-arrow::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: -4px;
  width: 10px;
  height: 10px;
  border-right: 2px solid rgba(255, 255, 255, 0.6);
  border-bottom: 2px solid rgba(255, 255, 255, 0.6);
  transform: rotate(45deg);
}

@keyframes scrollBounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

/* Services Section */
.services-section {
  padding: 8rem 2rem;
  background: linear-gradient(to bottom, #f8fafc, #ffffff);
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
  opacity: 0;
  transform: translateY(30px);
}

.section-title {
  font-size: 3rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
}

.service-card {
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px);
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.service-card:hover::before {
  transform: scaleX(1);
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.card-icon {
  margin-bottom: 1.5rem;
}

.icon-bg {
  width: 60px;
  height: 60px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.icon-bg svg {
  width: 28px;
  height: 28px;
  color: white;
}

.icon-bg-1 { background: linear-gradient(135deg, #667eea, #764ba2); }
.icon-bg-2 { background: linear-gradient(135deg, #f093fb, #f5576c); }
.icon-bg-3 { background: linear-gradient(135deg, #4facfe, #00f2fe); }
.icon-bg-4 { background: linear-gradient(135deg, #43e97b, #38f9d7); }

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 1rem;
}

.card-description {
  color: #64748b;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.card-footer {
  margin-top: auto;
}

.card-button {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
  transform: translateY(0);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  width: 100%;
}

.card-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  background: linear-gradient(135deg, #5a67d8, #6b46c1);
}

.card-button:active {
  transform: translateY(0) scale(0.98);
  transition: all 0.1s ease;
}

.button-text {
  transition: transform 0.3s ease;
}

.button-icon {
  transition: transform 0.3s ease;
  font-size: 1.1rem;
}

.card-button:hover .button-icon {
  transform: translateX(4px);
}

.card-button:hover .button-text {
  transform: translateX(-2px);
}

/* Ripple Effect */
.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  transform: scale(0);
  animation: ripple-animation 0.6s ease-out;
  pointer-events: none;
}

@keyframes ripple-animation {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

/* Loading state for button */
.card-button.loading {
  pointer-events: none;
  background: linear-gradient(135deg, #a0aec0, #cbd5e0);
}

.card-button.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Process Section */
.process-section {
  padding: 8rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.timeline-container {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

.timeline-container::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: rgba(255, 255, 255, 0.3);
  transform: translateX(-50%);
}

.timeline-item {
  display: flex;
  align-items: center;
  margin-bottom: 4rem;
  position: relative;
  opacity: 0;
  transform: translateX(-30px);
}

.timeline-item:nth-child(even) {
  flex-direction: row-reverse;
  transform: translateX(30px);
}

.timeline-icon {
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 2rem;
  position: relative;
  z-index: 2;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.step-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
}

.timeline-content {
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.timeline-content h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.timeline-content p {
  color: rgba(255, 255, 255, 0.9);
}

/* Footer */
.footer {
  background: #1a202c;
  color: white;
  padding: 4rem 2rem 2rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-main {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  margin-bottom: 2rem;
}

.footer-brand h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: white;
}

.footer-brand p {
  color: #94a3b8;
}

.footer-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.info-section h4 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: white;
}

.info-section p {
  color: #94a3b8;
  margin-bottom: 0.5rem;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-link {
  color: #94a3b8;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.footer-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
  transition: left 0.5s ease;
}

.footer-link:hover {
  color: white;
  background: rgba(102, 126, 234, 0.1);
  transform: translateX(8px);
  border-left: 3px solid #667eea;
  padding-left: 9px;
}

.footer-link:hover::before {
  left: 100%;
}

.footer-link:hover .link-arrow {
  transform: translateX(4px) scale(1.1);
  color: #667eea;
}

.footer-link:active {
  transform: translateX(4px) scale(0.98);
  transition: all 0.1s ease;
}

.link-arrow {
  font-size: 1.1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0.7;
}

/* Pulse effect on click */
.footer-link.clicked {
  animation: pulse 0.4s ease-out;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(102, 126, 234, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(102, 126, 234, 0);
  }
}

.footer-bottom {
  border-top: 1px solid #374151;
  padding-top: 2rem;
  text-align: center;
  color: #94a3b8;
}

/* Animations */
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

[data-aos] {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

[data-aos].animate-in {
  opacity: 1;
  transform: translateY(0);
}

[data-aos="fade-right"] {
  transform: translateX(-30px);
}

[data-aos="fade-left"] {
  transform: translateX(30px);
}

[data-aos="fade-right"].animate-in,
[data-aos="fade-left"].animate-in {
  transform: translateX(0);
}

/* Responsive Design */
@media (max-width: 768px) {
  .title-main {
    font-size: 1.8rem;
  }
  
  .title-highlight {
    font-size: 2.5rem;
  }
  
  .hero-description {
    font-size: 1.1rem;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .timeline-container::before {
    left: 30px;
  }
  
  .timeline-item,
  .timeline-item:nth-child(even) {
    flex-direction: row;
    transform: translateX(0);
  }
  
  .timeline-icon {
    margin: 0 1rem 0 0;
  }
  
  .footer-main,
  .footer-info {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 480px) {
  .hero-content {
    padding: 1rem;
  }
  
  .services-section,
  .process-section {
    padding: 4rem 1rem;
  }
  
  .service-card {
    padding: 1.5rem;
  }
}
</style>