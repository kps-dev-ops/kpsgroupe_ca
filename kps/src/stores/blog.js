// src/store/blog.js

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { databases, storage, ID } from '../lib/appwrite'
// import { dataURItoBlob } from '@/utils/dataUriToBlob' // si tu as une fonction à part
function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1])
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)
  
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }
  
    return new Blob([ab], { type: mimeString })
  }
// Ids centralisés
const DATABASE_ID = '67f3de5700068b483ca7'
const COLLECTION_ID = '67f3ebc80030da0f765e'
const BUCKET_ID = '67f3ad7b0017d490c545'
const DEFAULT_IMAGE_URL = 'default.jpg'

export const useBlogStore = defineStore('blog', () => {
  // State
  const articles = ref([])
  const currentArticle = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Fetch all
  const fetchArticles = async () => {
    loading.value = true
    try {
      const { documents } = await databases.listDocuments(DATABASE_ID, COLLECTION_ID)
      articles.value = documents
    } catch (err) {
      error.value = err.message
      console.error('Erreur fetchArticles :', err)
    } finally {
      loading.value = false
    }
  }

  // Fetch one
  const fetchArticle = async (id) => {
    loading.value = true
    try {
      const doc = await databases.getDocument(DATABASE_ID, COLLECTION_ID, id)
      currentArticle.value = doc
    } catch (err) {
      error.value = err.message
      console.error('Erreur fetchArticle :', err)
    } finally {
      loading.value = false
    }
  }

  // Create
  const createArticle = async (post) => {
    try {
      const payload = formatPayload(post)

      if (post.image && !post.image.startsWith('http')) {
        const file = new File([dataURItoBlob(post.image)], 'image.jpg', { type: 'image/jpeg' })
        const upload = await storage.createFile(BUCKET_ID, ID.unique(), file)
        payload.image = upload.$id
      }

      const doc = await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), payload)
      articles.value.push(doc)
      return doc
    } catch (err) {
      error.value = err.message
      console.error('Erreur createArticle :', err)
    }
  }

  // Update
  const updateArticle = async (id, post) => {
    try {
      const payload = formatPayload(post)

      if (post.image && !post.image.startsWith('http')) {
        const file = new File([dataURItoBlob(post.image)], 'image.jpg', { type: 'image/jpeg' })
        const upload = await storage.createFile(BUCKET_ID, ID.unique(), file)
        payload.image = upload.$id
      }

      const doc = await databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, payload)
      const index = articles.value.findIndex((a) => a.$id === id)
      if (index !== -1) articles.value[index] = doc
      return doc
    } catch (err) {
      error.value = err.message
      console.error('Erreur updateArticle :', err)
    }
  }

  // Delete
  const deleteArticle = async (id) => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id)
      articles.value = articles.value.filter((a) => a.$id !== id)
    } catch (err) {
      error.value = err.message
      console.error('Erreur deleteArticle :', err)
    }
  }

  // Format payload commun
  const formatPayload = (post) => ({
    title: post.title.trim(),
    description: post.description.trim(),
    category: post.category.trim(),
    content: post.content.trim(),
    image: post.image || DEFAULT_IMAGE_URL,
    slug: post.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
  })

  return {
    articles,
    currentArticle,
    loading,
    error,
    fetchArticles,
    fetchArticle,
    createArticle,
    updateArticle,
    deleteArticle,
  }
})
