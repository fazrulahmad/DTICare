<template>
  <div class="status-surat-container">
    <h1>Status Pengajuan Surat</h1>

    <!-- Filter Bar -->
    <div class="filter-bar">
      <div class="search-bar">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Search" v-model="searchQuery" />
      </div>
      <input type="date" v-model="filterDate" class="date-picker" />
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
        <tr v-for="(surat, index) in filteredSurat" :key="index">
          <td>{{ formatTanggal(surat.tanggalPengajuan) }}</td>
          <td>{{ surat.tipe }}</td>
          <td>
            <input
              type="checkbox"
              :checked="surat.status"
              :disabled="!isAdmin"
              @change="updateStatus(surat, index)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      searchQuery: '',
      filterDate: '',
      isAdmin: false, // set ke true jika login sebagai admin
      suratList: [],
    }
  },
  computed: {
    filteredSurat() {
      return this.suratList.filter((item) => {
        const matchQuery =
          item.nama.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.tipe.toLowerCase().includes(this.searchQuery.toLowerCase())

        const matchDate = this.filterDate
          ? item.tanggalPengajuan.slice(0, 10) === this.filterDate
          : true

        return matchQuery && matchDate
      })
    },
  },
  methods: {
    async fetchSurat() {
      try {
        const res = await axios.get('http://localhost:5000/api/status')
        this.suratList = res.data
      } catch (err) {
        console.error('Gagal mengambil data:', err)
      }
    },
    formatTanggal(dateStr) {
      const date = new Date(dateStr)
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    },
    async updateStatus(surat, index) {
      const updatedStatus = !surat.status
      try {
        await axios.put(`http://localhost:5000/api/status/${surat._id}`, {
          status: updatedStatus,
          tipe: surat.tipe,
        })
        this.suratList[index].status = updatedStatus
      } catch (err) {
        console.error('Gagal mengubah status:', err)
      }
    },
  },
  mounted() {
    this.fetchSurat()

    // Contoh: ambil role dari localStorage
    const role = localStorage.getItem('role')
    this.isAdmin = role === 'admin'
  },
}
</script>

<style scoped>
.status-surat-container {
  background-color: #003366;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
  color: white;
}

.filter-bar {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 1rem auto;
}

.search-bar {
  background: white;
  padding: 0.5rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  max-width: 400px;
}

.search-bar input {
  border: none;
  outline: none;
  flex: 1;
  padding: 0.5rem;
}

.date-picker {
  padding: 0.5rem;
  border-radius: 1rem;
  border: none;
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

.status-table input[type='checkbox'] {
  width: 20px;
  height: 20px;
}
</style>
