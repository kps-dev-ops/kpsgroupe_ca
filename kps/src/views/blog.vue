<template>
  <section id="blog" class="blog-section">
    <h1>Nos derniers articles</h1>
    <div class="blog-grid">
      <div v-for="post in displayedPosts" :key="post.$id" class="blog-card">
        <img :src="post.image_url" alt="cover" />
        <div class="content">
          <h2>{{ post.title }}</h2>
          <p>{{ post.subtitle }}</p>
          <small v-if="post.authors">Par {{ post.authors.name }}</small>
          <button @click="viewMore(post)">En savoir plus</button>
        </div>
      </div>
    </div>
    
    <div v-if="!showAll" class="see-more">
      <button @click="showAll = true">Voir plus d’articles</button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Client, Databases } from 'appwrite'

const router = useRouter()
const client = new Client()
client.setEndpoint('https://appwrite.ubbfy.com/v1').setProject('67f3ad4f00234f8ab06c')

const db = new Databases(client)
const posts = ref([])
const showAll = ref(false)

const displayedPosts = computed(() =>
  showAll.value ? posts.value : posts.value.slice(0, 2)
)

const viewMore = (post) => {
  router.push({ name: 'BlogDetail', params: { posts_id: post.$id } })
}


const loadPosts = async () => {
  try {
    const res = await db.listDocuments('67f3de5700068b483ca7', '67f3ebc80030da0f765e')
    posts.value = res.documents.filter(post => post.published !== false)
  } catch (error) {
    console.error('Erreur chargement posts Appwrite', error)
  }
}

onMounted(loadPosts)
</script>

<style scoped>
.blog-section {
  padding: 2rem;
  font-family: var(--default-font);
  background-color: var(--background-color);
}

h1 {
  color: var(--heading-color);
  text-align: center;
  margin-bottom: 2rem;
  font-family: var(--heading-font);
}

.blog-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

.blog-card {
  background-color: var(--surface-color);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  overflow: hidden;
  width: 320px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 18px rgba(0,0,0,0.12);
}

.blog-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  background-color: var(--color-light-blue);
}

.content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.content h2 {
  font-size: 1.3rem;
  color: var(--default-color);
  font-weight: bold;
}

.content p {
  margin: 0;
  color: #333;
}

.content small {
  font-size: 0.85rem;
  color: gray;
}

.content button {
  align-self: flex-start;
  margin-top: 0.5rem;
  background-color: var(--accent-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.content button:hover {
  background-color: #368c85;
}

.see-more {
  text-align: center;
  margin-top: 2rem;
}

.see-more button {
  background-color: var(--accent-color);
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
