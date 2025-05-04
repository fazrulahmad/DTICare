<template>
  <div class="form-wrapper">
    <h2 class="form-title">Form Pengajuan Kerja Praktik (KP)</h2>
    <form @submit.prevent="handleSubmit" class="form-body">
      <div v-for="i in 4" :key="i">
        <h3>Mahasiswa {{ i }}</h3>
        <input v-model="formData[`nrp${i}`]" type="text" :placeholder="`NRP Mahasiswa ${i}`" class="form-input" />
        <input v-model="formData[`nama${i}`]" type="text" :placeholder="`Nama Mahasiswa ${i}`" class="form-input" />
        <input v-model="formData[`email${i}`]" type="email" :placeholder="`Email Mahasiswa ${i}`" class="form-input" />
        <input v-model="formData[`nomer${i}`]" type="text" :placeholder="`No HP Mahasiswa ${i}`" class="form-input" />
        <input v-model="formData[`sks${i}`]" type="number" :placeholder="`Jumlah SKS Mahasiswa ${i}`" class="form-input" />
      </div>

      <h3>Data Institusi Tujuan KP</h3>
      <input v-model="formData.pejabat" type="text" placeholder="Nama Pejabat" class="form-input" />
      <input v-model="formData.jabatan" type="text" placeholder="Jabatan Pejabat" class="form-input" />
      <input v-model="formData.institusi" type="text" placeholder="Nama Institusi" class="form-input" />
      <input v-model="formData.alamat" type="text" placeholder="Alamat Institusi" class="form-input" />
      <input v-model="formData.nomertelp" type="text" placeholder="No Telepon Institusi" class="form-input" />

      <h3>Periode Kerja Praktik</h3>
      <input v-model="formData.rencanaperiode" type="number" placeholder="Durasi KP (dalam bulan)" class="form-input" />
      
      <label class="form-label">Tanggal Mulai Kerja Praktik</label>
      <input v-model="formData.tanggalmulai" type="date" class="form-input" />

      <label class="form-label">Tanggal Selesai Kerja Praktik</label>
      <input v-model="formData.tanggalselesai" type="date" class="form-input" />

      <textarea v-model="formData.catatan" placeholder="Catatan Tambahan (opsional)" class="form-input"></textarea>
      <input v-model="formData.nama_pengaju" type="text" placeholder="Nama Mahasiswa Pengaju" class="form-input" />

      <!-- Tanggal pengajuan otomatis, tidak ditampilkan -->
      <input type="hidden" v-model="formData.haripengajuan" />

      <button type="submit" class="submit-btn">Kirim & Unduh Surat</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        nrp1: '', nama1: '', email1: '', nomer1: '', sks1: '',
        nrp2: '', nama2: '', email2: '', nomer2: '', sks2: '',
        nrp3: '', nama3: '', email3: '', nomer3: '', sks3: '',
        nrp4: '', nama4: '', email4: '', nomer4: '', sks4: '',
        pejabat: '', jabatan: '', institusi: '', alamat: '', nomertelp: '',
        rencanaperiode: '', tanggalmulai: '', tanggalselesai: '',
        catatan: '', haripengajuan: '', nama_pengaju: ''
      }
    };
  },
  methods: {
    getCurrentDateFormatted() {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = today.getFullYear();
      return `${day}/${month}/${year}`;
    },
    async handleSubmit() {
      this.formData.haripengajuan = this.getCurrentDateFormatted();

      try {
        const response = await axios.post('http://localhost:5000/api/dataKP', this.formData, {
          responseType: 'blob'
        });

        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Surat_Pengajuan_KP.docx');
        document.body.appendChild(link);
        link.click();

        link.remove();
        window.URL.revokeObjectURL(url);
        alert('Surat berhasil dibuat dan diunduh!');
      } catch (error) {
        console.error(error);
        alert('Gagal mengirim atau mengunduh surat.');
      }
    }
  }
};
</script>

<style scoped>
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

.form-label {
  margin-top: 0.5rem;
  font-weight: bold;
  color: #003366;
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
