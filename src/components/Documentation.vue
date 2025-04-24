<template>
    <section class="documentation container py-5">
      <header class="doc-header-full">
        <div class="doc-header-inner">
            <img :src="logo" alt="Logo KPS" class="doc-logo" />
            <h1 class="doc-title">Tutoriel de le creation d'un blog </h1>
        </div>
     </header>

      <!-- Étape 0 : Connexion -->
      <div class="doc-step" data-aos="fade-up">
        <h2>Étape 0 : Accéder à la page de connexion</h2>
        <p>Ouvrez votre navigateur et entrez <strong>http://localhost:5173/login</strong> pour accéder à la page de connexion.</p>
        <img :src="docStore.steps.login" alt="Connexion" class="doc-image" />
      </div>
  
      <!-- Étape 1 -->
      <div class="doc-step" data-aos="fade-up">
        <h2>Étape 1 : Se connecter</h2>
        <p>Entrez vos identifiants (email et mot de passe), puis cliquez sur <strong>"Se connecter"</strong>.</p>
        <img :src="docStore.steps.loginForm" alt="Formulaire de connexion" class="doc-image" />
      </div>
  
      <!-- Étape 2 -->
      <div class="doc-step" data-aos="fade-up">
        <h2>Étape 2 : Accéder au tableau de bord</h2>
        <p>Une fois connecté, vous êtes redirigé vers le <strong>Tableau de bord</strong> où vous pouvez suivre vos indicateurs.</p>
        <img :src="docStore.steps.dashboard" alt="Tableau de bord" class="doc-image" />
      </div>
  
      <!-- Étape 3 -->
      <div class="doc-step" data-aos="fade-up">
        <h2>Étape 3 : Créer un nouvel article</h2>
        <p>Depuis le tableau de bord, cliquez sur le bouton <strong>"+ Nouveau Post"</strong>.</p>
        <img :src="docStore.steps.newPostButton" alt="Créer un post" class="doc-image" />
      </div>
  
      <!-- Étape 4 -->
      <div class="doc-step" data-aos="fade-up">
        <h2>Étape 4 : Remplir le formulaire</h2>
        <ul>
          <li><strong>Titre :</strong> Saisissez le titre de l’article.</li>
          <li><strong>Catégorie :</strong> Sélectionnez la catégorie.</li>
          <li><strong>Résumé :</strong> Ajoutez une courte description.</li>
        </ul>
        <img :src="docStore.steps.form1" alt="Formulaire partie 1" class="doc-image" />
      </div>
  
      <!-- Étape 5 -->
      <div class="doc-step" data-aos="fade-up">
        <h2>Étape 5 : Contenu complet, Ajouter l’image et statut</h2>
        <p>Rédigez le contenu avec l’éditeur HTML/Markdown intégré.</p>
        <p>Ajoutez une image de couverture, définissez le statut de l’article (publié ou brouillon) et cochez si vous souhaitez le mettre à la une et publier.</p>
        <img :src="docStore.steps.form2" alt="Formulaire partie 2" class="doc-image" />
      </div>
  
      <!-- Étape 6
      <div class="doc-step" data-aos="fade-up">
        <h2>Étape 6 : Ajouter l’image et statut</h2>
        <p>Ajoutez une image de couverture, définissez le statut de l’article (publié ou brouillon) et cochez si vous souhaitez le mettre à la une.</p>
        <img :src="docStore.steps.form3" alt="Formulaire partie 3" class="doc-image" />
      </div> -->

      <!-- Étape 6 -->
        <div class="doc-step" data-aos="fade-up">
        <h2>Étape 6 : Aperçu des articles publiés</h2>
        <p>Cette section permet de consulter, modifier ou supprimer les articles de blog déjà créés.</p>
        <ul>
            <li><strong>Titre & Image :</strong> aperçu visuel de l’article avec sa miniature.</li>
            <li><strong>Vue :</strong> nombre total de consultations de l’article.</li>
            <li><strong>Date :</strong> date de publication.</li>
            <li><strong>Statut :</strong> indique si l’article est publié ou non.</li>
            <li><strong>À la une :</strong> option pour mettre l’article en avant sur la page d’accueil.</li>
            <li><strong>Actions :</strong> permet d’éditer ✏️ ou supprimer 🗑️ l’article.</li>
            <li><strong>Voir :</strong> permet d’ouvrir l’article en vue publique 👁️.</li>
        </ul>
        <img :src="docStore.steps.newPostButton" alt="Aperçu des posts" class="doc-image" />
        </div>

    </section>
  </template>
  
  <script setup>
  const logo = new URL('../assets/img/logo2.png', import.meta.url).href

  import { useDocStore } from '../stores/useDocStore'
  const docStore = useDocStore()
  </script>
  
  <style scoped>
 .doc-header-full {
  width: 100%;
  background-color: #f0fdfc;
  border-bottom: 3px solid #45A79E;
  padding: 1.2rem 0;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 999;
}

.doc-header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.doc-logo {
  height: 50px;
  object-fit: contain;
}

.doc-title {
  font-size: 1.3rem;
  color: #5E5325;
  font-weight: 300;
  text-align: center;
  padding-top: 50px;
  flex: 1;
}

 .documentation {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: 'Segoe UI', Roboto, sans-serif;
  line-height: 1.7;
  background-color: #fff;
}

.doc-title {
  text-align: center;
  font-size: 2.6rem;
  font-weight: 700;
  color: #5E5325;
  margin-bottom: 3rem;
  /* border-bottom: 3px solid #45A79E; */
  display: inline-block;
  padding-bottom: 0.5rem;
}

.doc-step {
  margin-bottom: 3rem;
  /* border-left: 4px solid #45A79E; */
  padding-left: 1.5rem;
  background: #f9fbfb;
  border-radius: 12px;
  padding: 1.5rem 1.5rem 2rem;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease-in-out;
}

.doc-step:hover {
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.doc-step h2 {
  font-size: 1.6rem;
  color: #007f7f;
  margin-bottom: 1rem;
}

.doc-step p,
.doc-step ul {
  font-size: 1rem;
  color: #333;
  margin-bottom: 1rem;
}

.doc-step strong {
  color: #444;
}

.doc-step ul {
  list-style: disc;
  padding-left: 1.5rem;
}

.doc-image {
  width: 100%;
  max-width: 100%;
  border-radius: 8px;
  margin-top: 1.2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease;
}

.doc-image:hover {
  transform: scale(1.02);
}

  </style>