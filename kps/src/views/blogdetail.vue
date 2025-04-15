<template>
  <Headers/>
  <div class="blog-detail" v-if="post">
    <div class="banner">
      <h1>{{ post.title }}</h1>
     
    </div>

    <div class="content-container">
      

      <div class="main-content" v-html="post.content" />
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { useBlogStore } from '../stores/blog'
import Headers from '../components/Headers.vue'

const route = useRoute()
const blogStore = useBlogStore()

const post = ref(null)
const loading = ref(true)

onMounted(async () => {
  await blogStore.fetchArticleBySlug(route.params.slug)
  post.value = blogStore.currentArticle
  loading.value = false
})

const formatDate = (date) =>
  new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
</script>

<style scoped>
.blog-detail {
  font-family: var(--default-font);
  color: var(--default-color);
  background: var(--background-color);
}

/* --------------------
   Bannière
-------------------- */
.banner {
  background: linear-gradient(135deg, #C5A070, #007cc7);
  color: white;
  padding: 4rem 2rem 3rem;
  text-align: left;
  position: relative;
  margin-top: 60px;
}

.banner h1 {
  font-size: 2.8rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.3;
}

.author-bar {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.author-bar .avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fff;
}

.meta {
  text-align: left;
}

.meta p {
  margin: 0;
  font-weight: 600;
}

.meta small {
  font-size: 0.85rem;
  color: #e0f2f1;
}

/* --------------------
   Contenu
-------------------- */
.content-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 3rem 1rem;
  justify-content: center;
}

/* Carte Auteur */
.author-section {
  flex: 0 0 250px;
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 2rem;
  height: fit-content;
}

.author-section .author-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
}

.author-section h2 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0.3rem 0;
}

.bio {
  font-size: 0.9rem;
  color: #555;
  margin-top: 0.5rem;
}

/* Article */
.main-content {
  flex: 1;
  max-width: 800px;
  background: #fff;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  line-height: 1.7;
}

.main-content h2 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--heading-color);
}

.main-content p {
  font-size: 1rem;
  color: #333;
  margin-bottom: 1.2rem;
  line-height: 1.8;
}

.main-content ul {
  padding-left: 1.2rem;
  margin-bottom: 1.5rem;
}

.main-content li {
  margin-bottom: 0.6rem;
  line-height: 1.5;
}

</style>
