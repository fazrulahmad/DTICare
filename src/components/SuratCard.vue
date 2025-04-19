<template>
    <div class="surat-card">
      <img :src="require(`@/assets/${image}`)" :alt="title" class="card-image" />
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "SuratCard",
    props: {
      title: String,
      description: String,
      image: String
    }
  };
  </script>
  
  <style scoped>
  .surat-card {
    width: 180px;
    height: 270px;
    background-color: white;
    border-radius: 1rem;
    padding: 1.5rem 1rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    transition: transform 0.3s ease;
  }
  .surat-card:hover {
    transform: translateY(-5px);
  }

  .card-image {
  width: 60%;
  height: 150px;
  object-fit: fill;
  border-radius: 1rem;
  margin-bottom: 1rem;
}

  h3 {
    margin-bottom: 0.5rem;
    color: #003366;
  }
  p {
    font-size: 0.95rem;
    color: #333;
  }
  </style>
  