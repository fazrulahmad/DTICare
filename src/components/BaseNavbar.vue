<template>
  <nav class="navbar">
    <img src="@/assets/logo.png" alt="Logo ITS" class="logo" />
    <div class="nav-links">
      <button>Dashboard</button>
      <button>Status</button>
      <button>Ajukan Surat</button>
      <i class="fas fa-user"></i>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #003366;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 2rem;
}
.logo {
  height: 40px;
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 1rem;
}
button {
  background: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-weight: bold;
  cursor: pointer;
}
i {
  color: white;
  font-size: 1.5rem;
}
</style>
