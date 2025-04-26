<template>
    <div class="status-surat-container">
      <h1>Status Pengajuan Surat</h1>
  
      <!-- Search bar -->
      <div class="search-bar">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Search" v-model="searchQuery" />
      </div>
  
      <!-- Table -->
      <table class="status-table">
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Jenis Surat</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="surat in filteredSurat" :key="surat.id">
            <td>{{ surat.tanggal }}</td>
            <td>{{ surat.jenis }}</td>
            <td>
              <input
                type="checkbox"
                v-model="surat.status"
                :disabled="!isAdmin"
                @change="updateStatus(surat)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: "",
        isAdmin: false, // false = user biasa, true = admin
        suratList: [
          { id: 1, tanggal: "20 April 2025", jenis: "Surat Peminjaman Ruangan", status: true },
          { id: 2, tanggal: "21 April 2025", jenis: "Surat Peminjaman Ruangan", status: false },
          { id: 3, tanggal: "22 April 2025", jenis: "Surat Peminjaman Ruangan", status: false },
        ],
      };
    },
    computed: {
      filteredSurat() {
        if (!this.searchQuery) return this.suratList;
        const query = this.searchQuery.toLowerCase();
        return this.suratList.filter(
          (item) =>
            item.tanggal.toLowerCase().includes(query) ||
            item.jenis.toLowerCase().includes(query)
        );
      },
    },
    methods: {
      updateStatus(surat) {
        // kalau nanti sudah ada API, kamu tinggal panggil API update di sini
        console.log(`Status surat ${surat.id} diubah menjadi ${surat.status}`);
      },
    },
  };
  </script>
  
  <style scoped>
  .status-surat-container {
    background-color: #003366;
    min-height: 100vh;
    padding: 2rem;
    text-align: center;
    color: white;
  }
  
  .search-bar {
    background: white;
    padding: 0.5rem;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    margin: 1rem auto;
    max-width: 400px;
  }
  
  .search-bar input {
    border: none;
    outline: none;
    flex: 1;
    padding: 0.5rem;
  }
  
  .status-table {
    width: 80%;
    margin: 2rem auto;
    background: white;
    border-radius: 1rem;
    overflow: hidden;
  }
  
  .status-table th,
  .status-table td {
    padding: 1rem;
    color: black;
  }
  
  .status-table input[type="checkbox"] {
    width: 20px;
    height: 20px;
  }
  </style>
  