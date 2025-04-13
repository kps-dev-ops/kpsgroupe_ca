<template>
  <section id="blog" class="blog-section">
    <h1>Nos derniers articles</h1>
    <div class="blog-grid">
      <!-- <div v-for="post in displayedPosts" :key="post.$id" class="blog-card-clean" @click="viewMore(post)">
         --><div
  v-for="(post, index) in displayedPosts"
  :key="post.$id"
  class="blog-card-clean"
  data-aos="fade-up"
  :data-aos-delay="index * 100"
  @click="viewMore(post)"
>

  <div class="card-cover">
    <img :src="post.image_url" alt="cover" />
  </div>

  <div class="card-content">
    <h3>{{ post.title }}</h3>
    <p class="categori">{{ post.subtitle }}</p>
    
    <div class="meta-line">
      <span class="views">
        👁️ {{ post.views || 0 }} vues
      </span>
      <span class="slug">
        🔗 {{ post.slug }}
      </span>
      <span v-if="post.featured" class="featured-badge">À la une</span>

    </div>
  </div>

  <!-- <div class="card-content">
    <h3>{{ post.title }}</h3>
    <p class="categori" >{{ post.subtitle }}</p>
    <small class="views">{{ post.views || 0 }} vues</small>
    <p>{{ post.slug }}</p>
  </div> -->
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
import { useBlogStore } from '../stores/blog'

const router = useRouter()
const blogStore = useBlogStore()

const showAll = ref(false)

// const displayedPosts = computed(() =>
//   showAll.value ? blogStore.articles : blogStore.articles.slice(0, 4)
// )

const displayedPosts = computed(() =>
  showAll.value
    ? blogStore.articles.filter((post) => post.published)
    : blogStore.articles.filter((post) => post.published).slice(0, 4)
)

const featuredPosts = computed(() =>
  blog.articles.filter((post) => post.featured && post.published)
)


const viewMore = (post) => {
  router.push({ name: 'detailblog', params: { slug: post.slug } })
}

const goToAllBlogs = () => {
  router.push({ name: 'Allblog' })
}

onMounted(async () => {
  await blogStore.fetchArticles()
})
</script>


<style scoped>

.featured-badge {
  background-color: #facc15;
  color: #92400e;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  display: inline-block;
  margin-top: 0.5rem;
}


.views {
  font-size: 0.85rem;
  color: #888;
  display: inline-block;
  margin-top: 0.5rem;
}

/* img { border-radius: 12px 12px 0 0; } */
.categori{
  color: #363232;
}
.blog-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* ou 2 pour deux par ligne */
  gap: 2.0rem;
 
}

.blog-section {
  padding: 2rem;
  font-family: var(--default-font);
  background-color: var(--background-color);
  text-align: center;
}
h1 {
  color: var(--heading-color);
  text-align: center;
  margin-bottom: 2rem;
  font-family: var(--heading-font);
  position: relative;
  display: inline-block;
  padding-bottom: 0.5rem;
  font-weight: bold;
}

h1::after {
  content: '';
  position: absolute;
  text-align: center;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 3px;
  width: 40px;
  background-color: var(--accent-color); /* ligne verte */
  border-radius: 2px;
}


.blog-card-clean {
  background: linear-gradient(to bottom right, #ffffff, #f8fafc);
  border-left: 5px solid var(--accent-color);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  /* transition: all 0.3s ease; */
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  cursor: pointer;
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
}

.blog-card-clean:hover {
  transform: translateY(-10px) scale(1.01);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
}

[data-aos] {
  transition-property: transform, opacity;
  transition-duration: 0.6s;
  transition-timing-function: ease-out;
}


.card-cover {
  width: 100%;
  height: 160px;
  background-color: #e0f2f1;
  overflow: hidden;
}

.card-content {
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.card-content h3 {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.card-content .categori {
  font-size: 0.95rem;
  color: #64748b;
  font-weight: 500;
  margin: 0;
}

.meta-line {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-top: 0.8rem;
}

.meta-line .views,
.meta-line .slug {
  font-size: 0.8rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}


.card-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
/* 
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
} */

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
