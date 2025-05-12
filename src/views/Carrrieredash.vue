<template>
  <section id="Dashboard" class="dashboard-wrapper">
    <div class="dashboard-container">
      <!-- En-tête -->
      <div class="dashboard-header" data-aos="fade-down">
        <h1 class="title">Tableau de bord</h1>
        <p class="subtitle">Suivez vos indicateurs en un coup d'œil</p>
        <!-- <button class="btn" @click="showJobForm = true">➕ Poster une offre</button> -->
      </div>

      <!-- Résumé et Graph -->
      <div class="graph-summary">
        <div class="circle-box" data-aos="zoom-in-right">
          <div class="circle-content">
            <span class="circle-number">{{ posts.length }}</span>
            <span class="circle-label">Offres publiées</span>
          </div>
        </div>

        <div class="summary-box" data-aos="zoom-in-left">
          <h3><i class="fas fa-chart-pie"></i> Résumé rapide</h3>
          <ul>
            <li><i class="fas fa-file-alt"></i> <strong>Total offres :</strong> {{ posts.length }}</li>
            <li><i class="fas fa-clock"></i> <strong>Dernière offre :</strong> {{ lastPost?.title || 'Aucune' }}</li>
          </ul>
        </div>
      </div>

      <!-- Tableau des offres -->
      <div class="table-box" data-aos="fade-up">
        <div class="table-header">
          <h3>Aperçu des offres</h3>
          <button class="toggle-btn"  @click="showJobForm = true">
            {{ showForm ? 'Fermer' : '➕ Nouvelle offre' }}
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Lieu</th>
              <th>Date</th>
              <th>Contrat</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in paginatedPosts" :key="post.$id">
              <td>{{ post.title }}</td>
              <td>{{ post.location }}</td>
              <td>{{ new Date(post.date).toLocaleDateString() }}</td>
              <td>{{ post.contrat }}</td>
              <td>
              
                <span class="status" :class="!post.isPublished ? 'draft' : 'success'">
                  {{ !post.isPublished ? 'Brouillon' : 'Publié' }}
                </span>
              </td>
              <td>
                <button class="icon-btn edit" @click="editPost(post)">✏️</button>
                <button class="icon-btn delete" @click="deletePost(post.$id)">🗑</button>
              </td>
            </tr>
          </tbody>
        </table>

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
    </div>
  </section>

  <!-- Formulaire modal intégré depuis code 2 -->
  <!-- <JobFormModal :show="showJobForm" @close="showJobForm = false" /> -->
  <JobFormModal :show="showJobForm" @close="showJobForm = false" />
<p v-if="showJobForm">⚠️ MODALE ACTIVE ⚠️</p>


  <Footer />
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useBlogStore } from '../stores/blog'
import { useHeaderStore } from '../stores/headerStore'
import JobFormModal from './JobFormModal.vue'
import Footer from '../components/Footer.vue'

const headerStore = useHeaderStore()
const blog = useBlogStore()
const { posts, authors, lastPost } = storeToRefs(blog)
const router = useRouter()

const currentPage = ref(1)
const itemsPerPage = ref(5)
const showJobForm = ref(false)
const jobToEdit = ref(null)

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return posts.value.slice(start, start + itemsPerPage.value)
})

const totalPages = computed(() => {
  return Math.ceil(posts.value.length / itemsPerPage.value)
})

const deletePost = async (id) => {
  if (confirm('Supprimer ce post ?')) {
    await blog.deleteArticle(id)
  }
}

const previewPost = async (post) => {
  const url = `${window.location.origin}/blog/${post.slug}`
  window.open(url, '_blank')
}

const editPost = (post) => {
  jobToEdit.value = {
    $id: post.$id,
    title: post.title,
    contrat: post.contrat,
    type: post.type,
    location: post.location,
    date: post.date,
    description: post.description || '',
    fullDescription: post.fullDescription || '',
    skills: post.skills || [],
    responsibilities: post.responsibilities || [],
    requirements: post.requirements || [],
    isPublished: post.isPublished !== false
  }
  showJobForm.value = true
}

const refreshData = async () => {
  await blog.fetchArticlesList()
}

