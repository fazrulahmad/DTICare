<template>
  <div class="form-wrapper">
    <h2 class="form-title">Form Rekomendasi</h2>
    <form @submit.prevent="handleSubmit" class="form-body">
      <input v-model="form.nrp" type="text" placeholder="NRP" class="form-input" />
      <input v-model="form.nama" type="text" placeholder="Nama" class="form-input" />
      <input v-model="form.prodi" type="text" placeholder="Prodi" class="form-input" />
      <input v-model="form.fakultas" type="text" placeholder="Fakultas" class="form-input" />
      <input v-model="form.semester" type="text" placeholder="Semester ke (Gasal/Genap T.A. 20xx)" class="form-input" />
      <input v-model="form.ipk" type="text" placeholder="IPK" class="form-input" />
      <input v-model="form.jumlahSKS" type="text" placeholder="Jumlah SKS yang ditempuh dan lulus" class="form-input" />
      <input v-model="form.namaKegiatan" type="text" placeholder="Nama Kegiatan (lomba/beasiswa/dll)" class="form-input" />
      <input v-model="form.penyelenggaraKegiatan" type="text" placeholder="Penyelenggara Kegiatan" class="form-input" />
      <input v-model="form.lokasiKegiatan" type="text" placeholder="Lokasi Kegiatan" class="form-input" />
      <input v-model="form.linkFilePendukung" type="text" placeholder="Link File Pendukung Kegiatan (flyer/poster/dll)" class="form-input" />

      <button class="submit-btn" type="submit">Kirim</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        nrp: '',
        nama: '',
        prodi: '',
        fakultas: '',
        semester: '',
        ipk: '',
        jumlahSKS: '',
        namaKegiatan: '',
        penyelenggaraKegiatan: '',
        lokasiKegiatan: '',
        linkFilePendukung: ''
      }
    };
  },
  methods: {
    async handleSubmit() {
      try {
        await axios.post('http://localhost:5000/api/rekomendasi', this.form);
        alert('Form berhasil dikirim!');
        // Reset form setelah submit
        this.form = {
          nrp: '',
          nama: '',
          prodi: '',
          fakultas: '',
          semester: '',
          ipk: '',
          jumlahSKS: '',
          namaKegiatan: '',
          penyelenggaraKegiatan: '',
          lokasiKegiatan: '',
          linkFilePendukung: ''
        };
      } catch (error) {
        console.error(error);
        alert('Gagal mengirim form.');
      }
    }
  }
};
</script>

<style scoped>
/* (CSS kamu tetap sama seperti sebelumnya) */
.form-wrapper {
  max-width: 700px;
  margin: 2rem auto;
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  font-family: 'Arial', sans-serif;
}

.form-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #003366;
  margin-bottom: 1.5rem;
  text-align: center;
}

.form-body {
  display: flex;
  flex-direction: column;
}

.form-input {
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border 0.2s;
}

.form-input:focus {
  border-color: #003366;
  outline: none;
}

.submit-btn {
  background-color: #003366;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #00509e;
}
</style>
