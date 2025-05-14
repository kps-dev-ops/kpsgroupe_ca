<template>
  <section id="blog" class="blog-section">
  <h1>Nos derniers articles</h1>

  <div class="blog-grid">
    <div
      v-for="post in displayedPosts"
      :key="post.$id"
      class="blog-card"
      @click="viewMore(post)"
    >
    <div class="blog-image">
        <img :src="post.image_url" alt="cover" />
        <span class="badge top-right">{{ post.subtitle|| 'ACTUALITÉ' }}</span>
      <div class="blog-overlay">
        <h3>{{ post.title }}</h3>
      </div>
    </div>

    </div>
  </div>

  <div class="see-more">
    <button @click="goToAllBlogs">Voir plus d’articles</button>
  </div>
</section>


</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '../stores/blog'

const router = useRouter()
const blogStore = useBlogStore()

const carousel = ref(null)
const activeIndex = ref(0)
let autoScrollInterval = null

const showAll = ref(false)
const displayedPosts = computed(() =>
  showAll.value
    ? blogStore.articles.filter((post) => post.published && post.featured)
    : blogStore.articles.filter((post) => post.published && post.featured).slice(0, 5)
)


const scrollCarousel = (direction) => {
  const cardWidth = 300 + 20 // carte + espace
  const max = displayedPosts.value.length - 1
  if (!carousel.value) return

  if (direction === 'right') {
    activeIndex.value = activeIndex.value >= max ? 0 : activeIndex.value + 1
  } else {
    activeIndex.value = activeIndex.value <= 0 ? max : activeIndex.value - 1
  }

  carousel.value.scrollTo({
    left: activeIndex.value * cardWidth,
    behavior: 'smooth'
  })
}

onMounted(async () => {
  await blogStore.fetchArticlesFeatured()
  autoScrollInterval = setInterval(() => scrollCarousel('right'), 7000)
})

onBeforeUnmount(() => {
  clearInterval(autoScrollInterval)
})


const goToAllBlogs = () => {
  router.push({ name: 'Allblog' })
}

const viewMore = (post) => {
  blogStore.incrementViews()
  router.push({ name: 'detailblog', params: { slug: post.slug } })
}

</script>

<style scoped>
:root {
  --color-teal: #45A79E;
  --color-dark-brown: #5E5325;
  --color-cream: #fdf7ef;
  --accent-color: #45A79E;
  --heading-color: #5E5325;
  --background-color: #ffffff;
}

/* Section blog */
.blog-section {
  padding: 2rem;
  background-color: var(--background-color);
  font-family: var(--default-font);
}

h1 {
  color: var(--heading-color);
  text-align: center;
  margin-bottom: 2.5rem;
  font-size: 2rem;
  font-weight: bold;
  position: relative;
}

h1::after {
  content: '';
  display: block;
  width: 60px;
  height: 4px;
  background-color: var(--accent-color);
  border-radius: 4px;
  margin: 0.5rem auto 0;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.8rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Carte article */
.blog-card {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  background-color: white;
}

.blog-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.15);
}

.blog-image {
  position: relative;
  width: 100%;
  height: 360px;
  overflow: hidden;
  border-radius: 16px;
}

.blog-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.blog-card:hover img {
  transform: scale(1.1);
}

/* Overlay sombre + contenu */
.blog-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.55), transparent 65%);
  z-index: 1;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: white;
}

/* .blog-overlay .badge {
  background-color: var(--accent-color);
  font-size: 0.7rem;
  font-weight: bold;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 4px;
  margin-bottom: 0.6rem;
  display: inline-block;
} */

.badge {
  background-color: var(--accent-color);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: 20px;
  display: inline-block;
  white-space: nowrap;
  line-height: 1;
}

.badge.top-right {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 2;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}


.blog-overlay h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  color: #ffffff;
}

/* Bouton voir plus */
.see-more {
  text-align: center;
  margin-top: 2rem;
}

.see-more button {
  background-color: var(--accent-color);
  color: white;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
}

.see-more button:hover {
  background-color: #71bab3;
}

</style>
