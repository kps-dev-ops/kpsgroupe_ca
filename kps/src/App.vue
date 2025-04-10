<template>
  <!-- <Headers /> -->
  <RouterView />

  <!-- 🔼 Flèche retour en haut -->
  <button
    v-show="isVisible"
    class="scroll-to-top"
    @click="scrollToTop"
  >
    ↑
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterView } from 'vue-router'
import Headers from './components/Headers.vue'
import { useBlogStore } from './stores/blog'

const blog = useBlogStore()

const isVisible = ref(false)

const toggleVisibility = () => {
  isVisible.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', toggleVisibility)
})

onMounted(() => {
  blog.checkAuth()
})

onUnmounted(() => {
  window.removeEventListener('scroll', toggleVisibility)
})
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background-color: #20b2aa;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 22px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease-in-out;
}

.scroll-to-top:hover {
  background-color: #1a8e87;
}
</style>
