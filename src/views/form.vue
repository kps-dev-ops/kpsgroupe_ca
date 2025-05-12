<template>
    <div class="form-wrapper">
      <form @submit.prevent="submitApplication" class="application-form">
        <div class="form-row">
          <input type="text" v-model="form.firstName" placeholder="Prénom" required />
          <input type="text" v-model="form.lastName" placeholder="Nom" required />
        </div>
        <div class="form-row">
          <input type="email" v-model="form.email" placeholder="Email" required />
          <input type="tel" v-model="form.phone" placeholder="Téléphone" required />
        </div>
        <input type="text" v-model="form.position" readonly placeholder="Poste recherché" required />
        <textarea v-model="form.message" placeholder="Message / Lettre de motivation" required></textarea>
  
        <div class="file-upload">
          <input type="file" @change="handleFileChange" accept=".pdf,.doc,.docx" />
          <span>{{ form.fileName || 'Choisir un fichier' }}</span>
        </div>
  
        <div class="consent">
          <input type="checkbox" v-model="form.consent" required />
          <label>J'accepte la politique de confidentialité.</label>
        </div>
  
        <button type="submit">Envoyer ma candidature</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue'
  import { Client, Databases, ID } from 'appwrite'
  
  const props = defineProps<{ position: string }>()
  
  const form = ref({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: props.position || '',
    message: '',
    file: null as File | null,
    fileName: '',
    consent: false
  })
  
  watch(() => props.position, (newVal) => {
    form.value.position = newVal
  })
  
  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if (file) {
      form.value.file = file
      form.value.fileName = file.name
    }
  }
  
  // Appwrite setup
  const client = new Client()
    .setEndpoint('https://[TON_ENDPOINT]')
    .setProject('[TON_PROJECT_ID]')
  
  const databases = new Databases(client)
  
  const submitApplication = async () => {
    try {
      await databases.createDocument('[DATABASE_ID]', '[COLLECTION_ID]', ID.unique(), {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        email: form.value.email,
        phone: form.value.phone,
        position: form.value.position,
        message: form.value.message,
        fileName: form.value.fileName,
        consent: form.value.consent
      })
  
      alert('Candidature envoyée avec succès !')
    } catch (err) {
      console.error(err)
      alert("Erreur lors de l'envoi de la candidature")
    }
  }
  </script>
  
    
    <style scoped>
    .form-wrapper {
      padding: 2rem;
      border-radius: 10px;
      background: #fff;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      max-width: 600px;
      margin: 0 auto;
    }
    .application-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .form-row {
      display: flex;
      gap: 1rem;
    }
    input, textarea {
      padding: 0.8rem;
      border: 1px solid #ccc;
      border-radius: 5px;
      width: 100%;
    }
    .file-upload {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    button {
      background-color: #45a79e;
      color: white;
      padding: 0.8rem 1.5rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    button:hover {
      background-color: #3e978f;
    }
    .consent {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
    }
    </style>
    