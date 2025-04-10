<template>
  <div class="blog-detail" v-if="post">
    <div class="banner">
      <h1>{{ post.title }}</h1>
      <div class="author-bar" v-if="post.authors">
        <img :src="post.authors.avatar_url" alt="avatar" class="avatar" />
        <div class="meta">
          <p>{{ post.authors.name }}</p>
          <small>{{ formatDate(post.created_at) }}</small>
        </div>
      </div>
    </div>

    <div class="content-container">
      <div class="author-section" v-if="post.authors">
        <img :src="post.authors.avatar_url" class="author-img" />
        <div>
          <h2>{{ post.authors.name }}</h2>
          <p class="bio">{{ post.authors.bio }}</p>
        </div>
      </div> 

      <div class="main-content" v-html="post.content" />
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogStore } from '../stores/blog'

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
   Section Bannière
-------------------- */
.banner {
  background: var(--accent-color);
  color: white;
  padding: 3rem 2rem 4rem;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  position: relative;
}

.banner h1 {
  font-size: 2.3rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

.author-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-bar .avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid white;
  object-fit: cover;
}

.meta p {
  margin: 0;
  font-weight: bold;
}

.meta small {
  font-size: 0.85rem;
  color: #eee;
}

/* --------------------
   Section principale
-------------------- */
.content-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 3rem 2rem;
  justify-content: center;
}

/* Colonne Auteur */
.author-section {
  width: 250px;
  background-color: white;
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
}

.author-section .author-img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
}

.author-section h2 {
  font-size: 1.2rem;
  margin-bottom: 0.4rem;
}

.bio {
  font-size: 0.9rem;
  color: #555;
}

/* Colonne Contenu */
.main-content {
  flex: 1;
  max-width: 800px;
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
}

.main-content h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: var(--heading-color);
}

.main-content p {
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 1.2rem;
}
</style>
