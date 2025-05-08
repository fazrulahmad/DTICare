<template>
  <nav class="navbar">
    <!-- Logo -->
    <img src="@/assets/logo.png" alt="Logo ITS" class="logo" />

    <!-- Hamburger icon (Mobile) -->
    <button @click="toggleMenu" class="menu-btn md:hidden text-white text-2xl">
      <i :class="isOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
    </button>

    <!-- Navigation links -->
    <transition name="slide-fade">
      <div
        v-show="isOpen || windowWidth >= 768"
        class="nav-links"
      >
        <router-link to="/" class="nav-btn" @click="closeMenu">Dashboard</router-link>
        <router-link to="/form-layanan" class="nav-btn" @click="closeMenu">Ajukan Surat</router-link>

        <i class="fas fa-user text-white text-lg md:ml-4 mt-2 md:mt-0"></i>
      </div>
    </transition>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      windowWidth: window.innerWidth
    }
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen
    },
    closeMenu() {
      if (this.windowWidth < 768) {
        this.isOpen = false
      }
    },
    handleResize() {
      this.windowWidth = window.innerWidth
      if (this.windowWidth >= 768) {
        this.isOpen = false
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style scoped>
/* Navbar */
.navbar {
  background-color: #003366;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1.5rem;
  flex-wrap: wrap;
  position: relative;
}

/* Logo */
.logo {
  height: 40px;
}

/* Hamburger */
.menu-btn {
  background: none;
  border: none;
}

/* Nav links container */
.nav-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  margin-top: 0.8rem;
}

/* Tombol nav */
.nav-btn {
  background: white;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  color: #003366;
  text-align: center;
  width: 100%;
  transition: background 0.2s;
}

/* Hover */
.nav-btn:hover {
  background-color: #e0e0e0;
}

/* Di desktop */
@media (min-width: 768px) {
  .nav-links {
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    width: auto;
    margin-top: 0;
  }

  .nav-btn {
    width: auto;
    margin: 0 6px;
  }
}

/* Transition efek buka-tutup */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