onMounted(() => {
  refreshData()
})
</script>

  
  <!-- <script setup>
  import { ref, onMounted, watchEffect, computed, watch } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useRouter } from 'vue-router'
  import { useBlogStore } from '../stores/blog'
  import { useHeaderStore } from '../stores/headerStore'
  import JobFormModal from './JobFormModal.vue'
  
  const headerStore = useHeaderStore()
  const blog = useBlogStore()
  import Footer from '../components/Footer.vue'
  const { posts, authors, lastPost} = storeToRefs(blog)
  const router = useRouter()
  
  const currentPage = ref(1)
  const itemsPerPage = ref(5)
  
  const showJobForm = ref(false)
  
  const paginatedPosts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    return posts.value.slice(start, start + itemsPerPage.value)
  })
  
  const totalPages = computed(() => {
    return Math.ceil(posts.value.length / itemsPerPage.value)
  })
  
  const showForm = ref(false)
  const editingId = ref(null)
  
  const form = ref({
    title: '',
    contrat: '',
    type: '',
    location: '',
    date: '',
    description: '',
    fullDescription: '',
    skills: [],
    responsibilities: [],
    requirements: [],
    isPublished: false
  })
  
  const categoryList = [
    'Data',
    'Développement',
    'Design',
    'Marketing',
    'Cybersécurité',
    'Cloud',
    'IA',
    'DevOps'
  ]
  
  const loadingFeatured = ref(null)
  
  
  const toggleFeatured = async (post) => {
    loadingFeatured.value = post.$id
    try {
      await blog.updateArticle2(post.$id, {
        featured: post.featured
      })
    } catch (error) {
      console.error('Erreur mise à la une :', error)
    } finally {
      loadingFeatured.value = null
    }
  }
  
  watch(showForm, (val) => {
    if (val) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
  })
  
  
  const generateSlug = () => {
    form.value.slug = form.value.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
  }
  
  const loading = ref(false)
  
  
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
  
  
  onMounted(() => {
      blog.fetchArticlesList()
      loading.value = false
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
  
  const deletePost = async (id) => {
    if (confirm('Supprimer ce post ?')) {
      await blog.deleteArticle(id)
    }
  }
  
  const previewPost = async (post) => {
    const url = `${window.location.origin}/blog/${post.slug}`;
    window.open(url, '_blank');
  }
  
  const editPost = (post) => {
    editingId.value = post.$id
    form.value = {
      $id: post.$id,
    title: post.title,
    contrat: post.contrat,
    type: post.type,
    location: post.location,
    date: post.date,
    description: post.description || '',
    fullDescription: post.fullDescription || '',
    skills: post.skills || [],
    responsibilities: post.responsibilities || [],
    requirements: post.requirements || [],
    isPublished: post.isPublished !== false

    }
    showForm.value = true
  }
  
  const resetForm = () => {
    editingId.value = null
    form.value = {
      title: '',
    contrat: '',
    type: '',
    location: '',
    date: '',
    description: '',
    fullDescription: '',
    skills: [],
    responsibilities: [],
    requirements: [],
    isPublished: false
    }
  }
  
  const validateForm = () => {
    if (!form.value.title || !form.value.content) {
      alert('Le titre et le contenu sont obligatoires')
      return false
    }
    return true
  }
  
  
  const handleSubmit = async () => {
    if (!validateForm()) return
  
    loading.value = true
  
    const payload = {
      ...form.value,
      subtitle: form.value.subtitle || '',
    }
  
    try {
      if (editingId.value) {
        console.log('Mise à jour du post', payload)
        await blog.updateArticle(editingId.value, payload)
      } else {
        await blog.createArticle(payload)
      }
    } catch (err) {
      console.error('Erreur de soumission du formulaire :', err)
    } finally {
      loading.value = false
      showForm.value = false
      resetForm()
    }
  }
  
  
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    
    if (!file || !file.type.startsWith('image/')) {
      alert("Veuillez télécharger une image valide.");
      return;
    }
  
    const reader = new FileReader();
    reader.onload = () => {
      form.value.image_url = reader.result;
    };
    reader.readAsDataURL(file);
  
    try {
      const imageUrl = await blog.uploadImage(file);
      form.value.image = imageUrl;
    } catch (err) {
      console.error("Erreur lors de l'upload de l'image :", err);
    }
  };
  
  
  
  const toggleForm = () => {
    showForm.value = !showForm.value
    if (showForm.value && !editingId.value) resetForm()
  }
  
  </script>
   -->
  <style scoped>
  
  .ellipsis {
    display: inline-block;
    max-width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: middle;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(6px);
    background-color: rgba(0, 0, 0, 0.25);
    z-index: 1000;
    display: flex;
    align-items: center;
    border-radius: 12px;
    justify-content: center;
  }
  
  .modal-card {
    background: white;
    padding: 2rem;
    max-width: 600px;
    width: 90%;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
  
  .modal-content {
    background: #fff;
    width: 90%;
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
    padding: 2rem;
    /* border-radius: 1rem; */
    border-radius: 12px;
    /* overflow: hidden;  */
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    position: relative;
    animation: fadeIn 0.3s ease-in-out;
  }
  
  @keyframes fadeIn {
    from {
      transform: scale(0.95);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
  
  
  .table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  
  .pagination-container.centered {
    justify-content: center;
    padding-right: 0;
  }
  
  .pagination-container {
    display: flex;
    justify-content: center; /* centrer horizontalement */
    column-gap: 10px;
    align-items: center;
    gap: 0.5rem;
    margin-top: 2.5rem;
    padding: 0; /* plus besoin de padding à droite */
  }
  
  .pagination-container button {
    height: 40px;
    width: 40px;
    background-color: #f5f6fa;
    color: #333;
    border: 1px solid #ccc;
    border-radius: 20px;
    padding: 8px 16px;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }
  
  .pagination-container button:hover:not(:disabled) {
    background-color: #45A79E;
    color: #fff;
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(0, 123, 255, 0.2);
  }
  
  .pagination-container button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .pagination-container button.active {
    background-color: #45A79E;
    color: white;
    border-color: white;
  }
  
  
  .card-with-thumb {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .thumb {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .card-with-thumb .text {
    flex: 1;
    overflow: hidden;
  }
  
  .card-with-thumb .text h2 {
    font-size: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
  
  
  .card-with-thumb {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .card-with-thumb .thumb {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .card-with-thumb .text {
    display: flex;
    flex-direction: column;
  }
  
  .title-with-img {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .title-with-img .thumb-mini {
    width: 32px;
    height: 32px;
    object-fit: cover;
    border-radius: 4px;
  }
  
  .title-cell {
    max-width: 240px;
  }
  
  .featured-badge {
    background-color: #facc15;
    color: #92400e;
    font-size: 0.75rem;
    font-weight: bold;
    padding: 0.3rem 0.8rem;
    border-radius: 999px;
    display: inline-block;
    margin-top: 0.5rem;
  }
  
  
  .status-badge {
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0.25rem 0.8rem;
    border-radius: 999px;
    display: inline-block;
    margin-top: 0.5rem;
    width: fit-content;
    text-align: center;
  }
  
  .status-badge.published {
    background-color: #d1fae5; 
    color: #065f46;
  }
  
  .status-badge.draft {
    background-color: #fee2e2; /* rouge clair */
    color: #991b1b; /* rouge foncé */
  }
  
  
  
  .input-group.checkbox {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .input-group.checkbox input[type='checkbox'] {
    transform: scale(1.2);
  }
  
  .post-page {
    padding: 2rem;
    background-color: #f3f6fa;
  }
  
  .title {
    font-size: 2rem;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 1.5rem;
    margin-top: 2%;
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
    background-color: #45A79E;
    transform: scaleX(1);
    transform-origin: left;
    transition: transform 0.3s ease-in-out;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .toggle-btn {
    padding: 0.6rem 1.2rem;
    background: linear-gradient(90deg,  var(--accent-color),  var(--accent-color));
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .posts-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  
  .post-card {
    background: linear-gradient(to bottom right, #ffffff, #f8fafc);
    border-left: 5px solid var(--accent-color);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    min-height: 250px;
    max-height: 350px;
  }
  
  .post-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
  }
  
  .post-card img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .card-content {
    padding: 1rem 1.25rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .card-content h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #1e293b;
    margin: 0 0 4px;
    line-height: 1.2;
  }
  
  .card-content p {
    font-size: 0.9rem;
    color: #6b7280;
    margin: 0;
  }
  
  
  .avatar-preview {
    margin-top: 0.75rem;
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 50%;
    border: 2px solid #45A79E;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
  }
  
  .avatar-preview:hover {
    transform: scale(1.05);
  }
  
  .form-box {
    margin-top: 2rem;
    background: linear-gradient(to bottom right, #ffffff, #f3f4f6);
    padding: 2rem;
    border-radius: 18px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
    animation: fadeInSlide 0.6s ease;
  }
  
  @keyframes fadeInSlide {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .input-group select {
    width: 100%;
    padding: 0.7rem 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    background-color: #fff;
    color: #333;
  }
  
  
  .input-group input,
  .input-group textarea,
  .input-group select {
    font-size: 1rem;
    padding: 0.75rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 12px;
    background-color: #f9fafb;
    transition: all 0.3s ease;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.04);
  }
  
  .input-group input:focus,
  .input-group textarea:focus,
  .input-group select:focus {
    outline: none;
    border-color: #45A79E;
    background-color: white;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.2);
  }
  
  .form-footer {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }
  
  .form-footer button {
    padding: 0.6rem 1.4rem;
    border-radius: 10px;
    border: none;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    background-color: #45A79E;
    color: white;
    transition: background 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .form-footer button:disabled {
    background-color: #cbd5e1;
    cursor: not-allowed;
  }
  
  .form-footer button:hover:not(:disabled) {
    background-color: #45A79E;
  }
  
  
  
  .post-page {
    padding: 2rem;
    max-width: 860px;
    margin: auto;
    background-color: #f9fafb;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  }
  
  .input-group {
    margin-bottom: 1.25rem;
    display: flex;
    flex-direction: column;
  }
  
  .input-group input[type="text"],
  .input-group input[type="file"] {
    font-size: 1rem;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    background-color: #f8f9fa;
    transition: all 0.3s ease;
  }
  
  .quill-editor {
    background-color: white;
    border-radius: 10px;
    border: 1px solid #d1d5db;
    padding: 1rem;
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .cover-preview {
    width: 100%;
    max-height: 250px;
    object-fit: cover;
    border-radius: 10px;
    margin-top: 1rem;
    border: 1px solid #cbd5e0;
  }
  
  .form-footer {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 1.5rem;
  }
  
  .btn {
    padding: 0.6rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn.cancel {
    background-color: #e5e7eb;
    color: #1f2937;
  }
  
  .btn.submit {
    background-color: #45A79E;
    color: white;
  }
  
  .btn.submit:hover {
    background-color: #72a09d;
  }
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
    background-color: #45A79E;
    transform: scaleX(1);
    transform-origin: left;
    transition: transform 0.3s ease-in-out;
  }
  .actions {
    display: flex;
    flex-direction: row;
    gap: 0;
  }
  
  .icon-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.1rem;
    padding: 0.3rem 0.4rem;
    border-radius: 0;
    transition: background-color 0.2s;
  }
  
  .icon-btn:first-child {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }
  
  .icon-btn:last-child {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  
  .icon-btn.edit {
    color: #3b82f6;
  }
  
  .icon-btn.delete {
    color: #ef4444;
  }
  
  .icon-btn.preview {
    color: #0d1012;
    font-size: 1.1rem;
  }
  
  .icon-btn:hover {
    background-color: #f3f4f6;
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
    background-color: #cbd5e0;
    border: 1px solid #cbd5e0; 
    border-radius: 16px;       
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08); 
    padding: 2rem;             
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
    background: #d6e7fd;
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
    background: #d6e7fd;
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
    overflow-x: auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
  .table-box h3 {
    margin-bottom: 1rem;
    font-size: 1.1rem;
    overflow-x: auto;
    white-space: nowrap;
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
  
  <style>
  body.modal-open {
    overflow: hidden;
    height: 100vh;
  }
  </style>