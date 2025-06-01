<template>
  <nav class="navbar" :class="{ 'scrolled': isScrolled, 'menu-open': isOpen }">
    <div class="navbar-content">
      <!-- Logo Section -->
      <router-link to="/" class="logo-section" @click="scrollToTop">
        <div class="logo-container">
          <img src="@/assets/logo.png" alt="Logo ITS" class="logo" />
          <div class="logo-text">
            <span class="logo-title">DTI</span>
            <span class="logo-subtitle">CARE</span>
          </div>
        </div>
      </router-link>

      <!-- Hamburger Menu (Mobile) -->
      <button @click="toggleMenu" class="menu-btn md:hidden" :class="{ 'active': isOpen }">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>

      <!-- Navigation Links -->
      <div class="nav-links" :class="{ 'active': isOpen }">
        <div class="nav-content">
          <router-link to="/" class="nav-btn" @click="closeMenu">
            <span class="nav-icon">🏠</span>
            <span class="nav-text">Dashboard</span>
            <span class="nav-ripple"></span>
          </router-link>
          <router-link to="/form-layanan" class="nav-btn" @click="closeMenu">
            <span class="nav-icon">📄</span>
            <span class="nav-text">Ajukan Surat</span>
            <span class="nav-ripple"></span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="scroll-progress" :style="{ width: scrollProgress + '%' }"></div>
  </nav>
</template>

<script>
export default {
  name: 'BaseNavbar',
  data() {
    return {
      isOpen: false,
      windowWidth: window.innerWidth,
      isScrolled: false,
      scrollProgress: 0
    }
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    
    closeMenu() {
      this.isOpen = false;
    },
    
    handleClickOutside(event) {
      const navbar = this.$el;
      if (navbar && !navbar.contains(event.target)) {
        this.closeMenu();
      }
    },
    
    handleResize() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth >= 768 && this.isOpen) {
        this.closeMenu();
      }
    },
    
    handleScroll() {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      this.isScrolled = scrollTop > 30;
      this.scrollProgress = (scrollTop / docHeight) * 100;
    },
    
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      this.closeMenu();
    }
  },
  
  mounted() {
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("scroll", this.handleScroll);
    
    // Close dropdown when clicking outside
    document.addEventListener("click", this.handleClickOutside);
    
    // Add smooth scroll behavior to all internal links
    document.documentElement.style.scrollBehavior = 'smooth';
  },
  
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("scroll", this.handleScroll);
    document.removeEventListener("click", this.handleClickOutside);
    document.body.style.overflow = '';
  }
}
</script>

<style scoped>
/* Base Navbar Styles */
.navbar {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: linear-gradient(
    135deg, 
    rgba(102, 126, 234, 0.95) 0%, 
    rgba(118, 75, 162, 0.95) 50%,
    rgba(6, 182, 212, 0.95) 100%
  );
  backdrop-filter: blur(20px);
  color: white;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  padding: 0.75rem 1.5rem;
  box-shadow: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  overflow: visible;
}

.navbar.scrolled {
  background: linear-gradient(
    135deg, 
    rgba(102, 126, 234, 0.98) 0%, 
    rgba(118, 75, 162, 0.98) 50%,
    rgba(6, 182, 212, 0.98) 100%
  );
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(25px);
  padding: 0.5rem 1.5rem;
}

.navbar-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

/* Logo Section */
.logo-section {
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  color: inherit;
}

.logo-section:hover {
  transform: scale(1.05);
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo {
  height: 32px;
  width: auto;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
  transition: all 0.3s ease;
}

.navbar.scrolled .logo {
  height: 28px;
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.logo-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.5px;
}

.logo-subtitle {
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

/* Hamburger Menu */
.menu-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 1001;
}

.menu-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: scale(1.05);
}

.hamburger-line {
  width: 20px;
  height: 2px;
  background: white;
  margin: 2px 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.menu-btn.active .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
  background: #ff6b6b;
}

.menu-btn.active .hamburger-line:nth-child(2) {
  opacity: 0;
  transform: translateX(30px);
}

.menu-btn.active .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
  background: #ff6b6b;
}

.menu-btn.active {
  background: rgba(255, 255, 255, 0.3);
}

/* Navigation Links */
.nav-links {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 280px;
  background: linear-gradient(
    135deg, 
    rgba(255, 255, 255, 0.95) 0%, 
    rgba(248, 250, 252, 0.95) 100%
  );
  backdrop-filter: blur(20px);
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1), 
              0 8px 16px rgba(0, 0, 0, 0.05),
              inset 0 1px 0 rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin-top: 0.5rem;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px) scale(0.95);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 1000;
  overflow: hidden;
}

