<template>
  <div class="form-wrapper">
    <h2 class="form-title">Form Pengajuan Data Survei TA</h2>
    <form @submit.prevent="handleSubmit" class="form-body">
      <input v-model="formData.nrp1" type="text" placeholder="NRP" class="form-input" />
      <input v-model="formData.nama1" type="text" placeholder="Nama Mahasiswa" class="form-input" />
      <input v-model="formData.nama_pejabat" type="text" placeholder="Nama Pejabat Tujuan" class="form-input" />
      <input v-model="formData.nama_jabatan" type="text" placeholder="Jabatan Pejabat" class="form-input" />
      <input v-model="formData.nama_institusi" type="text" placeholder="Nama Institusi" class="form-input" />
      <input v-model="formData.alamat" type="text" placeholder="Alamat Institusi" class="form-input" />
      <input v-model="formData.tgl_mulai" type="date" placeholder="Tanggal Mulai Survei" class="form-input" />
      <input v-model="formData.tgl_selesai" type="date" placeholder="Tanggal Selesai Survei" class="form-input" />
      <input v-model="formData.kode" type="text" placeholder="Kode Mata Kuliah" class="form-input" />
      <input v-model="formData.nama_mk" type="text" placeholder="Nama Mata Kuliah" class="form-input" />
      <input v-model="formData.nama_dosen" type="text" placeholder="Nama Dosen Pembimbing" class="form-input" />
      <input v-model="formData.judul" type="text" placeholder="Judul TA / Topik" class="form-input" />
      <textarea v-model="formData.data_yang_diperlukan1" placeholder="Data yang Diperlukan" class="form-input"></textarea>
      <textarea v-model="formData.catatan" placeholder="Catatan Tambahan (opsional)" class="form-input"></textarea>
      <input v-model="formData.tanggal_pengajuan" type="date" class="form-input" />
      <input v-model="formData.nama_pengaju" type="text" placeholder="Nama Mahasiswa Pengaju" class="form-input" />

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
        nrp1: '',
        nama1: '',
        nama_pejabat: '',
        nama_jabatan: '',
        nama_institusi: '',
        alamat: '',
        tgl_mulai: '',
        tgl_selesai: '',
        kode: '',
        nama_mk: '',
        nama_dosen: '',
        judul: '',
        data_yang_diperlukan1: '',
        catatan: '',
        tanggal_pengajuan: '',
        nama_pengaju: ''
      }
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post('http://localhost:5000/api/dataTA', this.formData, {
          responseType: 'blob' // penting untuk file download
        });

        // Buat URL dari blob file yang diterima
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        const url = window.URL.createObjectURL(blob);

        // Buat elemen link untuk mendownload
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Surat_Pengantar_Data_TA.docx');
        document.body.appendChild(link);
        link.click();

        this.formData = {
          nrp1: '',
          nama1: '',
          nama_pejabat: '',
          nama_jabatan: '',
          nama_institusi: '',
          alamat: '',
          tgl_mulai: '',
          tgl_selesai: '',
          kode: '',
          nama_mk: '',
          nama_dosen: '',
          judul: '',
          data_yang_diperlukan1: '',
          catatan: '',
          tanggal_pengajuan: '',
          nama_pengaju: ''
        };

        // Cleanup
        window.URL.revokeObjectURL(url);
        link.remove();
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
/* Sama seperti sebelumnya */
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
