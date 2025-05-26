<template>
  <div class="form-wrapper">
    <h2 class="form-title">Form Peminjaman Ruangan</h2>
    <form @submit.prevent="handleSubmit" class="form-body">
      <input v-model="formData.nomorSurat" type="text" placeholder="Nomor Surat HMIT (jika dari HMIT)" class="form-input" />
      <input v-model="formData.namaKegiatan" type="text" placeholder="Nama Kegiatan" class="form-input" />
      <input v-model="formData.hariTanggal" type="date" class="form-input" />
      <input v-model="formData.pukul" type="text" placeholder="Pukul" class="form-input" />
      <input v-model="formData.tempat" type="text" placeholder="Tempat" class="form-input" />
      <input v-model="formData.nrp" type="text" placeholder="NRP yang Mengajukan" class="form-input" />
      <input v-model="formData.namaPengaju" type="text" placeholder="Nama yang Mengajukan" class="form-input" />
      <input v-model="formData.nomorHp" type="text" placeholder="Nomor HP yang mengajukan" class="form-input" />

      <!-- 📎 Input file tambahan -->
      <label class="form-label">Upload File Surat HMIT</label>
      <input type="file" @change="handleFileUpload" class="form-input" accept=".pdf,.docx" />

      <button type="submit" class="submit-btn">Kirim</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        nomorSurat: '',
        namaKegiatan: '',
        hariTanggal: '',
        pukul: '',
        tempat: '',
        nrp: '',
        namaPengaju: '',
        nomorHp: ''
      },
      file: null
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    async handleSubmit() {
      try {
        const payload = new FormData();
        for (const key in this.formData) {
          payload.append(key, this.formData[key]);
        }

        if (this.file) {
          payload.append('file', this.file);
        }

        await axios.post('http://localhost:5000/api/peminjaman', payload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        // Reset form
        this.formData = {
          nomorSurat: '',
          namaKegiatan: '',
          hariTanggal: '',
          pukul: '',
          tempat: '',
          nrp: '',
          namaPengaju: '',
          nomorHp: ''
        };
        this.file = null;

        alert('Form berhasil dikirim!');
      } catch (error) {
        console.error(error);
        alert('Gagal mengirim form.');
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
  