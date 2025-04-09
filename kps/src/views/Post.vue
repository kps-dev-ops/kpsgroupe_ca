<template>
  <section class="post-page">
    <div class="header">
      <h2>Articles</h2>
      <button class="toggle-btn" @click="toggleForm">
        {{ step > 0 ? 'Fermer' : '➕ Nouveau Post' }}
      </button>
    </div>

    <!-- Liste des posts -->
    <transition name="fade">
      <div v-if="step === 0" class="posts-list">
        <div class="post-card" v-for="post in posts" :key="post.$id">
          <img :src="post.image_url" alt="cover" />
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

    <!-- Formulaire de création -->
    <transition name="slide-fade">
      <div v-if="step > 0" class="form-box">
        <form @submit.prevent="handleSubmit">
          <div v-show="step === 1">
            <div class="input-group" v-for="field in ['title', 'subtitle', 'slug']" :key="field">
              <input v-model="form[field]" required :placeholder="labels[field]" />
            </div>
            <div class="input-group">
              <textarea v-model="form.description" rows="2" placeholder="Résumé de l'article" />
            </div>
            <div class="input-group">
              <input type="file" @change="uploadImage" />
            </div>
          </div>

          <div v-show="step === 2">
            <div class="input-group">
              <textarea v-model="form.content" rows="4" placeholder="Contenu HTML ou Markdown" />
            </div>
            <div class="input-group">
              <input v-model="form.categories" placeholder="Catégories (virgule)" />
            </div>
            <div class="input-group">
              <input v-model="form.author.name" placeholder="Nom auteur" required />
            </div>
            <div class="input-group">
              <input v-model="form.author.email" placeholder="Email de l’auteur" required />
            </div>
            <div class="input-group">
              <input v-model="form.author.bio" placeholder="Bio de l’auteur" />
            </div>
           
              <div class="input-group">
            <label for="avatar-upload">Avatar de l’auteur</label>
            <input type="file" id="avatar-upload" accept="image/*" @change="uploadAvatar" />
            <img v-if="form.author.avatar_url" :src="form.author.avatar_url" alt="Aperçu avatar" class="avatar-preview" />
          </div>

           
          </div>

          <div class="form-footer">
            <button type="button" @click="step--" :disabled="step === 1">⬅</button>
            <button type="button" @click="step === 2 ? handleSubmit() : step++">
              {{ step === 2 ? (editingId ? 'Mettre à jour' : 'Publier') : 'Suivant ➡' }}
            </button>
          </div>
        </form>
      </div>
    </transition>
  </section>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { Client, Databases, ID, Storage } from 'appwrite'

const client = new Client()
client.setEndpoint('https://appwrite.ubbfy.com/v1').setProject('67f3ad4f00234f8ab06c')
const db = new Databases(client)
const storage = new Storage(client)
const databaseId = '67f3de5700068b483ca7'
const collectionId = '67f3ebc80030da0f765e'
const authorsCollectionId = '67f3ebd100297452daba'
const bucketId = '67f3ad7b0017d490c545'

const posts = ref([])
const editingId = ref(null)
const step = ref(0)

const form = ref({
  title: '', subtitle: '', slug: '', description: '',
  content: '', image_url: '', categories: '',
  author: { name: '', email: '', bio: '', avatar_url: '', created_at: '' }
})

const labels = {
  title: 'Titre',
  subtitle: 'Sous-titre',
  slug: 'Slug (mon-article)'
}

const uploadAvatar = async (e) => {
  const file = e.target.files[0]
  if (!file) return

  const uploaded = await storage.createFile(bucketId, ID.unique(), file)
  form.value.author.avatar_url = `https://appwrite.ubbfy.com/v1/storage/buckets/${bucketId}/files/${uploaded.$id}/view?project=67f3ad4f00234f8ab06c&mode=admin`
}


onMounted(() => {
  loadPosts()
})

const toggleForm = () => {
  step.value = step.value > 0 ? 0 : 1
  if (step.value === 1) resetForm()
}

const loadPosts = async () => {
  const res = await db.listDocuments(databaseId, collectionId)
  posts.value = res.documents
}

const handleSubmit = async () => {
  const authorData = {
    name: form.value.author.name,
    email: form.value.author.email,
    bio: form.value.author.bio || '',
    avatar_url: form.value.author.avatar_url,
    created_at: form.value.author.created_at || new Date().toISOString()
  }

  const authorRes = await db.createDocument(databaseId, authorsCollectionId, ID.unique(), authorData)
  const postsId = `post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  const payload = {
    ...form.value,
    categories: form.value.categories.split(',').map(x => x.trim()),
    authors: authorRes.$id,
    posts_id: postsId,
    published: true,
    updated_at: new Date().toISOString()
  }

  delete payload.author

  if (editingId.value) {
    await db.updateDocument(databaseId, collectionId, editingId.value, payload)
  } else {
    payload.created_at = new Date().toISOString()
    await db.createDocument(databaseId, collectionId, ID.unique(), payload)
  }

  await loadPosts()
  step.value = 0
  resetForm()
}

const resetForm = () => {
  editingId.value = null
  form.value = {
    title: '', subtitle: '', slug: '', description: '',
    content: '', image_url: '', categories: '',
    author: { name: '', email: '', bio: '', avatar_url: '', created_at: '' }
  }
}

const editPost = (post) => {
  form.value = {
    ...post,
    categories: post.categories?.join(', ') || '',
    author: post.author || { name: '', email: '', bio: '', avatar_url: '', created_at: '' }
  }
  editingId.value = post.$id
  step.value = 1
}

const deletePost = async (id) => {
  if (confirm("Supprimer ce post ?")) {
    await db.deleteDocument(databaseId, collectionId, id)
    await loadPosts()
  }
}

const uploadImage = async (e) => {
  const file = e.target.files[0]
  if (!file) return
  const uploaded = await storage.createFile(bucketId, ID.unique(), file)
  form.value.image_url = `https://appwrite.ubbfy.com/storage/buckets/${bucketId}/files/${uploaded.$id}/view?project=67f3ad4f00234f8ab06c&mode=admin`
}

</script>
 

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

.post-page {
  padding: 2rem;
  background-color: #f3f6fa;
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.post-card {
  background: linear-gradient(to bottom right, #ffffff, #f1f5f9);
  border-left: 6px solid  var(--accent-color);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
  transform: scale(1);
  position: relative;
}

.post-card:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.post-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-bottom: 1px solid #e5e7eb;
}

.card-content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.card-content h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.card-content p {
  font-size: 0.95rem;
  color: #6b7280;
  margin: 0;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.icon-btn {
  background-color: #f1f5f9;
  border: none;
  border-radius: 10px;
  padding: 0.5rem 0.6rem;
  font-size: 1.1rem;
  color: #1f2937;
  cursor: pointer;
  transition: all 0.3s ease;
}

.icon-btn.edit {
  background-color: #e0e7ff;
  color:  var(--accent-color);
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
  border: 2px solid #3b82f6;
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
  border-color: #6366f1;
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
  background-color: #6366f1;
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
  background-color: #4f46e5;
}

</style>