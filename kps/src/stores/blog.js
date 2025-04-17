import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Query } from 'appwrite'
import { account, databases, storage, ID } from '../lib/appwrite'

const DATABASE_ID = '67f3de5700068b483ca7'
const COLLECTION_ID = '67f3ebc80030da0f765e'
const BUCKET_ID = '67f3ad7b0017d490c545'
const DEFAULT_IMAGE_URL = 'https://appwrite.ubbfy.com/v1/storage/buckets/67f3ad7b0017d490c545/files/new_cover/view?project=67f3ad4f00234f8ab06c&project=67f3ad4f00234f8ab06c&mode=admin'

export const useBlogStore = defineStore('blog', () => {
  const articles = ref([])
  const totalCount = ref(0)
  const currentArticle = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const user = ref(null)
  const posts = ref([])
  const authors = ref([])
  const lastPost = ref(null)

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
  
  const fetchArticleBySlug = async (slug) => {
    loading.value = true
    try {
      const { documents } = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal('slug', slug)
      ])
      if (documents.length > 0) {
        currentArticle.value = documents[0]
      } else {
        currentArticle.value = null
      }
    } catch (err) {
      error.value = err.message
      console.error('Erreur fetchArticleBySlug :', err)
    } finally {
      loading.value = false
    }
  }
  
  const incrementViews = async (slug) => {
    const viewed = JSON.parse(localStorage.getItem('viewedPosts') || '[]')
    if (viewed.includes(slug)) return
    
    try {
      const { documents } = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal('slug', slug)
      ])
      
      if (documents.length === 0) return
      
      const doc = documents[0]
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        views: (doc.views || 0) + 1
      })
      
      viewed.push(slug)
      localStorage.setItem('viewedPosts', JSON.stringify(viewed))
    } catch (err) {
      console.error('Erreur incrementViews :', err.message)
    }
  }

  const fetchArticles = async (page = 1, limit = 5, category = '') => {
    loading.value = true
    const offset = (page - 1) * limit
  
    try {
      const queries = [
        Query.equal("published", true),
        Query.limit(limit),
        Query.offset(offset),
        Query.orderDesc('$createdAt')
      ]
  
      if (category) {
        queries.push(Query.equal("subtitle", category))
      }
  
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        queries
      )
  
      articles.value = response.documents
      totalCount.value = response.total
    } catch (err) {
      error.value = err.message
      console.error('Erreur fetchArticles :', err)
    } finally {
      loading.value = false
    }
  }
  
  
  const fetchArticlesFeatured = async () => {
    loading.value = true
  
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [
          Query.equal("featured", true),
          Query.orderDesc('$createdAt')
        ]
      )
      articles.value = response.documents
      totalCount.value = response.total
    } catch (err) {
      error.value = err.message
      console.error('Erreur fetchArticles :', err)
    } finally {
      loading.value = false
    }
  }
  
  const fetchArticlesLast = async (last = 6) => {
    loading.value = true
  
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [
          Query.equal("published", true),
          Query.limit(last),
          Query.orderDesc('$createdAt')
        ]
      )
      return response.documents
    } catch (err) {
      console.error('Erreur lors de la récupération des derniers articles :', err)
      return []
    }
  }

  const fetchArticlesList = async () => {
    try {
      const p = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
        // Query.equal("published", true),
        Query.orderDesc('$createdAt')
      ])
      const a = await databases.listDocuments(DATABASE_ID, COLLECTION_ID)
      posts.value = p.documents
      authors.value = a.documents
      lastPost.value = p.documents.at(0)
    } catch (err) {
      console.error('Erreur lors de la récupération des articles :', err)
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
    const allowedExtensions = ['image/jpeg', 'image/png', 'image/jpg']
    if (!allowedExtensions.includes(file.type)) {
      alert("Ce type de fichier n'est pas autorisé. Veuillez télécharger une image JPEG, PNG ou JPG.")
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
  
      const existingDoc = await databases.getDocument(DATABASE_ID, COLLECTION_ID, id)
  
      if (post.image && post.image.startsWith('http')) {
        payload.image_url = post.image
      } else {
        payload.image_url = existingDoc.image_url || DEFAULT_IMAGE_URL
      }
      console.log('Mise à jour du post', payload)
      const doc = await databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, payload)
      const index = articles.value.findIndex((a) => a.$id === id)
      if (index !== -1) articles.value[index] = doc
  
      return doc
    } catch (err) {
      error.value = err.message
      console.error('Erreur updateArticle :', err)
    }
  }
  
  const updateArticle2 = async (id, updates) => {
    try {
      const payload = typeof updates === 'object' ? updates : formatPayload(updates, true)
  
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
      featured: payload.featured,
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
    posts,
    authors,
    totalCount,
    lastPost,
    login,
    logout,
    checkAuth,
    fetchArticles,
    fetchArticle,
    createArticle,
    updateArticle,
    updateArticle2,
    fetchArticlesFeatured,
    uploadImage,
    fetchArticlesList,
    fetchArticleBySlug,
    fetchArticlesLast,
    deleteArticle,
    incrementViews
  }
})
