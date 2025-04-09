<template>
  <section id="dashboard" class="dashboard-wrapper">
    <div class="dashboard-container">
      <!-- Titre -->
      <h1 class="title">Tableau de bord</h1>

      <!-- Cartes KPI -->
      <div class="grid-cards">
        <div class="card kpi blue">
          <h2>{{ posts.length }}</h2>
          <p>Posts</p>
          <small>Contenus publiés</small>
        </div>
        <div class="card kpi green">
          <h2>{{ authors.length }}</h2>
          <p>Auteurs</p>
          <small>Contributeurs enregistrés</small>
        </div>
        <div class="card kpi yellow">
          <h2>{{ lastPost?.title || 'Aucun' }}</h2>
          <p>Dernier post</p>
          <small>Dernier contenu publié</small>
        </div>
      </div>

      <!-- Graphiques et résumé -->
      <div class="graph-summary">
        <div class="chart-box">
          <BarChart :data="chartData" :options="chartOptions" />
        </div>

        <!-- <div class="summary-box">
          <h3>Résumé rapide</h3>
          <ul>
            <li><strong>Total posts :</strong> {{ posts.length }}</li>
            <li><strong>Total auteurs :</strong> {{ authors.length }}</li>
            <li><strong>Dernier post :</strong> {{ lastPost?.title || 'Aucun' }}</li>
          </ul>
        </div> -->
        <div class="summary-box">
  <h3>📊 Résumé rapide</h3>
  <ul>
    <li>
      <i class="fas fa-file-alt"></i>
      <strong>Total posts :</strong> {{ posts.length }}
    </li>
    <li>
      <i class="fas fa-user-friends"></i>
      <strong>Total auteurs :</strong> {{ authors.length }}
    </li>
    <li>
      <i class="fas fa-clock"></i>
      <strong>Dernier post :</strong> {{ lastPost?.title || 'Aucun' }}
    </li>
  </ul>
</div>

      </div>

      <!-- Tableau des posts -->
      <div class="table-box">
        <h3>Aperçu des posts</h3>
        <table>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Auteur</th>
              <th>Date</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in posts.slice(0, 5)" :key="post.$id">
              <td>{{ post.title }}</td>
              <td>{{ post.author_name }}</td>
              <td>{{ new Date(post.$createdAt).toLocaleDateString() }}</td>
              <td><span class="status success">Publié</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { Client, Databases } from 'appwrite'
import BarChart from './BarChart .vue'

const client = new Client()
client.setEndpoint('https://appwrite.ubbfy.com/v1').setProject('67f3ad4f00234f8ab06c')
const databaseId = '67f3de5700068b483ca7'
const databases = new Databases(client)

const postsCollection = '67f3ebc80030da0f765e'
const authorsCollection = '67f3ebd100297452daba'

const posts = ref([])
const authors = ref([])
const lastPost = ref(null)

// Chart data (réactif)
const chartData = ref({
  labels: ['Posts', 'Auteurs'],
  datasets: []
})

// Mise à jour automatique du graphe quand les données changent
watchEffect(() => {
  chartData.value = {
    labels: ['Posts', 'Auteurs'],
    datasets: [
      {
        label: 'Contenu',
        backgroundColor: ['#6C63FF', '#00C897'],
        borderRadius: 10,
        barThickness: 40,
        data: [posts.value.length, authors.value.length]
      }
    ]
  }
})

// Données à la montée du composant
onMounted(async () => {
  const p = await databases.listDocuments(databaseId, postsCollection)
  const a = await databases.listDocuments(databaseId, authorsCollection)

  posts.value = p.documents
  authors.value = a.documents
  lastPost.value = p.documents.at(-1)
})

// Options du graphique
const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: true, text: 'Résumé du contenu' }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1
      }
    }
  }
}
</script>


<style scoped>
.dashboard-wrapper {
  padding: 1rem 2rem;
  font-family: 'Inter', sans-serif;
}

.title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.card.kpi {
  padding: 1.2rem;
  border-radius: 12px;
  color: white;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.card.kpi h2 {
  font-size: 2rem;
  margin-bottom: 0.4rem;
}

.card.kpi p {
  font-size: 1rem;
  font-weight: 500;
}

.card.kpi small {
  font-size: 0.8rem;
  opacity: 0.85;
}

.card.kpi.blue { background-color: #3B82F6; }
.card.kpi.green { background-color: #10B981; }
.card.kpi.yellow { background-color: #FBBF24; }
.card.kpi.red { background-color: #EF4444; }

.graph-summary {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;
}

.chart-box {
  flex: 2;
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}
/* 
.summary-box {
  flex: 1;
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.summary-box h3 {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.summary-box ul {
  list-style: none;
  padding: 0;
}

.summary-box ul li {
  margin-bottom: 0.6rem;
  color: #333;
  font-size: 0.95rem;
} */

.summary-box {
  flex: 1;
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.07);
  transition: transform 0.3s ease;
}

.summary-box:hover {
  transform: translateY(-4px);
}

.summary-box h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.summary-box ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.summary-box li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: #444;
  margin-bottom: 0.75rem;
}

.summary-box i {
  color: #00b894;
  font-size: 1rem;
  width: 20px;
  text-align: center;
}


.table-box {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
}

.table-box h3 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

table thead {
  background: #f3f4f6;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.status {
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 600;
  display: inline-block;
}

.status.success {
  background-color: #d1fae5;
  color: #065f46;
}
</style>
