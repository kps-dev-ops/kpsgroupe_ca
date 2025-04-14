<template>
  <section id="Dashboad" class="dashboard-wrapper">
    <div class="dashboard-container">
      <!-- Header -->
      <div class="dashboard-header" data-aos="fade-down">
        <h1 class="title">Tableau de bord</h1>
        <p class="subtitle">Suivez vos indicateurs en un coup d'œil</p>
      </div>

      <!-- Stat Cards -->
      <div class="grid-cards">
        <div class="card kpi" data-aos="fade-up" data-aos-delay="100">
          <div class="card-icon bg-blue"><font-awesome-icon icon="file-alt" /></div>
          <div class="card-content">
            <h2>{{ posts.length }}</h2>
            <p>Posts</p>
            <small>Contenus publiés</small>
          </div>
        </div>
        <!-- <div class="card kpi" data-aos="fade-up" data-aos-delay="200">
          <div class="card-icon bg-green"><font-awesome-icon icon="users" /></div>
          <div class="card-content">
            <h2>{{ authors.length }}</h2>
            <p>Auteurs</p>
            <small>Contributeurs enregistrés</small>
          </div>
        </div> -->
       
        <div class="card kpi" data-aos="fade-up" data-aos-delay="300">
          <div class="card-icon bg-yellow"><font-awesome-icon icon="clock" /></div>
          <div class="card-content">
            <h2>{{ lastPost?.title || 'Aucun' }}</h2>
            <p>Dernier post</p>
            <small>Dernier contenu publié</small>
          </div>
        </div>
      </div>

      <!-- Graph + Résumé
      <div class="graph-summary">
        <div class="chart-box" data-aos="zoom-in-right">
          <BarChart :data="chartData" :options="chartOptions" />
        </div>
        <div class="summary-box" data-aos="zoom-in-left">
          <h3><i class="fas fa-chart-pie"></i> Résumé rapide</h3>
          <ul>
            <li><i class="fas fa-file-alt"></i> <strong>Total posts :</strong> {{ posts.length }}</li>
            <li><i class="fas fa-user-friends"></i> <strong>Total auteurs :</strong> {{ authors.length }}</li>
            <li><i class="fas fa-clock"></i> <strong>Dernier post :</strong> {{ lastPost?.title || 'Aucun' }}</li>
          </ul>
        </div>
      </div> -->

      <div class="graph-summary">
  <div class="circle-box" data-aos="zoom-in-right">
    <div class="circle-content">
      <span class="circle-number">{{ posts.length }}</span>
      <span class="circle-label">Posts publiés</span>
    </div>
  </div>

  <div class="summary-box" data-aos="zoom-in-left">
    <h3><i class="fas fa-chart-pie"></i> Résumé rapide</h3>
    <ul>
      <li><i class="fas fa-file-alt"></i> <strong>Total posts :</strong> {{ posts.length }}</li>
      <li><i class="fas fa-clock"></i> <strong>Dernier post :</strong> {{ lastPost?.title || 'Aucun' }}</li>
    </ul>
  </div>
</div>


      <!-- Tableau -->
      <div class="table-box" data-aos="fade-up">
        <h3>Aperçu des posts</h3>
        <table>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Vue</th>
              <th>Date</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in posts.slice(0, 4)" :key="post.$id">
              <td>{{ post.title }}</td>
              <td>{{ post.views }}</td>
              <!-- <span class="views">
        👁️ {{ post.views || 0 }} vues
      </span> -->
              <td>{{ new Date(post.$createdAt).toLocaleDateString() }}</td>
                          <td>
              <span
                class="status"
                :class="post.published ? 'success' : 'draft'"
              >
                {{ post.published ? 'Publié' : 'Brouillon' }}
              </span>
            </td>

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

const posts = ref([])
const authors = ref([])
const lastPost = ref(null)

const chartData = ref({ labels: ['Posts', 'Auteurs'], datasets: [] })

watchEffect(() => {
  chartData.value = {
    labels: ['Posts', 'Auteurs'],
    datasets: [{
      label: 'Contenu',
      backgroundColor: ['#3B82F6', '#10B981'],
      borderRadius: 8,
      barThickness: 32,
      data: [posts.value.length, authors.value.length]
    }]
  }
})

onMounted(async () => {
  const p = await databases.listDocuments(databaseId, '67f3ebc80030da0f765e')
  const a = await databases.listDocuments(databaseId, '67f3ebd100297452daba')
  posts.value = p.documents
  authors.value = a.documents
  lastPost.value = p.documents.at(-1)
})

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { stepSize: 1 }
    }
  }
}
</script>

<style scoped>


.status.draft {
  background: #fef3c7;
  color: #92400e;
  padding: 0.2rem 0.6rem;
  font-size: 0.8rem;
  border-radius: 999px;
  display: inline-block;
}
.dashboard-wrapper {
  padding: 2rem;
  background: #f9fafb;
  font-family: 'Inter', sans-serif;
}
.dashboard-header {
  margin-bottom: 2rem;
  text-align: left;
}
.title {
  font-size: 2rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 1.5rem;
  margin-top: 6%;
  position: relative;
  display: inline-block;
}

.title::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 3px;
  bottom: -6px;
  left: 0;
  background-color: #2aa39a;
  transform: scaleX(1);
  transform-origin: left;
  transition: transform 0.3s ease-in-out;
}

.subtitle {
  font-size: 1rem;
  color: #6b7280;
}

.grid-cards {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: #d8e7e1;
  border: 1px solid #cbd5e0; /* bordure douce gris clair */
  border-radius: 16px;        /* coins arrondis */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08); /* ombre douce */
  padding: 2rem;              /* espace interne */
}


.card.kpi {
  background: white;
  display: flex;
  flex-direction: column; /* pour empiler icône + texte */
  align-items: center;     /* centrer horizontalement */
  justify-content: center; /* centrer verticalement */
  gap: 1.5rem;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease-in-out;
  width: 100%;
  max-width: 350px;
  flex: 1 1 300px;
}


.card.kpi:hover {
  transform: translateY(-6px);
  background-color: #eef3f7;
}

.card-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.6rem;
  flex-shrink: 0;
}

.bg-blue { background: #3B82F6; }
.bg-green { background: #10B981; }
.bg-yellow { background: #FBBF24; }

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  text-align: center;
}


.card-content h2 {
  font-size: 1.6rem;
  margin: 0;
  font-weight: bold;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card-content p {
  margin: 0;
  font-weight: 600;
  color: #1f2937;
}

.card-content small {
  font-size: 0.8rem;
  color: #6b7280;
}
/* 
.graph-summary {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;
} */

.graph-summary {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2rem;
}

.circle-box {
  background: white;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle-content {
  text-align: center;
}

.circle-number {
  font-size: 3rem;
  font-weight: bold;
  color: #3B82F6;
  display: block;
}

.circle-label {
  font-size: 1rem;
  color: #6b7280;
}



.chart-box {
  flex: 2;
  background: #ffffff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  min-height: 280px;
}
.summary-box {
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}
.summary-box:hover {
  transform: translateY(-4px);
}
.summary-box h3 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  margin-bottom: 1rem;
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
  margin-bottom: 0.75rem;
  color: #374151;
  font-size: 0.95rem;
}
.table-box {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
.table-box h3 {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}
thead {
  background: #f3f4f6;
}
th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}
.status.success {
  background: #dcfce7;
  color: #065f46;
  padding: 0.2rem 0.6rem;
  font-size: 0.8rem;
  border-radius: 999px;
  display: inline-block;
}
</style>
