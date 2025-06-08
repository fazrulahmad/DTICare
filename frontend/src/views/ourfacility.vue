<template>
  <div class="facility-page">
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
            <span class="title-main">FASILITAS</span>
            <span class="title-highlight">DTI-ITS</span>
          </h1>
          <p class="hero-description">
            Departemen Teknologi Informasi ITS dilengkapi dengan fasilitas laboratorium 
            dan ruang kelas modern untuk mendukung kegiatan pembelajaran, penelitian, 
            dan pengembangan teknologi informasi yang berkualitas tinggi.
          </p>
        </div>
      </div>
      
      <div class="scroll-indicator">
        <div class="scroll-arrow"></div>
      </div>
    </section>

    <!-- Laboratories Section -->
    <section class="laboratories-section" ref="laboratoriesSection">
      <div class="section-container">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title">Laboratorium</h2>
          <p class="section-subtitle">Fasilitas laboratorium canggih untuk riset dan pengembangan teknologi</p>
        </div>

        <!-- Gedung Perpustakaan Labs -->
        <div class="facility-group" data-aos="fade-up" data-aos-delay="100">
          <div class="group-header">
            <div class="group-badge">Perpustakaan ITS</div>
            <h3 class="group-title">Gedung Perpustakaan ITS Lantai 6</h3>
            <p class="group-description">Laboratorium utama untuk penelitian dan pengembangan</p>
          </div>
          
          <div class="labs-grid">
            <div class="lab-card" data-aos="fade-up" data-aos-delay="200">
              <div class="lab-icon">
                <div class="icon-bg icon-bg-1">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2L2 7V17A2 2 0 0 0 4 19H20A2 2 0 0 0 22 17V7L12 2Z"/>
                    <path d="M9 21V9H15V21"/>
                  </svg>
                </div>
              </div>
              <h4 class="lab-title">Laboratorium Kota Cerdas dan Keamanan Siber (KCKS)</h4>
              <p class="lab-description">
                Laboratorium untuk mengembangkan dan meneliti perkembangan kota cerdas dan keamanan siber, 
                mendukung penelitian di bidang smart city dan cybersecurity.
              </p>
              <div class="lab-features">
                <span class="feature-tag">Smart City</span>
                <span class="feature-tag">Cybersecurity</span>
                <span class="feature-tag">Research</span>
              </div>
            </div>

            <div class="lab-card" data-aos="fade-up" data-aos-delay="300">
              <div class="lab-icon">
                <div class="icon-bg icon-bg-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15A1.65 1.65 0 0 0 21 13.35A1.65 1.65 0 0 0 19.4 11.65A1.65 1.65 0 0 0 18 10A1.65 1.65 0 0 0 16.65 8.35A1.65 1.65 0 0 0 15 9.65A1.65 1.65 0 0 0 16.35 11.35A1.65 1.65 0 0 0 18 13A1.65 1.65 0 0 0 19.4 15Z"/>
                    <path d="M4.6 9A1.65 1.65 0 0 0 3 10.65A1.65 1.65 0 0 0 4.6 12.35A1.65 1.65 0 0 0 6 14A1.65 1.65 0 0 0 7.35 15.65A1.65 1.65 0 0 0 9 14.35A1.65 1.65 0 0 0 7.65 12.65A1.65 1.65 0 0 0 6 11A1.65 1.65 0 0 0 4.6 9Z"/>
                  </svg>
                </div>
              </div>
              <h4 class="lab-title">Laboratorium Riset Internet Of Things (IOT)</h4>
              <p class="lab-description">
                Laboratorium khusus untuk penelitian dan pengembangan teknologi IoT, 
                mendukung inovasi dalam bidang perangkat pintar dan sistem terhubung.
              </p>
              <div class="lab-features">
                <span class="feature-tag">IoT</span>
                <span class="feature-tag">Smart Devices</span>
                <span class="feature-tag">Innovation</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Lab Photo Gallery - Perpustakaan -->
        <div class="photo-gallery" data-aos="fade-up" data-aos-delay="400">
          <h3 class="gallery-title">Galeri Lab Perpustakaan</h3>
          <div class="expanding-cards">
            <div class="card-image" data-lab="kcks" :style="{ backgroundImage: `url(${require('@/assets/Lab-KCKS.jpg')})` }">
              <div class="image-overlay">
                <div class="image-content">
                  <h4>Lab KCKS</h4>
                  <p>Smart City & Cybersecurity</p>
                </div>
              </div>
            </div>
            <div class="card-image" data-lab="iot-research" :style="{ backgroundImage: `url(${require('@/assets/Lab-IoTpg.jpg')})` }">
              <div class="image-overlay">
                <div class="image-content">
                  <h4>Lab IoT Research</h4>
                  <p>Internet of Things Lab</p>
                </div>
              </div>
            </div>
            <div class="card-image" data-lab="perpus-overview" :style="{ backgroundImage: `url(${require('@/assets/Lab-IoT-TW2.jpg')})` }">
              <div class="image-overlay">
                <div class="image-content">
                  <h4>Lab Overview</h4>
                  <p>Modern Facilities</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tower 2 Labs -->
        <div class="facility-group" data-aos="fade-up" data-aos-delay="500">
          <div class="group-header">
            <div class="group-badge">Tower 2 ITS</div>
            <h3 class="group-title">Gedung Tower 2 ITS Lantai 9</h3>
            <p class="group-description">Laboratorium pendukung untuk kegiatan praktikum dan pembelajaran</p>
          </div>
          
          <div class="labs-grid">
            <div class="lab-card" data-aos="fade-up" data-aos-delay="600">
              <div class="lab-icon">
                <div class="icon-bg icon-bg-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="M10 4V8"/>
                    <path d="M14 4V8"/>
                    <path d="M4 8H20"/>
                    <path d="M7 12H17"/>
                    <path d="M7 16H12"/>
                  </svg>
                </div>
              </div>
              <h4 class="lab-title">Laboratorium Security Operation Center (SOC) TW2-902</h4>
              <p class="lab-description">
                Laboratorium untuk monitoring dan analisis keamanan siber, 
                mendukung pembelajaran praktik keamanan jaringan dan sistem informasi.
              </p>
              <div class="lab-features">
                <span class="feature-tag">SOC</span>
                <span class="feature-tag">Monitoring</span>
                <span class="feature-tag">Security</span>
              </div>
            </div>

            <div class="lab-card" data-aos="fade-up" data-aos-delay="700">
              <div class="lab-icon">
                <div class="icon-bg icon-bg-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 16V8A2 2 0 0 0 19 6H5A2 2 0 0 0 3 8V16A2 2 0 0 0 5 18H19A2 2 0 0 0 21 16Z"/>
                    <rect x="6" y="10" width="12" height="4"/>
                  </svg>
                </div>
              </div>
              <h4 class="lab-title">Laboratorium Internet of Things (IoT) TW2-904</h4>
              <p class="lab-description">
                Laboratorium praktikum untuk pengembangan alat cerdas IoT, 
                mendukung kegiatan pembelajaran dan praktikum mata kuliah Teknologi Informasi.
              </p>
              <div class="lab-features">
                <span class="feature-tag">IoT Practicum</span>
                <span class="feature-tag">Hardware</span>
                <span class="feature-tag">Learning</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Lab Photo Gallery - Tower 2 -->
        <div class="photo-gallery" data-aos="fade-up" data-aos-delay="800">
          <h3 class="gallery-title">Galeri Lab Tower 2</h3>
          <div class="expanding-cards">
            <div class="card-image" data-lab="soc" :style="{ backgroundImage: `url(${require('@/assets/Lab-SoC.jpg')})` }">
              <div class="image-overlay">
                <div class="image-content">
                  <h4>Lab SOC</h4>
                  <p>Security Operations Center</p>
                </div>
              </div>
            </div>
            <div class="card-image" data-lab="iot-practicum" :style="{ backgroundImage: `url(${require('@/assets/Lab-IoT-TW2.jpg')})` }">
              <div class="image-overlay">
                <div class="image-content">
                  <h4>Lab IoT Practicum</h4>
                  <p>Hands-on Learning</p>
                </div>
              </div>
            </div>
            <div class="card-image" data-lab="tower2-overview" :style="{ backgroundImage: `url(${require('@/assets/Lab-IoTpg.jpg')})` }">
              <div class="image-overlay">
                <div class="image-content">
                  <h4>Tower 2 Overview</h4>
                  <p>Modern Equipment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Classrooms Section -->
    <section class="classrooms-section" ref="classroomsSection">
      <div class="section-container">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title">Ruang Kelas</h2>
          <p class="section-subtitle">Ruang kelas modern dengan fasilitas lengkap untuk pembelajaran optimal</p>
        </div>

        <!-- Tower 2 Classrooms -->
        <div class="facility-group" data-aos="fade-up" data-aos-delay="100">
          <div class="group-header">
            <div class="group-badge">Tower 2 ITS</div>
            <h3 class="group-title">Gedung Tower 2 ITS Lantai 7</h3>
            <p class="group-description">Ruang kelas utama dengan kapasitas 40 mahasiswa</p>
          </div>
          
          <div class="classrooms-grid">
            <div class="classroom-card" data-aos="fade-up" data-aos-delay="200">
              <div class="classroom-number">TW2-702</div>
              <div class="classroom-info">
                <h4>Ruang Kelas 702</h4>
                <p class="capacity">Kapasitas: 40 Mahasiswa</p>
                <div class="classroom-features">
                  <span class="mini-feature">AC</span>
                  <span class="mini-feature">TV LED</span>
                  <span class="mini-feature">Internet</span>
                </div>
              </div>
            </div>
            <div class="classroom-card" data-aos="fade-up" data-aos-delay="250">
              <div class="classroom-number">TW2-703</div>
              <div class="classroom-info">
                <h4>Ruang Kelas 703</h4>
                <p class="capacity">Kapasitas: 40 Mahasiswa</p>
                <div class="classroom-features">
                  <span class="mini-feature">AC</span>
                  <span class="mini-feature">TV LED</span>
                  <span class="mini-feature">Internet</span>
                </div>
              </div>
            </div>
            <div class="classroom-card" data-aos="fade-up" data-aos-delay="300">
              <div class="classroom-number">TW2-704</div>
              <div class="classroom-info">
                <h4>Ruang Kelas 704</h4>
                <p class="capacity">Kapasitas: 40 Mahasiswa</p>
                <div class="classroom-features">
                  <span class="mini-feature">AC</span>
                  <span class="mini-feature">TV LED</span>
                  <span class="mini-feature">Internet</span>
                </div>
              </div>
            </div>
            <div class="classroom-card" data-aos="fade-up" data-aos-delay="350">
              <div class="classroom-number">TW2-705</div>
              <div class="classroom-info">
                <h4>Ruang Kelas 705</h4>
                <p class="capacity">Kapasitas: 40 Mahasiswa</p>
                <div class="classroom-features">
                  <span class="mini-feature">AC</span>
                  <span class="mini-feature">TV LED</span>
                  <span class="mini-feature">Internet</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Classroom Photo Gallery - Tower 2 -->
        <div class="photo-gallery" data-aos="fade-up" data-aos-delay="400">
          <h3 class="gallery-title">Galeri Ruang Kelas Tower 2</h3>
          <div class="expanding-cards">
            <div class="card-image" data-room="tw2-702" :style="{ backgroundImage: `url(${require('@/assets/kelas-tw702.jpeg')})` }">
              <div class="image-overlay">
                <div class="image-content">
                  <h4>TW2-702</h4>
                  <p>Classroom 702</p>
                </div>
              </div>
            </div>
            <div class="card-image" data-room="tw2-703" :style="{ backgroundImage: `url(${require('@/assets/kelas-tw703.jpeg')})` }">
              <div class="image-overlay">
                <div class="image-content">
                  <h4>TW2-703</h4>
                  <p>Classroom 703</p>
                </div>
              </div>
            </div>
            <div class="card-image" data-room="tw2-704" :style="{ backgroundImage: `url(${require('@/assets/kelas-tw704.jpeg')})` }">
              <div class="image-overlay">
                <div class="image-content">
                  <h4>TW2-704</h4>
                  <p>Classroom 704</p>
                </div>
              </div>
            </div>
            <div class="card-image" data-room="tw2-705" :style="{ backgroundImage: `url(${require('@/assets/kelas-tw705.jpg')})` }">
              <div class="image-overlay">
                <div class="image-content">
                  <h4>TW2-705</h4>
                  <p>Classroom 705</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Perpustakaan Classrooms -->
        <div class="facility-group" data-aos="fade-up" data-aos-delay="500">
          <div class="group-header">
            <div class="group-badge">Perpustakaan ITS</div>
            <h3 class="group-title">Gedung Perpustakaan ITS Lantai 6</h3>
            <p class="group-description">Ruang kelas laboratorium terintegrasi</p>
          </div>
          
          <div class="classrooms-grid special-grid">
            <div class="classroom-card special" data-aos="fade-up" data-aos-delay="600">
              <div class="classroom-number special-number">IT-608</div>
              <div class="classroom-info">
                <h4>Kelas Lab Riset</h4>
                <p class="capacity">Lab Research Integrated</p>
                <div class="classroom-features">
                  <span class="mini-feature">Research Lab</span>
                  <span class="mini-feature">Advanced Tech</span>
                </div>
              </div>
            </div>
            <div class="classroom-card special" data-aos="fade-up" data-aos-delay="650">
              <div class="classroom-number special-number">IT-603</div>
              <div class="classroom-info">
                <h4>Kelas Lab KCKS</h4>
                <p class="capacity">KCKS Lab Integrated</p>
                <div class="classroom-features">
                  <span class="mini-feature">Smart City</span>
                  <span class="mini-feature">Cybersecurity</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Classroom Photo Gallery - Perpustakaan -->
        <div class="photo-gallery" data-aos="fade-up" data-aos-delay="700">
          <h3 class="gallery-title">Galeri Ruang Kelas Perpustakaan</h3>
          <div class="expanding-cards">
            <div class="card-image" data-room="it-608" :style="{ backgroundImage: `url(${require('@/assets/kelas-it608.jpeg')})` }">
              <div class="image-overlay">
                <div class="image-content">
                  <h4>IT-608</h4>
                  <p>Research Lab Class</p>
                </div>
              </div>
            </div>
            <div class="card-image" data-room="it-603" :style="{ backgroundImage: `url(${require('@/assets/Lab-KCKS.jpg')})` }">
              <div class="image-overlay">
                <div class="image-content">
                  <h4>IT-603</h4>
                  <p>KCKS Lab Class</p>
                </div>
              </div>
            </div>
            <div class="card-image" data-room="perpus-class-overview" :style="{ backgroundImage: `url(${require('@/assets/Lab-IoTpg.jpg')})` }">
              <div class="image-overlay">
                <div class="image-content">
                  <h4>Overview</h4>
                  <p>Library Building</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Facilities Features Section -->
    <section class="features-section" ref="featuresSection">
      <div class="section-container">
        <div class="section-header" data-aos="fade-up">
          <h2 class="section-title">Fasilitas Ruang Kelas</h2>
          <p class="section-subtitle">Setiap ruang kelas dilengkapi dengan fasilitas modern untuk mendukung pembelajaran</p>
        </div>
        
        <div class="features-grid">
          <div class="feature-card" data-aos="fade-up" data-aos-delay="100">
            <div class="feature-icon">
              <div class="icon-bg icon-bg-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V21A1.5 1.5 0 0 1 19.5 22.5H4.5A1.5 1.5 0 0 1 3 21V8.5A1.5 1.5 0 0 1 4.5 7H19.5A1.5 1.5 0 0 1 21 8.5Z"/>
                  <path d="M8 12H16M8 16H12"/>
                </svg>
              </div>
            </div>
            <h3 class="feature-title">Air Conditioner (AC)</h3>
            <p class="feature-description">Sistem pendingin ruangan untuk kenyamanan pembelajaran sepanjang hari</p>
          </div>

          <div class="feature-card" data-aos="fade-up" data-aos-delay="200">
            <div class="feature-icon">
              <div class="icon-bg icon-bg-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
            </div>
            <h3 class="feature-title">TV LED Premium</h3>
            <p class="feature-description">TV LED Sony 85 inch dan Samsung 65 inch untuk presentasi berkualitas tinggi</p>
          </div>

          <div class="feature-card" data-aos="fade-up" data-aos-delay="300">
            <div class="feature-icon">
              <div class="icon-bg icon-bg-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M16 8A13 13 0 0 1 6 21A13 13 0 0 1 16 8Z"/>
                  <path d="M9 12A13 13 0 0 1 20 10A13 13 0 0 1 9 12Z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
            </div>
            <h3 class="feature-title">Akses Internet</h3>
            <p class="feature-description">Koneksi internet berkecepatan tinggi di setiap ruang kelas</p>
          </div>

          <div class="feature-card" data-aos="fade-up" data-aos-delay="400">
            <div class="feature-icon">
              <div class="icon-bg icon-bg-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="12" rx="1"/>
                  <path d="M7 8H17M7 12H15"/>
                </svg>
              </div>
            </div>
            <h3 class="feature-title">Papan Tulis</h3>
            <p class="feature-description">Papan tulis modern untuk mendukung metode pembelajaran interaktif</p>
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
              <h4>Fasilitas</h4>
              <div class="footer-links">
                <a href="#" class="footer-link">
                  <span>Laboratorium KCKS</span>
                  <span class="link-arrow">→</span>
                </a>
                <a href="#" class="footer-link">
                  <span>Laboratorium IoT</span>
                  <span class="link-arrow">→</span>
                </a>
                <a href="#" class="footer-link">
                  <span>Laboratorium SOC</span>
                  <span class="link-arrow">→</span>
                </a>
                <a href="#" class="footer-link">
                  <span>Ruang Kelas</span>
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
  name: "OurFacility",
  mounted() {
    this.initScrollAnimations();
    this.initParallaxEffects();
  },
  methods: {
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
          const speed = scrolled * 0.3;
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

.facility-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
  color: #1a202c;
  overflow-x: hidden;
}

