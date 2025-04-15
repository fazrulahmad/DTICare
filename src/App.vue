<template>
  <div id="app">
    <Navbar />
    <Home />
  </div>
</template>

<script>
import Navbar from './components/BaseNavbar.vue'
import Home from './views/HomePage.vue'

export default {
  components: {
    Navbar,
    Home
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: 'Arial', sans-serif;
}
</style>
