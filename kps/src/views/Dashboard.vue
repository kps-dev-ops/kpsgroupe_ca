<template>
  <section id="Dashboad" class="dashboard-wrapper">
    <div class="dashboard-container">
      <!-- Header -->
      <div class="dashboard-header" data-aos="fade-down">
        <h1 class="title">Tableau de bord</h1>
        <p class="subtitle">Suivez vos indicateurs en un coup d'œil</p>
      </div>
     
      <div class="grid-cards">
        <div class="card kpi" data-aos="fade-up" data-aos-delay="100">
          <div class="card-icon bg-blue"><font-awesome-icon icon="file-alt" /></div>
          <div class="card-content">
            <h2>{{ posts.length }}</h2>
            <p>Posts</p>
            <small>Contenus publiés</small>
          </div>
        </div>
  
        <div class="card kpi" data-aos="fade-up" data-aos-delay="300">
          <div class="card-icon bg-yellow"><font-awesome-icon icon="clock" /></div>
         <div class="card-content card-with-thumb">
  <img v-if="lastPost?.image_url" :src="lastPost.image_url" alt="cover" class="thumb" />
  <div class="text">
    <h2>{{ lastPost?.title || 'Aucun' }}</h2>
    <p>Dernier post</p>
    <small>Dernier contenu publié</small>
  </div>
</div>
        </div>
      </div>

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
    <!-- Tableau des posts -->
<div class="table-box" data-aos="fade-up">
  <h3>Aperçu des posts</h3>
  <table>
    <thead>
      <tr>
        <th>Titre & Image</th>
        <th>Vue</th>
        <th>Date</th>
        <th>Statut</th>
        <th>À la une</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="post in posts.slice(0, 4)" :key="post.$id">
        <td class="title-cell">
  <div class="title-with-img">
    <img v-if="post.image_url" :src="post.image_url" alt="miniature" class="thumb-mini" />
    <span>{{ post.title }}</span>
  </div>
</td>

        <td>{{ post.views }}</td>
        <td>{{ new Date(post.$createdAt).toLocaleDateString() }}</td>
        <td>
          <span class="status" :class="post.published ? 'success' : 'draft'">
            {{ post.published ? 'Publié' : 'Brouillon' }}
          </span>
        </td>
        <td>
          <input
  type="checkbox"
  :disabled="loadingFeatured === post.$id"
  v-model="post.featured"
  @change="toggleFeatured(post)"
/>

        </td>
        <td>
          <div class="actions">
            <button class="icon-btn edit" @click="editPost(post)" title="Modifier l'article">
  <font-awesome-icon icon="pen" />
</button>
            <button class="icon-btn delete" @click="deletePost(post.$id)">
              <font-awesome-icon icon="trash" />
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
<section id="Post" class="post-page" data-aos="fade-up">
    <div class="header">
      <h2 class="title">Articles</h2>
      <button class="toggle-btn" @click="toggleForm">
        {{ showForm ? 'Fermer' : '➕ Nouveau Post' }}
      </button>
    </div>
  </section>

<transition name="slide-fade">
      <div v-if="showForm" class="form-box">
        <form @submit.prevent="handleSubmit">
          <div class="input-group">
            <input v-model="form.title" required placeholder="Titre" @input="generateSlug" />
          </div>
          <div class="input-group">
            <select v-model="form.subtitle" required>
              <option disabled value="">Choisir une catégorie</option>
              <option v-for="cat in categoryList" :key="cat" :value="cat">
                {{ cat }}
              </option>
            </select>
          </div>

          <div class="input-group">
            <input v-model="form.slug" required placeholder="Slug (auto-généré)" disabled />
          </div>

          <div class="input-group">
            <label>Résumé de l'article</label>
            <quill-editor v-model:content="form.description" contentType="html" theme="snow" class="quill-editor" toolbar="full" />
          </div>

          <div class="input-group">
            <label>Contenu HTML ou Markdown</label>
            <quill-editor v-model:content="form.content" contentType="html" theme="snow" class="quill-editor" toolbar="full" />
          </div>
          <div class="input-group">
              <label>Image de couverture</label>
              <input type="file" @change="uploadImage" />
              <img v-if="form.image_url" :src="form.image_url" alt="Aperçu image" class="cover-preview" />
              <div v-if="loading" class="loading-indicator">
                <span>Chargement en cours...</span>
              </div>
            </div>
            <div class="input-group">
          <label>Status de l'article</label>
          <select v-model="form.published">
            <option :value="true">Publié</option>
            <option :value="false">Brouillon</option>
          </select>
        </div>

          <div class="form-footer">
            <button type="button" class="btn cancel" @click="toggleForm">Annuler</button>
            <button type="submit" class="btn submit">
              {{ editingId ? 'Mettre à jour' : 'Publier' }}
            </button>
          </div>

          <div class="input-group checkbox">
            <input type="checkbox" v-model="form.featured" id="featured">
            <label for="featured">Mettre à la une</label>
          </div>

        </form>
      </div>
    </transition>

    </div>
  </section>
  <Footer/>

</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { Client, Databases } from 'appwrite'
import BarChart from './BarChart .vue'
import { useBlogStore } from '../stores/blog'
const blog = useBlogStore()
import Footer from '../components/Footer.vue'
const { posts, authors, lastPost} = storeToRefs(blog)


const showForm = ref(false)
const editingId = ref(null)
const defaultImage = 'https://appwrite.ubbfy.com/v1/storage/buckets/67f3ad7b0017d490c545/files/new_cover/view?project=67f3ad4f00234f8ab06c&project=67f3ad4f00234f8ab06c&mode=admin'

// const blog = useBlogStore()

const form = ref({
  title: '',
  subtitle: '',
  slug: '',
  description: '',
  content: '',
  image: '',
  published: true,
  featured: false
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
    await blog.updateArticle(post.$id, {
      featured: post.featured
    })
  } catch (error) {
    console.error('Erreur mise à la une :', error)
  } finally {
    loadingFeatured.value = null
  }
}


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

const editPost = (post) => {
  editingId.value = post.$id
  form.value = {
    title: post.title,
    subtitle: post.subtitle || '',
    slug: post.slug,
    description: post.description || '',
    content: post.content || '',
    image: post.image || defaultImage,
    published: post.published !== false,
    featured: post.featured || false
  }
  showForm.value = true
}

const resetForm = () => {
  editingId.value = null
  form.value = {
    title: '',
    subtitle: '',
    slug: '',
    description: '',
    content: '',
    published: true,
    image: '',
    featured: false
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

<style scoped>

scoped>


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
  background-color: #2aa39a;
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

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.icon-btn {
  border: none;
  border-radius: 8px;
  padding: 0.4rem 0.6rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.icon-btn.edit {
  background-color: #e0e7ff;
  color: var(--accent-color);
}

.icon-btn.edit:hover {
  background-color: #c7d2fe;
}

.icon-btn.delete {
  background-color: #fee2e2;
  color: #b91c1c;
}

.icon-btn.delete:hover {
  background-color: #fecaca;
}


.avatar-preview {
  margin-top: 0.75rem;
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #2aa39a;
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
  border-color: #2aa39a;
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
  background-color: #2aa39a;
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
  background-color: #2aa39a;
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
  background-color: #2aa39a;
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
  background-color: #2aa39a;
  transform: scaleX(1);
  transform-origin: left;
  transition: transform 0.3s ease-in-out;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 0.3rem;
  border-radius: 6px;
  transition: background-color 0.2s;
}
.icon-btn.edit {
  color: #3b82f6;
}
.icon-btn.delete {
  color: #ef4444;
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
