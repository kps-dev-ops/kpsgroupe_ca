<template>
    <section id="Carrières" class="job-section">
      <div class="container">
        <h2 class="section-title">Nos offres d'emploi</h2>
        <div class="job-list">
          <!-- <div v-for="(job, index) in publishedJobs" :key="index" class="job-card"> -->
            <div v-for="(job, index) in limitedJobs" :key="index" class="job-card">

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
                <span v-for="(skill, idx) in job.skills" :key="idx" class="skill-badge">
                  {{ skill }}
                </span>
              </div>
              <div class="job-footer">
                <span class="job-date">Publié le {{ job.date }}</span>
                <button class="apply-button" @click="showJobDetails(job)">Postuler</button>
              </div>
            </div>
          </div>
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

      <div class="see-more-container" v-if="publishedJobs.length > 2">
  <button class="see-more-button" @click="goToJobsPage">Voir plus d’offres</button>
</div>


    </section>
  </template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useBlogStore } from '@/stores/blog'
import JobApplicationForm from './JobApplicationForm.vue'
import { useRouter } from 'vue-router'
const router = useRouter()


const blog = useBlogStore()
const { jobPosts, loading } = storeToRefs(blog)

const showForm = ref(false)
const selectedPosition = ref('')

const showJobDetails = (jobPost) => {
  selectedPosition.value = jobPost.title
  showForm.value = true
}

const limitedJobs = computed(() => {
  return publishedJobs.value.slice(0, 4)
})

const publishedJobs = computed(() => {
  return jobPosts.value.filter(jobPost => jobPost.published === true)
})


const goToJobsPage = () => {
  router.push('/jobs')
}

onMounted(async () => {
  await blog.fetchJobsList()
  console.log(jobPosts.value)
  loading.value = false
})

</script>

  <style scoped>

.see-more-container {
  text-align: center;
  margin-top: 2rem;
}

.see-more-button {
  background-color: #45A79E;
  color: white;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;
}

.see-more-button:hover {
  background-color: #3b928b;
}

  .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-container {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  z-index: 1001;
}

  .job-section {
    padding: 60px 20px;
    background: #fff;
  }
  
  .container {
    max-width: 1100px;
    margin: 0 auto;
  }
  
  .section-title {
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    color: #5e5325;
    margin-bottom: 40px;
  }
  
  .job-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 24px;
  }
  
  .job-card {
    border: 1px solid #cfe2ff;
    border-radius: 10px;
    transition: box-shadow 0.3s ease;
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
  