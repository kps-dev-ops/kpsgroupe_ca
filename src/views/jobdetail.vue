<template>
    <Headers />
  
    <section class="job-hero">
      <div class="overlay"></div>
      <div class="container">
        <h1>{{ job?.title || 'Titre non disponible' }}</h1>
        <p>{{ job?.description || 'Description non disponible' }}</p>
      </div>
    </section>
  
    <section class="job-details container" v-if="job">
      <div class="job-meta">
        <p><strong>Contrat :</strong> {{ job.contrat }}</p>
        <p><strong>Mode de travail :</strong> {{ job.type }}</p>
        <p><strong>Lieu :</strong> {{ job.location }}</p>
        <p><strong>Date de début :</strong> {{ formatDate(job.date) }}</p>
        <p><strong>Publié :</strong> {{ job.published ? 'Oui' : 'Non' }}</p>
      </div>
  
      <div class="job-full-description">
        <h2>Description complète</h2>
        <p>{{ job.fullDescription }}</p>
      </div>
  
      <div class="job-lists">
        <div v-if="job.skills && job.skills.length">
          <h3>Compétences requises</h3>
          <ul>
            <li v-for="(skill, i) in job.skills" :key="i">{{ skill }}</li>
          </ul>
        </div>
  
        <div v-if="job.requirements && job.requirements.length">
          <h3>Prérequis</h3>
          <ul>
            <li v-for="(item, i) in job.requirements" :key="i">{{ item }}</li>
          </ul>
        </div>
  
        <div v-if="job.responsibilities && job.responsibilities.length">
          <h3>Responsabilités</h3>
          <ul>
            <li v-for="(resp, i) in job.responsibilities" :key="i">{{ resp }}</li>
          </ul>
        </div>
      </div>
    </section>
    <div v-else class="container">
      <p>Chargement des détails du poste...</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { useBlogStore } from '@/stores/blog'
  import Headers from '../components/Headers.vue'
  
  const blog = useBlogStore()
  const route = useRoute()
  const job = ref(null)
  
  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString()
  
  onMounted(async () => {
    await blog.fetchJobsList()
    const found = blog.jobPosts.find(j => j.$id === route.params.id)
    job.value = found || null
  })
  </script>
  
  <style scoped>
  .job-hero {
    position: relative;
    background: url('/src/assets/img/jobs.jpg') center/cover no-repeat;
    color: white;
    text-align: center;
    padding-top: 250px;
    padding-bottom: 3rem;
    border-radius: 0 0 40px 40px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  .job-hero .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 0;
  }
  .job-hero .container {
    position: relative;
    z-index: 1;
    color: #fff;
  }
  
  .container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  
  .job-details p {
    margin-bottom: 0.8rem;
    font-size: 1rem;
  }
  
  .job-full-description {
    margin-top: 2rem;
  }
  
  .job-full-description h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .job-lists {
    margin-top: 2rem;
  }
  
  .job-lists h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  
  .job-lists ul {
    padding-left: 1.2rem;
  }
  
  .job-lists li {
    margin-bottom: 0.5rem;
  }
  </style>
  