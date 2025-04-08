<template>
<section id="dashboard">
    <div class="dashboard">
      <h1>Tableau de bord</h1>
  
      <div class="stats">
        <div class="card">
          <span class="icon">📄</span>
          <!-- <font-awesome-icon icon="file-alt" class="icon" /> -->
          <h2>{{ posts.length }} Posts</h2>
        </div>
        <div class="card">
          <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 448 512" fill="white">
          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm89.6 32h-11.7c-22.2 10.3-46.8 16-72.9 16s-50.6-5.7-72.9-16h-11.7C65.1 288 0 353.1 0 432v16c0 17.7 14.3 32 32 32h384c17.7 0 32-14.3 32-32v-16c0-78.9-65.1-144-144.4-144z"/>
        </svg>
        </span>
          <h2>{{ authors.length }} Auteurs</h2>
        </div>
      </div>
  
      <div class="chart-section">
        <BarChart :data="chartData" :options="chartOptions" />
      </div>
    </div>
</section>
    </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { Client, Databases, Query } from 'appwrite'
  import BarChart from './BarChart .vue' 
  
  const client = new Client()
  client.setEndpoint('https://[TON_ENDPOINT]').setProject('[TON_PROJECT_ID]')
  const databaseId = '[TON_DATABASE_ID]'
  
  const databases = new Databases(client)
  const postsCollection = 'posts'
  const authorsCollection = 'authors'
  
  const posts = ref([])
  const authors = ref([])
  
  onMounted(async () => {
    const p = await databases.listDocuments(databaseId, postsCollection)
    const a = await databases.listDocuments(databaseId, authorsCollection)
    posts.value = p.documents
    authors.value = a.documents
  })
  
  // Données du graphe
  const chartData = {
    labels: ['Posts', 'Auteurs'],
    datasets: [
      {
        label: 'Contenu',
        backgroundColor: ['#45A79E', '#CFE2FF'],
        data: [posts.value.length, authors.value.length]
      }
    ]
  }
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Résumé du contenu' }
    }
  }
  </script>
  
  <style scoped>
  .icon{
    color: white;
  }
  .dashboard {
    padding: 2rem;
  }
  
  .stats {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
  }
  
  .card {
    flex: 1;
    background: #416e69;
    padding: 1rem;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
  
  .card .icon {
    font-size: 2rem;
  }
  
  .chart-section {
    background: var(--surface-color);
    padding: 1rem;
    border-radius: 10px;
  }
  </style>
  