/* Hero Section */
.hero-section {
  min-height: 80vh;
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
  width: 80px;
  height: 80px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.circle-2 {
  width: 120px;
  height: 120px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.circle-3 {
  width: 60px;
  height: 60px;
  bottom: 30%;
  left: 70%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  padding: 0 2rem;
}

.hero-text {
  color: white;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 1s ease forwards;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.title-main {
  display: block;
  color: rgba(255, 255, 255, 0.9);
}

.title-highlight {
  display: block;
  background: linear-gradient(45deg, #fbbf24, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.hero-description {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.scroll-arrow {
  width: 30px;
  height: 30px;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  transform: rotate(45deg);
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0) rotate(45deg);
  }
  40% {
    transform: translateY(-10px) rotate(45deg);
  }
  60% {
    transform: translateY(-5px) rotate(45deg);
  }
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Section Styles */
.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.laboratories-section,
.classrooms-section {
  padding: 6rem 0;
  background: #fafafa;
}

.classrooms-section {
  background: white;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 1rem;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
}

/* Facility Groups */
.facility-group {
  margin-bottom: 4rem;
}

.group-header {
  text-align: center;
  margin-bottom: 3rem;
}

.group-badge {
  display: inline-block;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.group-title {
  font-size: 2rem;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 0.5rem;
}

.group-description {
  font-size: 1rem;
  color: #64748b;
}

/* Labs Grid */
.labs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.lab-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
}

.lab-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.lab-icon {
  margin-bottom: 1.5rem;
}

.icon-bg {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.icon-bg-1 {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.icon-bg-2 {
  background: linear-gradient(135deg, #06b6d4, #0891b2);
}

.icon-bg-3 {
  background: linear-gradient(135deg, #10b981, #059669);
}

.icon-bg-4 {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.icon-bg svg {
  width: 24px;
  height: 24px;
}

.lab-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.lab-description {
  color: #64748b;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.lab-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.feature-tag {
  background: #f1f5f9;
  color: #475569;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
}

/* Photo Gallery */
.photo-gallery {
  margin: 4rem 0;
  padding: 0 2rem;
}

.gallery-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 3rem;
}

.expanding-cards {
  display: flex;
  gap: 1rem;
  height: 400px; /* Tinggi tetap */
  max-width: 1200px;
  margin: 0 auto;
}

 /* Styling untuk setiap card image */
.card-image {
  flex: 1;
  height: 100%; /* Menggunakan tinggi penuh dari container */
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  
  /* KUNCI: Properti background untuk full image */
  background-size: cover !important;
  background-position: center center !important;
  background-repeat: no-repeat !important;
  background-attachment: scroll !important;
  
  /* Efek default untuk smooth transition */
  filter: brightness(0.9);
}

/* Card yang tidak di-hover akan mengecil secara horizontal */
.expanding-cards:hover .card-image:not(:hover) {
  flex: 0.7; /* Mengecil secara horizontal */
  filter: brightness(0.6) blur(1px);
  /* Tidak menggunakan transform scale agar tinggi tetap */
}

.card-placeholder {
  width: 80px;
  height: 300px;
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
  border-radius: 20px;
  cursor: pointer;
  transition: width 0.5s ease-in-out, transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
}

.card-image:hover {
  flex: 2;
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 2rem 1.5rem 1.5rem;
  color: white;
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.3s ease;
}

.card-image:hover .image-overlay {
  transform: translateY(0);
  opacity: 1;
}

.image-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.image-content p {
  font-size: 0.875rem;
  opacity: 0.9;
}

/* Classrooms Grid */
.classrooms-grid {
  display: grid;
  padding: 0 100px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 4rem;
  max-width: 1200px; /* Optional: limit maximum width */
  margin-left: auto;
  margin-right: auto;
}

.special-grid {
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
}

.classroom-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.classroom-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.classroom-card.special {
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  border: 2px solid #e2e8f0;
}

.classroom-number {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.special-number {
  background: linear-gradient(135deg, #10b981, #059669);
}

.classroom-info h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 0.25rem;
}

.capacity {
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
}

.classroom-features {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.mini-feature {
  background: #e0e7ff;
  color: #5b21b6;
  padding: 0.125rem 0.5rem;
  border-radius: 12px;
  font-size: 0.625rem;
  font-weight: 500;
}

/* Features Section */
.features-section {
  padding: 6rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.features-grid {
  display: grid;
  padding: 0 100px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 4rem;
  max-width: 1200px; /* Optional: limit maximum width */
  margin-left: auto;
  margin-right: auto;
}

.feature-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
}

.feature-icon {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 0.75rem;
}

.feature-description {
  color: #64748b;
  line-height: 1.6;
}

/* Footer */
.footer {
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  color: white;
  padding: 3rem 0 1rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-main {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  margin-bottom: 2rem;
}

.footer-brand h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(45deg, #fbbf24, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-brand p {
  color: #a0aec0;
  font-size: 1rem;
}

.footer-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.info-section h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #fbbf24;
}

.info-section p {
  color: #cbd5e0;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #cbd5e0;
  text-decoration: none;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.footer-link:hover {
  color: #fbbf24;
  padding-left: 0.5rem;
}

.link-arrow {
  transition: transform 0.3s ease;
}

.footer-link:hover .link-arrow {
  transform: translateX(5px);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
  text-align: center;
}

.footer-bottom p {
  color: #a0aec0;
  font-size: 0.875rem;
}

/* Animation Classes */
[data-aos] {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

[data-aos].animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-description {
    font-size: 1.1rem;
  }
  
  .labs-grid {
    grid-template-columns: 1fr;
  }
  
  .expanding-cards {
    flex-wrap: wrap;
    justify-content: center;
  }

 /* Styling untuk setiap card image */
.card-image {
  flex: 1;
  min-width: 100%;
  height: 100%; /* Menggunakan tinggi penuh dari container */
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  
  /* KUNCI: Properti background untuk full image */
  background-size: cover !important;
  background-position: center center !important;
  background-repeat: no-repeat !important;
  background-attachment: scroll !important;
  
  /* Efek default untuk smooth transition */
  filter: brightness(0.9);
}

/* Ketika card aktif (dipilih/hover) */
.card-image.active {
  flex: 3;
  transform: scale(1.02);
}

/* Hover effect untuk card yang tidak aktif */
.card-image:not(.active):hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}

/* Overlay untuk konten text */
.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
  display: flex;
  align-items: flex-end;
  padding: 2rem;
  transition: all 0.3s ease;
}

/* Konten text di dalam overlay */
.image-content {
  color: white;
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.4s ease;
}

/* Hover effect - card akan expand secara horizontal (X-axis) ketika di-hover */
.card-image:hover {
  flex: 3; /* Melebar secara horizontal */
  /* Tidak menggunakan transform scale agar tinggi tetap */
  filter: brightness(1.1);
  z-index: 10;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
}

/* Tampilkan konten ketika di-hover */
.card-image:hover .image-content {
  transform: translateY(0);
  opacity: 1;
}

/* Styling untuk title dan description */
.image-content h4 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.image-content p {
  font-size: 1rem;
  opacity: 0.9;
  line-height: 1.4;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

/* Responsive design */
@media (max-width: 768px) {
  .expanding-cards {
    flex-direction: column;
    height: auto;
    gap: 1rem;
  }
  
  .card-image {
    height: 200px;
    flex: none;
  }
  
  .card-image.active {
    flex: none;
    height: 300px;
  }
  
  .gallery-title {
    font-size: 2rem;
  }
  
  .photo-gallery {
    padding: 0 1rem;
  }
}

/* Animasi masuk untuk gallery */
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

.photo-gallery[data-aos="fade-up"] {
  animation: fadeInUp 0.8s ease-out;
}
  
  .card-image {
    height: 200px;
  }
  
  .classrooms-grid,
  .special-grid {
    grid-template-columns: 1fr;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .footer-main {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .footer-info {
    grid-template-columns: 1fr;
  }
  
  .section-container {
    padding: 0 1rem;
  }
  
  .classroom-card {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 640px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .group-title {
    font-size: 1.5rem;
  }
  
  .lab-card,
  .feature-card {
    padding: 1.5rem;
  }
}

/* Smooth Scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #5a67d8, #6b46c1);
}
</style>