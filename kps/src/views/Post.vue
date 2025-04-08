
<template>
    <section class="post-page">
      <div class="header">
        <h2>Articles</h2>
        <button class="toggle-btn" @click="toggleForm">{{ step > 0 ? 'Fermer' : '➕ Nouveau Post' }}</button>
      </div>
  
      <div v-if="step === 0" class="posts-list">
        <div class="post-card" v-for="post in posts" :key="post.$id">
          <img :src="post.image_url" alt="cover" />
          <h3>{{ post.title }}</h3>
          <p>{{ post.subtitle }}</p>
          <div class="actions">
            <button @click="editPost(post)">✏️</button>
            <button @click="deletePost(post.$id)">🗑️</button>
          </div>
        </div>
      </div>
  
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
              <select v-model="form.author.avatar_url">
                <option disabled value="">Choisir un avatar</option>
                <option v-for="avatar in avatarList" :key="avatar" :value="avatar">
                  {{ avatar }}
                </option>
              </select>
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
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { Client, Databases, ID, Storage } from 'appwrite'
  
  const client = new Client()
  client.setEndpoint('https://[TON_ENDPOINT]').setProject('[TON_PROJECT_ID]')
  const db = new Databases(client)
  const storage = new Storage(client)
  const databaseId = '[TON_DATABASE_ID]'
  const collectionId = 'posts'
  const bucketId = '[TON_BUCKET_ID]'
  
  const posts = ref([])
  const form = ref({
    title: '', subtitle: '', slug: '', description: '',
    content: '', image_url: '', categories: '',
    author: {
      name: '', email: '', bio: '', avatar_url: '', created_at: ''
    }
  })
  const labels = { title: 'Titre', subtitle: 'Sous-titre', slug: 'Slug (mon-article)' }
  const editingId = ref(null)
  const step = ref(0)
  
  const avatarList = [
    "https://api.dicebear.com/6.x/bottts/svg?seed=A",
    "https://api.dicebear.com/6.x/bottts/svg?seed=B",
    "https://api.dicebear.com/6.x/bottts/svg?seed=C",
    "https://api.dicebear.com/6.x/bottts/svg?seed=D"
  ]
  
  onMounted(async () => {
    await loadPosts()
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
    if (!form.value.author.created_at) {
      form.value.author.created_at = new Date().toISOString()
    }
    const payload = {
      ...form.value,
      categories: form.value.categories.split(',').map(x => x.trim()),
      updated_at: new Date().toISOString()
    }
  
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
    form.value.image_url = `https://[TON_ENDPOINT]/storage/buckets/${bucketId}/files/${uploaded.$id}/view?project=[TON_PROJECT_ID]&mode=admin`
  }
  </script>
  
  
  <style scoped>
  .post-page {
    padding: 2rem;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .toggle-btn {
    padding: 0.5rem 1rem;
    background-color: var(--accent-color);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  
  .posts-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-top: 2rem;
  }
  
  .post-card {
    background: var(--surface-color);
    border-radius: 10px;
    width: 300px;
    overflow: hidden;
    border: 1px solid var(--color-light-blue);
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }
  
  .post-card img {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }
  
  .post-card h3 {
    margin: 1rem;
  }
  
  .actions {
    display: flex;
    justify-content: space-between;
    padding: 0 1rem 1rem;
  }
  
  .form-box {
    margin-top: 2rem;
    padding: 2rem;
    border-radius: 10px;
    background-color: var(--color-light-blue);
  }
  
  .input-group {
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
  }
  
  .input-group input,
  .input-group textarea {
    padding: 0.6rem;
    font-size: 1rem;
    border: 1px solid var(--accent-color);
    border-radius: 6px;
    background: white;
    outline: none;
    transition: border 0.3s ease;
  }
  
  .input-group input:focus,
  .input-group textarea:focus {
    border-color: #2f837c;
  }
  
  .form-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  </style>
  