<template>
    <Headers />
  
    <!-- BANNIÈRE -->
    <div class="blog-banner">
      <h1>Blogs</h1>
    </div>
  
    <!-- BARRE DE RECHERCHE ET FILTRE -->
    <div class="search-filter">
      <input v-model="searchQuery" type="text" placeholder="Entrez votre recherche" />
      
      <select v-model="selectedCategory">
        <option value="">Toutes les catégories</option>
        <option v-for="cat in categoryList" :key="cat" :value="cat">
            {{ cat }}
        </option>
        </select>

    </div>
  
    <section class="all-blogs">
      <div class="container">
        <h2 class="title">Tous nos articles</h2>
        <div class="grid">
            <div
  v-for="post in filteredPosts"
  :key="post.$id"
  class="blog-card-clean"
  data-aos="fade-up"
  @click="goToPost(post)"
>
  <div class="card-cover">
    <img :src="post.image_url" alt="cover" />
  </div>
  <div class="card-content">
    <h3>{{ post.title }}</h3>
    <p>{{ post.subtitle }}</p>
    <p>{{ post.slug }}</p>
    <small v-if="post.authors">Par {{ post.authors.name }}</small>
  </div>
</div>

        </div>
      </div>
    </section>
<Footer/>
  </template>
  
<script setup>
 import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Client, Databases } from 'appwrite'
import Headers from '../components/Headers.vue'
import Footer from '../components/Footer.vue'

const router = useRouter()
const posts = ref([])
const searchQuery = ref('')
const selectedCategory = ref('')

const client = new Client()
client.setEndpoint('https://appwrite.ubbfy.com/v1').setProject('67f3ad4f00234f8ab06c')
const db = new Databases(client)

const loadPosts = async () => {
  try {
    const res = await db.listDocuments('67f3de5700068b483ca7', '67f3ebc80030da0f765e')
    posts.value = res.documents.filter(post => post.published !== false)
  } catch (err) {
    console.error('Erreur de chargement des articles', err)
  }
}

const uniqueCategories = computed(() => {
  const categories = posts.value.map(p => p.category).filter(Boolean)
  return [...new Set(categories)]
})

const filteredPosts = computed(() => {
  return posts.value.filter(post => {
    const matchSearch =
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.subtitle.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchCategory =
      !selectedCategory.value || post.category === selectedCategory.value
    return matchSearch && matchCategory
  })
})

const goToPost = (post) => {
  router.push({ name: 'BlogDetail', params: { posts_id: post.$id } })
}

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

onMounted(loadPosts)
</script>

<style scoped>
.blog-card-clean {
  background: linear-gradient(to bottom right, #ffffff, #f8fafc);
  border-left: 5px solid var(--accent-color);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  width: 100%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
}

.blog-card-clean:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
}

.card-cover {
  width: 100%;
  height: 180px;
  background-color: #e0f2f1;
  overflow: hidden;
}

.card-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.card-content h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.card-content p {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
}

.card-content small {
  font-size: 0.8rem;
  color: #94a3b8;
}


.blog-banner {
  background: linear-gradient(135deg, #368c85, #007cc7);
  color: white;
  padding: 4rem 2rem 3rem;
  text-align: left;
  position: relative;
  margin-top: 60px;
}

.blog-banner h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
}

.search-filter {
  background-color: white;
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.search-filter input {
  flex: 1;
  min-width: 240px;
  padding: 0.8rem 1rem;
  border-radius: 30px;
  border: none;
  background-color: #eee;
  font-size: 1rem;
}

.search-filter select {
  padding: 0.8rem 1rem;
  border-radius: 6px;
  border: none;
  background-color: #eee;
  font-size: 1rem;
  min-width: 200px;
}

.all-blogs {
  padding: 2rem 1rem;
  background-color: #f9f9f9;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  text-align: center;
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--heading-color);
  margin-bottom: 2rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.blog-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.blog-image {
  width: 100%;
  height: 140px;
  object-fit: cover;
  background-color: #e0eefe;
}

.blog-content {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.blog-content h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--default-color);
  margin: 0;
}

.blog-content p {
  font-size: 0.9rem;
  color: #555;
  margin: 0;
}

.blog-content small {
  font-size: 0.8rem;
  color: #888;
}

  
  </style>