<template>
    <div class="blog-detail">
      <!-- Section bannière avec titre -->
      <div class="banner">
        <h1>{{ post.title }}</h1>
        <div class="author-bar">
          <img :src="post.author.avatar_url" alt="avatar" class="avatar" />
          <div class="meta">
            <p>{{ post.author.name }}</p>
            <small>{{ formatDate(post.created_at) }}</small>
          </div>
        </div>
      </div>
  
      <!-- Section contenu -->
      <div class="content-container">
        <div class="author-section">
          <img :src="post.author.avatar_url" class="author-img" />
          <div>
            <h2>{{ post.author.name }}</h2>
            <p class="bio">{{ post.author.bio }}</p>
          </div>
        </div>
  
        <div class="main-content" v-html="post.content" />
      </div>
    </div>
  </template>
<!--   
  <script setup>
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  
  // Donnée fictive simulée (à remplacer plus tard avec Appwrite)
  const post = ref({
    title: 'Visibilité en ligne : les marques face au grand bouleversement de l’IA',
    created_at: '2025-04-07T10:00:00.000Z',
    content: `
      <h2>La recherche en ligne est en train de basculer</h2>
      <p>
        Après avoir massivement investi dans le SEO, les marques s’aventurent dans une nouvelle ère,
        celle du <strong>GEO (Generative Engine Optimization)</strong>. C’est une révolution encore discrète, mais promise à faire grand bruit.
      </p>
      <p>
        Les grands modèles de langage changent en profondeur les comportements d’achat…
      </p>
    `,
    author: {
      name: 'Maxime Girardeau',
      bio: 'VP | Head of AI Strategy & Transformation for Southern Central Europe, Capgemini',
      avatar_url: 'https://randomuser.me/api/portraits/men/32.jpg'
    }
  })
  
  // Fonction utilitaire
  const formatDate = (date) =>
    new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  </script>
   -->
   <script setup>
   import { ref, onMounted } from 'vue'
   import { useRoute } from 'vue-router'
   import { Client, Databases } from 'appwrite'
   
   const client = new Client()
   client.setEndpoint('https://appwrite.ubbfy.com/v1') // ✅ Ton endpoint Appwrite
   client.setProject('[TON_PROJECT_ID]') // ✅ Remplace avec ton vrai ID de projet
   
   const db = new Databases(client)
   const databaseId = '[TON_DATABASE_ID]' // ✅ Ton ID de base de données
   const collectionId = 'posts'
   
   const route = useRoute()
   const post = ref(null)
   const loading = ref(true)
   
   onMounted(async () => {
     try {
       const res = await db.getDocument(databaseId, collectionId, route.params.id)
       post.value = res
     } catch (err) {
       console.error('Erreur de chargement :', err)
     } finally {
       loading.value = false
     }
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
  