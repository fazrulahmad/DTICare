<template>
  <div id="app">
    <Navbar />
    <router-view />
    <!-- Tambahkan komponen ErrorMessage untuk menampilkan notifikasi error -->
    <ErrorMessage />
  </div>
</template>

<script>
import Navbar from './components/BaseNavbar.vue'
import ErrorMessage from './components/ErrorMessage.vue'

export default {
  components: {
    Navbar,
    ErrorMessage
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: 'Arial', sans-serif;
}

/* Tambahan style untuk error handling */
#app {
  position: relative;
  min-height: 100vh;
}
</style>