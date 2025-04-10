<template>
  <section id="Post" class="post-page" data-aos="fade-up">
    <div class="header">
      <h2 class="title">Articles</h2>
      <button class="toggle-btn" @click="toggleForm">
        {{ showForm ? 'Fermer' : '➕ Nouveau Post' }}
      </button>
    </div>

    <transition name="fade">
      <div v-if="!showForm" class="posts-list">
        <div class="post-card" v-for="post in blog.articles" :key="post.$id">
          <img :src="post.image_url || defaultImage" alt="cover" />
          <div class="card-content">
            <h3>{{ post.title }}</h3>
            <p>{{ post.subtitle }}</p>
            <div class="actions">
              <button class="icon-btn edit" @click="editPost(post)">
                <i class="fas fa-pen"></i>
              </button>
              <button class="icon-btn delete" @click="deletePost(post.$id)">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="slide-fade">
      <div v-if="showForm" class="form-box">
        <form @submit.prevent="handleSubmit">
          <div class="input-group">
            <input v-model="form.title" required placeholder="Titre" @input="generateSlug" />
          </div>
          <div class="input-group">
            <input v-model="form.subtitle" required placeholder="Sous-titre" />
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
            <label for="image-upload">Image de couverture</label>
            <input type="file" id="image-upload" @change="uploadImage" />
            <img v-if="form.image_url || defaultImage" :src="form.image_url || defaultImage" alt="Aperçu image" class="cover-preview" />
          </div>

          <div class="form-footer">
            <button type="button" class="btn cancel" @click="toggleForm">Annuler</button>
            <button type="submit" class="btn submit">
              {{ editingId ? 'Mettre à jour' : 'Publier' }}
            </button>
          </div>
        </form>
      </div>
    </transition>
  </section>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useBlogStore } from '../stores/blog'

AOS.init()

const showForm = ref(false)
const editingId = ref(null)
const defaultImage = 'https://via.placeholder.com/400x180.png?text=Aucune+image'

// Store
const blog = useBlogStore()

const form = ref({
  title: '',
  subtitle: '',
  slug: '',
  description: '',
  content: '',
  image: '' // correspond à image_url côté Appwrite
})

// ⚙️ Slug auto
const generateSlug = () => {
  form.value.slug = form.value.title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

// 🔄 Charger tous les articles
onMounted(() => {
  blog.fetchArticles()
})

// 🎯 Préparer un post pour édition
const editPost = (post) => {
  editingId.value = post.$id
  form.value = {
    title: post.title,
    subtitle: post.subtitle || '',
    slug: post.slug,
    description: post.description || '',
    content: post.content || '',
    image: post.image || defaultImage
  }
  showForm.value = true
}

// 🧼 Reset du formulaire
const resetForm = () => {
  editingId.value = null
  form.value = {
    title: '',
    subtitle: '',
    slug: '',
    description: '',
    content: '',
    image: ''
  }
}

// ✅ Ajouter ou modifier un post
const handleSubmit = async () => {
  const payload = {
    ...form.value,
    subtitle: form.value.subtitle || '',
  }

  if (editingId.value) {
    await blog.updateArticle(editingId.value, payload)
  } else {
    await blog.createArticle(payload)
  }

  showForm.value = false
  resetForm()
}

// ❌ Supprimer un post
const deletePost = async (id) => {
  if (confirm('Supprimer ce post ?')) {
    await blog.deleteArticle(id)
  }
}

// 🖼️ Uploader une image
const uploadImage = async (e) => {
  const file = e.target.files[0]
  if (!file || !file.type.startsWith('image/')) return

  // Transforme en Data URI pour le store
  const reader = new FileReader()
  reader.onload = async () => {
    form.value.image = reader.result
  }
  reader.readAsDataURL(file)
}

// 🧩 Toggle form
const toggleForm = () => {
  showForm.value = !showForm.value
  if (showForm.value && !editingId.value) resetForm()
}
</script>


<style scoped>


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


/* .post-card {
  background: white;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 6px 12px rgba(0,0,0,0.05);
  transition: transform 0.3s;
  display: flex;
  flex-direction: column;
}

.post-card:hover {
  transform: translateY(-5px);
}

.post-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.card-content {
  padding: 1rem;
}

.card-content h3 {
  font-size: 1.2rem;
  font-weight: bold;
  color: #1f2937;
  margin: 0;
}

.card-content p {
  color: #6b7280;
  font-size: 0.95rem;
  margin-top: 0.25rem;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.icon-btn {
  background: #f3f4f6;
  border: none;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.icon-btn.edit:hover {
  background-color: #dbeafe;
  color: #2563eb;
}

.icon-btn.delete:hover {
  background-color: #fee2e2;
  color: #dc2626;
} */
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

.input-group {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
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
</style >