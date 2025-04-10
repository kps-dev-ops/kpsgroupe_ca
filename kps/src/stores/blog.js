import { defineStore } from 'pinia'
import { ref } from 'vue'
import { account, databases, storage, ID } from '../lib/appwrite'

const DATABASE_ID = '67f3de5700068b483ca7'
const COLLECTION_ID = '67f3ebc80030da0f765e'
const BUCKET_ID = '67f3ad7b0017d490c545'
const DEFAULT_IMAGE_URL = 'https://placehold.co/800?text=No+Image&font=roboto'

export const useBlogStore = defineStore('blog', () => {
  const articles = ref([])
  const currentArticle = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const user = ref(null)

  const login = async (email, password) => {
    try {
      await account.createEmailPasswordSession(email, password)
      const currentUser = await account.get()
      user.value = currentUser
      return currentUser
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  const checkAuth = async () => {
    try {
      const currentUser = await account.get()
      user.value = currentUser
    } catch {
      user.value = null
    }
  }

  const logout = async () => {
    await account.deleteSession('current')
    user.value = null
  }

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

  const uploadImage = async (file) => {
    const allowedExtensions = ['image/jpeg', 'image/png', 'image/pdf']
    if (!allowedExtensions.includes(file.type)) {
      alert("Ce type de fichier n'est pas autorisé. Veuillez télécharger une image JPEG, PNG ou PDF.")
      return null
    }

    try {
      const fileObj = await storage.createFile(BUCKET_ID, ID.unique(), file)
      const fileUrl = storage.getFilePreview(BUCKET_ID, fileObj.$id, 600, 400)
      return fileUrl.href
    } catch (err) {
      console.error("Erreur lors de l'upload de l'image :", err)
      return null
    }
  }

  const createArticle = async (post) => {
    try {
      const payload = formatPayload(post)

      if (post.image && post.image instanceof File) {
        const imageUrl = await uploadImage(post.image)
        payload.image_url = imageUrl || DEFAULT_IMAGE_URL
      } else if (post.image && post.image.startsWith('http')) {
        payload.image_url = post.image
      } else {
        payload.image_url = DEFAULT_IMAGE_URL
      }

      const doc = await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), payload)
      articles.value.push(doc)
      return doc
    } catch (err) {
      error.value = err.message
      console.error('Erreur createArticle :', err)
    }
  }

  const updateArticle = async (id, post) => {
    try {
      const payload = formatPayload(post, true)

      if (post.image && post.image.startsWith('http')) {
        payload.image_url = post.image
      } else {
        payload.image_url = DEFAULT_IMAGE_URL
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

  const deleteArticle = async (id) => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id)
      articles.value = articles.value.filter((a) => a.$id !== id)
    } catch (err) {
      error.value = err.message
      console.error('Erreur deleteArticle :', err)
    }
  }

  const formatPayload = (payload, isUpdate = false) => {
    const now = new Date().toISOString()
    return {
      title: payload.title?.trim() || '',
      slug: payload.slug?.trim() || '',
      subtitle: payload.subtitle?.trim() || '',
      description: payload.description?.trim() || '',
      content: payload.content?.trim() || '',
      image_url: payload.image_url || '',
      published: payload.published ?? true,
      categories: payload.categories || [],
      updated_at: now,
      created_at: isUpdate ? payload.created_at : now,
    }
  }

  return {
    user,
    articles,
    currentArticle,
    loading,
    error,
    login,
    logout,
    checkAuth,
    fetchArticles,
    fetchArticle,
    createArticle,
    updateArticle,
    uploadImage,
    deleteArticle
  }
})