.nav-links.active {
  display: block;
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
}

.nav-links::before {
  content: '';
  position: absolute;
  top: -8px;
  right: 16px;
  width: 16px;
  height: 16px;
  background: linear-gradient(
    135deg, 
    rgba(255, 255, 255, 0.95) 0%, 
    rgba(248, 250, 252, 0.95) 100%
  );
  transform: rotate(45deg);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  border-left: 1px solid rgba(255, 255, 255, 0.3);
}

.nav-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.25rem;
  transform: translateY(10px);
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s;
}

.nav-links.active .nav-content {
  transform: translateY(0);
  opacity: 1;
}

/* Navigation Buttons */
.nav-btn {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.08), rgba(118, 75, 162, 0.05));
  color: #374151;
  border: none;
  padding: 0.875rem 1.25rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(102, 126, 234, 0.1);
  overflow: hidden;
  width: 100%;
  justify-content: flex-start;
  transform: translateX(-10px);
  opacity: 0;
  animation: slideInRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.nav-btn:nth-child(1) {
  animation-delay: 0.1s;
}

.nav-btn:nth-child(2) {
  animation-delay: 0.2s;
}

.nav-btn:hover {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.1));
  color: #667eea;
  transform: translateX(4px) translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.2);
  border-color: rgba(102, 126, 234, 0.3);
}

.nav-btn:active {
  transform: translateX(2px) translateY(-1px);
  transition: all 0.1s ease;
}

.nav-icon {
  font-size: 1.1rem;
  transition: transform 0.3s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.nav-btn:hover .nav-icon {
  transform: scale(1.2) rotate(5deg);
}

.nav-text {
  transition: all 0.3s ease;
  font-weight: 600;
}

.nav-btn:hover .nav-text {
  transform: translateX(2px);
  color: #667eea;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Ripple Effect */
.nav-ripple {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%);
  opacity: 0;
  transform: scale(0);
  transition: all 0.6s ease;
  pointer-events: none;
}

.nav-btn:active .nav-ripple {
  opacity: 1;
  transform: scale(1);
  transition: all 0.3s ease;
}

/* Scroll Progress Bar */
.scroll-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: linear-gradient(90deg, #43e97b, #38f9d7, #667eea);
  transition: width 0.1s ease;
  border-radius: 0 1px 0 0;
}

/* Desktop Styles */
@media (min-width: 768px) {
  .navbar {
    padding: 0.875rem 1.5rem;
    position: relative;
  }
  
  .navbar.scrolled {
    padding: 0.625rem 1.5rem;
  }
  
  .menu-btn {
    display: none;
  }
  
  .nav-links {
    display: flex;
    position: static;
    width: auto;
    min-width: auto;
    background: none;
    backdrop-filter: none;
    opacity: 1;
    visibility: visible;
    z-index: auto;
    box-shadow: none;
    border: none;
    border-radius: 0;
    margin-top: 0;
    transform: none;
  }
  
  .nav-links::before {
    display: none;
  }
  
  .nav-content {
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: auto;
    gap: 0.875rem;
    padding: 0;
    transform: none;
    opacity: 1;
    transition: none;
  }
  
  .nav-btn {
    min-width: auto;
    padding: 0.625rem 1rem;
    font-size: 0.875rem;
    background: rgba(255, 255, 255, 0.15);
    color: white;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    width: auto;
    justify-content: center;
    transform: none;
    opacity: 1;
    animation: none;
  }
  
  .nav-btn:hover {
    background: rgba(255, 255, 255, 0.25);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  
  .nav-btn:hover .nav-text {
    color: white;
  }
}

/* Mobile Responsive */
@media (max-width: 480px) {
  .navbar {
    padding: 0.625rem 1rem;
  }
  
  .logo-text {
    display: none;
  }
  
  .nav-links {
    right: -0.5rem;
    min-width: 260px;
  }
  
  .nav-btn {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }
}

/* Enhanced Animations */
@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.navbar {
  animation: slideInDown 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Smooth transitions for router-link-active */
.nav-btn.router-link-active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  transform: scale(1.03);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

@media (min-width: 768px) {
  .nav-btn.router-link-active {
    background: rgba(255, 255, 255, 0.3);
    color: white;
    transform: translateY(-1px);
  }
}

/* Body padding for fixed navbar */
body {
  padding-top: 60px;
}

@media (min-width: 768px) {
  body {
    padding-top: 0;
  }
}
</style>