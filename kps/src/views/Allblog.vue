<template>
  <div class="blog-header" data-aos="fade-down">
    <div class="back-button" @click="router.push('/')">
      <i class="bi bi-arrow-left"></i> Accueil
    </div>
  </div>

  <div class="blog-banner">
    <h1>Blog </h1>
    <p>Retrouvez nos derniers articles autour de la Data, du Digital et du Consulting, rédigés par des experts du domaine.</p>
  </div>

  <div class="search-filter">
    <input v-model="searchQuery" type="text" placeholder="Rechercher un article..." />
    <select v-model="selectedCategory">
      <option value="">Toutes les catégories</option>
      <option v-for="cat in categoryList" :key="cat" :value="cat">{{ cat }}</option>
    </select>
  </div>

  <section class="all-blogs">
    <div class="container">
      <div class="grid-with-sidebar">
        <div class="grid">
          <div
            v-for="post in filteredPosts"
            :key="post.$id"
            class="blog-card"
            @click="goToPost(post)"
          >
            <div class="blog-image">
              <img :src="post.image_url" alt="cover" />
              <span class="badge top-right">{{ post.subtitle || 'ACTUALITÉ' }}</span>
            </div>
            <div class="blog-content">
              <h3>{{ post.title }}</h3>
              <p>{{ post.subtitle }}</p>
            </div>
          </div>

          <div v-if="filteredPosts.length === 0" class="no-results">
            <p>Aucun article ne correspond à votre recherche.</p>
          </div>
        </div>

        <aside class="sidebar">
          <h3>Articles récents</h3>
          <div class="recent-article" v-for="post in recentPosts" :key="post.$id" @click="goToPost(post)">
            <img :src="post.image_url" alt="" />
            <div class="info">
              <p class="title">{{ post.title }}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <Footer />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '../stores/blog'
import Footer from '../components/Footer.vue'

const router = useRouter()
const blogStore = useBlogStore()

const searchQuery = ref('')
const selectedCategory = ref('')

const posts = computed(() => blogStore.articles)

const filteredPosts = computed(() => {
  return posts.value
    .filter(post => post.published)
    .filter(post => {
      const searchMatch = post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      const categoryMatch = !selectedCategory.value || post.subtitle === selectedCategory.value
      return searchMatch && categoryMatch
    })
})

const recentPosts = computed(() => {
  return posts.value.filter(post => post.published).slice(0, 6)
})

const goToPost = (post) => {
  blogStore.incrementViews(post.slug)
  router.push({ name: 'detailblog', params: { slug: post.slug } })
}

onMounted(() => {
  blogStore.fetchArticles()
})

const categoryList = [
  'Dentition',
  'Hygiène',
  'Esthétique',
  'Orthodontie',
  'Conseils',
  'Actualité',
  'Data',
  'Intelligence Artificielle'
]
</script>

<style scoped>
:root {
  --accent-color: #45A79E;
  --heading-color: #5E5325;
}

.blog-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  background: white;
  display: flex;
  align-items: center;
  padding: 0 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  z-index: 999;
}

.back-button {
  cursor: pointer;
  font-weight: 600;
  color: var(--accent-color);
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  transition: color 0.3s ease;
}
.back-button:hover {
  color: #71bab3;
}

.blog-banner {
  margin-top: 80px;
  background: linear-gradient(135deg, #45A79E, #007cc7);
  color: white;
  padding: 4rem 2rem 3rem;
  text-align: center;
}

.blog-banner h1 {
  font-size: 2.8rem;
  margin-bottom: 0.5rem;
}
.blog-banner p {
  font-size: 1.1rem;
  opacity: 0.9;
}

.search-filter {
  background-color: white;
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  border-bottom: 1px solid #eee;
}
.search-filter input,
.search-filter select {
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border: none;
  background-color: #f1f5f9;
  font-size: 1rem;
}

.all-blogs {
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
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.blog-card {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
}
.blog-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}

.blog-image {
  position: relative;
  height: 160px;
  background: #e0e0e0;
}
.blog-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.badge.top-right {
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: var(--accent-color);
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.blog-content {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.blog-content h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}
.blog-content p {
  font-size: 0.9rem;
  color: #555;
  margin: 0;
}

.no-results {
  text-align: center;
  grid-column: 1 / -1;
  font-style: italic;
  color: #888;
  padding: 2rem;
}

.sidebar {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
}
.sidebar h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: var(--heading-color);
  border-bottom: 2px solid var(--accent-color);
  padding-bottom: 0.5rem;
}
.recent-article {
  display: flex;
  gap: 0.6rem;
  align-items: center;
  margin-bottom: 1rem;
  cursor: pointer;
}
.recent-article img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 8px;
}
.recent-article .info {
  flex: 1;
}
.recent-article .title {
  font-size: 0.85rem;
  font-weight: 500;
  color: #333;
  margin: 0;
  line-height: 1.2;
}
</style>
