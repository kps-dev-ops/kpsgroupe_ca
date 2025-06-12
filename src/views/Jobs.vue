<template>
    <Headers />
    <section class="job-hero">
      <div class="overlay"></div>
      <div class="container">
        <h1>Offres d'emploi</h1>
        <p>Découvrez les opportunités proposées par notre entreprise.</p>
      </div>
    </section>
  
    <div class="search-filter">
      <input v-model="searchQuery" type="text" placeholder="Rechercher un poste..." />
    </div>
  
    <section class="all-jobs">
      <div class="container">
        <div class="grid-with-sidebar">
          <div class="grid">
            <div
              v-for="job in paginatedJobs"
              :key="job.$id"
              class="job-card"  @click="viewMore(job)"
            >

            
              <div class="job-content">
                <div class="job-header">
                  <h3 class="job-title">{{ job.title }}</h3>
                  <span :class="job.contrat === 'CDI' ? 'job-type-cdi' : 'job-type-cdd'" class="job-type">
                    {{ job.contrat }}
                  </span>
                </div>
                <div class="job-location">
                  <i class="fas fa-map-marker-alt"></i>
                  <span>{{ job.location }}</span>
                </div>
                <p class="job-description">{{ job.description }}</p>
                <p class="job-description">Mode de travail : {{ job.type }}</p>
                <div class="job-skills">
                  <span class="skill-badge" v-for="(skill, i) in job.skills" :key="i">{{ skill }}</span>
                </div>
                <div class="job-footer">
                  <span class="job-date">Publié le {{ formatDate(job.date) }}</span>
                  <button class="apply-button" @click="showJobDetails(job)">Postuler</button>
                </div>
              </div>
            </div>



            <div v-if="paginatedJobs.length === 0" class="no-results">
              <p>Aucune offre ne correspond à votre recherche.</p>
            </div>
          </div>
  
          <aside class="sidebar">
            <h3>Offres récentes</h3>
            <div
              class="recent-article"
              v-for="job in recentJobs"
              :key="job.$id"
              @click="viewMore(job)"
            >
              <div class="info">
                <p class="title">{{ job.title }}</p>
              </div>
            </div>
          </aside>
        </div>
  
        <div class="pagination-container centered">
          <button @click="currentPage--" :disabled="currentPage === 1">←</button>
          <button
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            :class="{ active: currentPage === page }"
          >
            {{ page }}
          </button>
          <button @click="currentPage++" :disabled="currentPage === totalPages">→</button>
        </div>
      </div>
      
      <div v-if="showForm" class="modal-overlay">
        <div class="modal-container">
            <JobApplicationForm
            :position="selectedPosition"
            @close="showForm = false"
            />
        </div>
      </div>


    </section>
  </template>
  
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useBlogStore } from '@/stores/blog'
  import { useRouter } from 'vue-router'
  import Headers from '../components/Headers.vue'
  import JobApplicationForm from './JobApplicationForm.vue'

  
  const blog = useBlogStore()
  const router = useRouter()
  
  const searchQuery = ref('')
  const itemsPerPage = 5
  const currentPage = ref(1)
  const totalCount = ref(0)

//   const { jobPosts, loading } = storeToRefs(blog)

const showForm = ref(false)
const selectedPosition = ref('')

const showJobDetails = (jobPost) => {
  selectedPosition.value = jobPost.title
  showForm.value = true
}

const viewMore = (jobPost) => {
//   blogStore.incrementViews()
  router.push({ name: 'jobdetail', params: { slug: jobPost.slug } })
}

  
  const jobPosts = computed(() => blog.jobPosts.filter(job => job.published))
  
  const paginatedJobs = computed(() => {
    const filtered = jobPosts.value.filter(
      job => job.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    totalCount.value = filtered.length
    return filtered.slice((currentPage.value - 1) * itemsPerPage, currentPage.value * itemsPerPage)
  })
  
  const totalPages = computed(() => Math.ceil(totalCount.value / itemsPerPage))
  
  const recentJobs = computed(() =>
    jobPosts.value
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3)
  )
  
  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString()
  
//   const showJobDetails = (job) => {
//     router.push(`/jobs/${job.$id}`)
//   }
  
  onMounted(() => {
    blog.fetchJobsList()
  })
  </script>
 

<style scoped>

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-container {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.job-hero {
  position: relative;
  background: url('/src/assets/img/jobs.jpg') center/cover no-repeat;
  color: white;
  text-align: center;
  padding-top: 300px;
  padding-bottom: 3rem;
  border-radius: 0 0 40px 40px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.job-hero .overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 0;
}

.job-hero .container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
  z-index: 1;
  padding: 2rem;
}

.search-filter {
  background-color: white;
  padding: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  border-bottom: 1px solid #eee;
}

.search-filter input {
  min-width: 300px;
  max-width: 600px;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  border: none;
  background-color: #f1f5f9;
  font-size: 1rem;
}

.all-jobs {
  padding: 2rem 1rem;
  background-color: #f9f9f9;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.grid-with-sidebar {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 2rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 2rem;
}

.sidebar {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

.sidebar h3 {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #45A79E;
  padding-bottom: 0.5rem;
}

.recent-article {
  margin-bottom: 1rem;
  cursor: pointer;
  padding: 0.5rem 0;
}

.recent-article .title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #1f2937;
}

.pagination-container.centered {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.pagination-container button {
  height: 40px;
  width: 40px;
  background-color: #f5f6fa;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.pagination-container button.active,
.pagination-container button:hover:not(:disabled) {
  background-color: #45A79E;
  color: #fff;
}

.pagination-container button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.job-card {
  border: 1px solid #cfe2ff;
  border-radius: 10px;
  transition: box-shadow 0.3s ease;
  background: #fff;
}

.job-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.job-content {
  padding: 24px;
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 12px;
}

.job-title {
  font-size: 20px;
  font-weight: bold;
  color: #45a79e;
}

.job-type {
  font-size: 14px;
  padding: 4px 10px;
  border-radius: 15px;
}

.job-type-cdi {
  background: #cfe2ff;
  color: #5e5325;
}

.job-type-cdd {
  background: #fdf3e6;
  color: #5e5325;
}

.job-location {
  font-size: 14px;
  color: #333;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.job-description {
  color: #444;
  font-size: 15px;
  margin-bottom: 16px;
}

.job-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.skill-badge {
  background: #cfe2ff;
  color: #5e5325;
  padding: 6px 10px;
  font-size: 13px;
  border-radius: 20px;
}

.job-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.job-date {
  font-size: 13px;
  color: #666;
}

.apply-button {
  background-color: #45a79e;
  color: #fff;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s ease;
}

.apply-button:hover {
  background-color: #3a8f87;
}
</style>
