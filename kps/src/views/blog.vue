<template>
  <section id="blog" class="blog-section">
    <h1>Nos derniers articles</h1>
    <div class="blog-grid">
      <div v-for="post in displayedPosts" :key="post.$id" class="blog-card-clean" @click="viewMore(post)">
  <div class="card-cover">
    <img :src="post.image_url" alt="cover" />
  </div>
  <div class="card-content">
    <h3>{{ post.title }}</h3>
    <p>{{ post.subtitle }}</p>
    <small v-if="post.authors">Par {{ post.authors.name }}</small>
  </div>
</div>

    </div>

    <div v-if="!showAll" class="see-more">
     <button @click="goToAllBlogs">Voir plus d’articles</button>
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

const goToAllBlogs = () => {
  router.push({ name: 'Allblog' }) // 'AllBlogs' doit être le nom de ta route
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

.blog-card-clean {
  background: linear-gradient(to bottom right, #ffffff, #f8fafc);
  border-left: 5px solid var(--accent-color);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
}

.blog-card-clean:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
}

.card-cover {
  width: 100%;
  height: 160px;
  background-color: #e0f2f1;
  overflow: hidden;
}

.card-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content {
  padding: 1.2rem;
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

.clickable {
  cursor: pointer;
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
  transition: background 0.3s ease;
  font-weight: 500;
  font-size: 1rem;
}

.see-more button:hover {
  background-color: #368c85;
}

</style>
