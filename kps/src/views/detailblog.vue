<template>
  <div class="blog-detail" v-if="post">
    <!-- Header -->
     <Headers/>
    <div class="blog-header" data-aos="fade-down">
      <!-- <div class="back-button" @click="router.push('/')">
        <i class="bi bi-arrow-left"></i> Accueil
      </div> -->
    </div>

    <!-- Hero Image with Title -->
    <div class="blog-hero">
      <img :src="post.image_url" alt="banner" class="hero-background" />
      <div class="hero-overlay">
        <span class="badge">{{ post.subtitle }}</span>
        <h1 class="hero-title">{{ post.title }}</h1>
      </div>
    </div>

    <!-- Main content -->
    <div class="content-container" data-aos="fade-up">
  <div class="content-grid">
    <!-- Contenu principal -->
    <div class="main-content" v-html="post.content" />

    <!-- Sidebar -->
    <aside class="sidebar">
      <h3>Articles récents</h3>
      <div
        class="recent-article"
        v-for="article in blogStore.articles.slice(0, 5)"
        :key="article.$id"
        @click="goToPost(article)"
      >
        <img :src="article.image_url" alt="" />
        <div class="info">
          <p class="title">{{ article.title }}</p>
        </div>
      </div>
    </aside>
  </div>
</div>

  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useBlogStore } from '../stores/blog'
import Headers from '../components/Headers.vue'

const router = useRouter()

const route = useRoute()
const blogStore = useBlogStore()

const post = ref(null)
const loading = ref(true)

const goToPost = (article) => {
  router.push({ name: 'detailblog', params: { slug: article.slug } })
}

onMounted(async () => {
  await blogStore.fetchArticleBySlug(route.params.slug)
  post.value = blogStore.currentArticle
  loading.value = false
})
</script>

<style scoped>
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
  color: #45A79E;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  transition: color 0.3s ease;
}

.back-button:hover {
  color: #6db1aa;
}

.blog-hero {
  position: relative;
  width: 100%;
  height: 480px;
  overflow: hidden;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
}

.hero-background {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.65), transparent 60%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: center;
}

.badge {
  background-color: #45A79E;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: inline-block;
}

.hero-title {
  font-size: 2.4rem;
  font-weight: 700;
  color: white;
  margin: 0;
  max-width: 90%;
  line-height: 1.3;
}

.content-container {
  display: flex;
  justify-content: center;
  padding: 3rem 1rem;
}

.main-content {
  max-width: 900px;
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  font-size: 1rem;
  line-height: 1.8;
  color: #333;
}

.main-content h2 {
  font-size: 1.8rem;
  font-weight: bold;
  color: #5E5325;
  margin-bottom: 1rem;
}

.main-content p {
  margin-bottom: 1.2rem;
}

.content-grid {
  display: grid;
  grid-template-columns: 3fr 1.2fr;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
}

.sidebar {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  border-left: 5px solid var(--accent-color);
  transition: all 0.3s ease-in-out;
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
 
</style>
