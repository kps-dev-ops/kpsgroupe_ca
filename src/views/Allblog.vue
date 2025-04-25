<template>
  <Headers/>
 
  
  <div class="blog-hero">
    <div class="overlay"></div>
    <div class="container">
      <h1>Bienvenue sur notre Blog</h1>
      <p>Explorez nos articles autour de la Data, du Digital et du Consulting, rédigés avec passion.</p>
    </div>
  </div>

  <div class="search-filter">
    <input v-model="searchQuery" type="text" placeholder="Rechercher un article..." />
   
  </div>

  <section class="all-blogs">
    <div class="container">
      <div class="grid-with-sidebar">
        <div class="grid">
          <div
  v-for="post in filteredPosts"
  :key="post.$id"
  class="featured-blog-card"
  @click="goToPost(post)"
>
  <img :src="post.image_url" alt="cover" class="featured-image" />

  <div class="featured-overlay">
    <span class="badge top-right">{{ post.subtitle || 'ACTUALITÉ' }}</span>
    <h2 class="featured-title">{{ post.title }}</h2>
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
  </section>

  <Footer />
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '../stores/blog'
import Footer from '../components/Footer.vue'
import Headers from '../components/Headers.vue'

const router = useRouter()
const blogStore = useBlogStore()
const recentPosts = ref([])

const searchQuery = ref('')
const selectedCategory = ref('')

const posts = computed(() => blogStore.articles)
const currentPage = ref(1)
const limit = 5

const totalPages = computed(() => {
  return Math.ceil(blogStore.totalCount / limit)
})

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    blogStore.fetchArticles(page, limit, selectedCategory.value)
  }
}


const filteredPosts = computed(() => {
  return posts.value
    .filter(post => {
      const searchMatch = post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      return searchMatch 
    })
})

const goToPost = (post) => {
  blogStore.incrementViews(post.slug)
  router.push({ name: 'detailblog', params: { slug: post.slug } })
}

onMounted(async () => {
  recentPosts.value = await blogStore.fetchArticlesLast()
  await blogStore.fetchArticles(currentPage.value, limit)
})

watch(currentPage, (newPage) => {
  blogStore.fetchArticles(newPage, limit, selectedCategory.value)
  window.scrollTo({ top: 200, behavior: 'smooth' })
})

watch(selectedCategory, (newCategory) => {
  currentPage.value = 1
  blogStore.fetchArticles(currentPage.value, limit, newCategory)
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
</script>

<style scoped>
:root {
  --accent-color: #45A79E;
  --heading-color: #5E5325;
}

.blog-hero {
  position:relative;
  background: url('/src/assets/img/blogg.jpg') center/cover no-repeat;
  color: white;
  text-align: center;
  padding: 17rem 0rem 3rem;
  padding-top: 300px;
  border-radius: 0 0 40px 40px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}


.blog-hero .overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 0;
}

.blog-hero .container {
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
}

.pagination-container.centered {
  justify-content: center;
  padding-right: 0;
}

.pagination-container {
  display: flex;
  justify-content: center; 
  column-gap: 10px;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2.5rem;
  padding: 0; 
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
  border-color: #007bff;
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
.search-filter input:focus {
  outline: none;
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(69, 167, 158, 0.3);
  border: 1px solid var(--accent-color);
}

.search-filter select {
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border: none;
  background-color: #f1f5f9;
  font-size: 1rem;
}

.search-filter input {
  flex: 1; /* ⭐️ prend toute la place possible */
  min-width: 300px; /* largeur minimale */
  max-width: 600px; /* largeur maximale */
  padding: 1rem 1.5rem;
  border-radius: 12px;
  border: none;
  background-color: #f1f5f9;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
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

.blog-card {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  height: 100%;
  min-height: 260px;
  max-width: 360px;
  max-height: 100px;
  margin: 0 auto;
}

.blog-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.blog-image {
  position: relative;
  width: 100%;
  height: 100%;
}

.blog-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 16px;
}

/* Badge */
.badge.top-right {
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: var(--accent-color);
  color: white;
  font-size: 0.65rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  text-transform: uppercase;
}

/* Titre dans l'image */
.blog-content {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.65), transparent 60%);
  width: 100%;
  color: white;
  border-radius: 0 0 16px 16px;
}

.blog-content h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: white;
}

.blog-content p {
  display: none; /* cache le sous-titre ici, si tu veux le garder ajoute du style */
}

.featured-blog-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  height: 260px;
  cursor: pointer;
  transition: transform 0.3s ease;
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
}

.featured-blog-card:hover {
  transform: scale(1.01);
}

.featured-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.featured-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent 60%);
  color: white;
}

.featured-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: white;
}

.badge.top-right {
  align-self: flex-end;
  background-color: var(--accent-color);
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 20px;
  margin-bottom: auto;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  text-transform: uppercase;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
}

.featured-blog-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  height: 260px;
  cursor: pointer;
  transition: transform 0.3s ease;
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
}

.featured-blog-card:hover {
  transform: scale(1.01);
}

.featured-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.featured-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent 60%);
  color: white;
}

.featured-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: white;
}

.badge.top-right {
  align-self: flex-end;
  background-color: var(--accent-color);
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 20px;
  margin-bottom: auto;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  text-transform: uppercase;
}

.no-results {
  text-align: center;
  grid-column: 1 / -1;
  font-style: italic;
  color: #888;
  padding: 2rem;
}
.sidebar {
  /* background: white; */
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  /* border-left: 5px solid var(--accent-color); */
  transition: all 0.3s ease-in-out;
  align-self: start;
  /* height: auto; */
}

.sidebar h3 {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: var(--heading-color);
  border-bottom: 2px solid var(--accent-color);
  padding-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.recent-article {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 12px;
  transition: background-color 0.2s ease;
}

.recent-article:hover {
  background-color: #f1f5f9;
}

.recent-article img {
  width: 55px;
  height: 55px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.recent-article .info {
  flex: 1;
}

.recent-article .title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  line-height: 1.2;
}

@media (max-width: 991px) {
  .grid-with-sidebar {
    grid-template-columns: 1fr; /* une seule colonne */
  }

  .sidebar {
    margin-top: 2rem;
    width: 100%;
    border-left: none;
    border-top: 5px solid var(--accent-color);
  }

  .grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  .featured-title {
    font-size: 1.2rem;
  }

  .featured-overlay {
    padding: 1.2rem;
  }

  .recent-article {
    flex-direction: row;
    align-items: flex-start;
  }
}

@media (max-width: 576px) {
  .search-filter {
    flex-direction: column;
    padding: 1.5rem 1rem;
  }

  .search-filter input {
    width: 100%;
  }

  .featured-blog-card {
    height: 220px;
  }

  .featured-title {
    font-size: 1rem;
  }

  .badge.top-right {
    font-size: 0.6rem;
    padding: 4px 10px;
  }
}

@media (max-width: 880px) {
  .grid-with-sidebar {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .featured-blog-card {
    height: auto;
    min-height: 240px;
    border-radius: 12px;
  }

  .featured-title {
    font-size: 1.2rem;
  }

  .featured-overlay {
    padding: 1rem;
  }

  .sidebar {
    width: 100%;
    padding: 1.2rem;
    border-left: none;
    border-top: 4px solid var(--accent-color);
  }

  .recent-article {
    gap: 0.8rem;
  }

  .recent-article img {
    width: 50px;
    height: 50px;
  }

  .search-filter {
    flex-direction: column;
    align-items: center;
    padding: 1.5rem;
  }

  .search-filter input {
    min-width: 90%;
    max-width: 100%;
  }
}


</style>
