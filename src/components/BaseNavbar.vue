<template>
  <nav class="navbar">
    <img src="@/assets/logo.png" alt="Logo ITS" class="logo" />

    <!-- Hamburger mobile -->
    <button @click="toggleMenu" class="menu-btn md:hidden text-white text-2xl">
      <i :class="isOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
    </button>

    <!-- Nav links -->
    <div
      :class="[
        'nav-links',
        isOpen ? 'flex' : 'hidden',
        'flex-col gap-y-2',
        'md:flex md:flex-row md:items-center md:gap-x-4'
      ]"
    >
      <!-- Dashboard ➔ ke Home (path "/") -->
      <router-link to="/" class="nav-btn">Dashboard</router-link>

      <!-- Status ➔ misal ke "/status" (pastikan route-nya sudah ada) -->
      <router-link to="/status" class="nav-btn">Status</router-link>

      <!-- Ajukan Surat ➔ ke FormLayanan -->
      <router-link to="/form-layanan" class="nav-btn">Ajukan Surat</router-link>

      <i class="fas fa-user text-white text-lg ml-2"></i>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return { isOpen: false }
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: #003366;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1.5rem;
  flex-wrap: wrap;
}

.logo {
  height: 40px;
}

/* styling tombol/link */
.nav-btn {
  background: white;
  border: none;
  border-radius: 8px;
  padding: 0.4rem 0.8rem;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  color: #003366;
  text-align: center;
}

.nav-btn:hover {
  background-color: #e0e0e0;
}

/* hamburger mobile */
.menu-btn {
  background: none;
  border: none;
}

/* transisi menu */
.nav-links {
  transition: all 0.3s ease;
}
</style>
