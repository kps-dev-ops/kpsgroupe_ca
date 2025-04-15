<template>
  <section id="blog" class="blog-section">
    <h1>Nos derniers articles</h1>
    <div class="blog-carousel-wrapper">
  <button class="carousel-btn left" @click="scrollCarousel('left')">❮</button>

  <div class="blog-carousel" ref="carousel">
    <div
      v-for="(post, index) in displayedPosts"
      :key="post.$id"
      class="blog-card-clean"
      :class="{ active: activeIndex === index }"
      @click="viewMore(post)"
    >
      <div class="card-cover">
        <img :src="post.image_url" alt="cover" />
      </div>
      <div class="card-content">
        <h3>{{ post.title }}</h3>
        <p class="categori">{{ post.subtitle }}</p>
        <div class="meta-line">
          <span class="slug">🔗 {{ post.slug }}</span>
        </div>
      </div>
    </div>
  </div>

  <button class="carousel-btn right" @click="scrollCarousel('right')">❯</button>
</div>


    <div v-if="!showAll" class="see-more">
     <button @click="goToAllBlogs">Voir plus d’articles</button>
    </div>

  </section>
</template>

<!-- 
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '../stores/blog'

const router = useRouter()
const blogStore = useBlogStore()

const showAll = ref(false)

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
</script> -->
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
    ? blogStore.articles.filter((post) => post.published)
    : blogStore.articles.filter((post) => post.published).slice(0, 5)
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
  await blogStore.fetchArticles()
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


.blog-carousel-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 2rem 0;
}

.blog-carousel {
  display: flex;
  gap: 1.2rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 1rem 2rem;
  scrollbar-width: none;
}
.blog-carousel::-webkit-scrollbar {
  display: none;
}

.blog-card-clean {
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
  min-width: 280px;
  max-width: 280px;
  transition: transform 0.4s ease, opacity 0.4s ease;
  flex-shrink: 0;
  opacity: 0.5;
  transform: scale(0.9);
  cursor: pointer;
}

.blog-card-clean.active {
  transform: scale(1.05);
  opacity: 1;
  z-index: 2;
}

.card-cover {
  width: 100%;
  height: 160px;
  overflow: hidden;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.card-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
/* 
.card-content {
  padding: 1.2rem;
  text-align: center;
} */

.card-content h3 {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.4rem;
}

.categori {
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.meta-line {
  font-size: 0.75rem;
  color: #9ca3af;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  border: none;
  font-size: 1.8rem;
  border-radius: 50%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 10;
  padding: 0.6rem 1rem;
}

.carousel-btn.left {
  left: 5px;
}

.carousel-btn.right {
  right: 5px;
}


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

/* 
.categori{
  color: #363232;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 4fr));
  gap: 1rem;
}
 */

.blog-section {
  padding: 2rem;
  font-family: var(--default-font);
  background-color: var(--background-color);
  text-align: center;
}
h1 {
  color: var(--heading-color);
  text-align: center ;
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


/* .blog-card-clean {
  background: linear-gradient(to bottom right, #ffffff, #f8fafc);
  border-left: 5px solid var(--accent-color);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  cursor: pointer;
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
} */

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
/* 
.card-content {
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
} */
.card-content {
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center; /* ➕ centre horizontalement les enfants */
  justify-content: center; /* ➕ centre verticalement si utile */
  gap: 0.6rem;
  text-align: center; /* ➕ centre le texte */
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
