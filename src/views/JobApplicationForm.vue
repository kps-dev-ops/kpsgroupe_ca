<template>
  <div class="form-wrapper">
    <button class="close-button" @click="$emit('close')">×</button>
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

      <!-- <textarea v-model="form.message" placeholder="Message / Lettre de motivation" required></textarea> -->

      <div class="file-upload" @click="triggerCvUpload">
        <input type="file" ref="cvInput" @change="handleCvChange" accept=".pdf,.doc,.docx" hidden />
        <i class="fas fa-cloud-upload-alt fa-2x" style="color: #45a79e;"></i>
        <p>{{ form.cvFileName || "Cliquez pour télécharger votre CV (PDF, DOC, DOCX)" }}</p>
      </div>

      <div class="file-upload" @click="triggerMotivationUpload">
        <input type="file" ref="motivationInput" @change="handleMotivationChange" accept=".pdf,.doc,.docx" hidden />
        <i class="fas fa-cloud-upload-alt fa-2x" style="color: #45a79e;"></i>
        <p>{{ form.motivationFileName || "Lettre de motivation (facultatif)" }}</p>
      </div>

      <div class="consent">
        <input type="checkbox" v-model="form.consent" required />
        <label>
          J'accepte que mes données personnelles soient traitées conformément à la politique de confidentialité pour le traitement de ma candidature.
        </label>
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
  cvFile: null as File | null,
  cvFileName: '',
  motivationFile: null as File | null,
  motivationFileName: '',
  consent: false
})

const cvInput = ref<HTMLInputElement | null>(null)
const motivationInput = ref<HTMLInputElement | null>(null)

watch(() => props.position, (newVal) => {
  form.value.position = newVal
})

const triggerCvUpload = () => cvInput.value?.click()
const triggerMotivationUpload = () => motivationInput.value?.click()

const handleCvChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    form.value.cvFile = file
    form.value.cvFileName = file.name
  }
}

const handleMotivationChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    form.value.motivationFile = file
    form.value.motivationFileName = file.name
  }
}


const submitApplication = async () => {
  try {
    const formData = new FormData()
    formData.append('firstName', form.value.firstName)
    formData.append('lastName', form.value.lastName)
    formData.append('email', form.value.email)
    formData.append('phone', form.value.phone)
    formData.append('position', form.value.position)
    formData.append('message', form.value.message)
    formData.append('consent', form.value.consent.toString())

    if (form.value.cvFile) {
      formData.append('cvFile', form.value.cvFile)
    }

    if (form.value.motivationFile) {
      formData.append('motivationFile', form.value.motivationFile)
    }

    const response = await fetch('http://localhost:8080/api/send-email-postulation', {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      throw new Error(`Erreur serveur : ${response.status}`)
    }

    const result = await response.json()

    if (result.status === 'success') {
      alert('Candidature envoyée avec succès !')
      form.value = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        position: props.position || '',
        message: '',
        cvFile: null,
        cvFileName: '',
        motivationFile: null,
        motivationFileName: '',
        consent: false
      }
    } else {
      alert(`Erreur : ${result.message}`)
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi :", error)
    alert("Erreur lors de l'envoi. Veuillez réessayer.")
  }
}

</script>

  <style scoped>
 .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  overflow-y: auto;
}


.form-wrapper {
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 700px;
  box-shadow: 0 0 15px rgba(0,0,0,0.15);
  position: relative;
}

.application-form {
  display: flex;
  flex-direction: column;
   gap: 1.2rem; 
}

.form-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.form-row input {
  flex: 1;
  min-width: 200px;
}

input, textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #cfe2ff;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease;
}

input:focus, textarea:focus {
  border-color: #45a79e;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.file-upload {
  border: 2px dashed #cfe2ff;
  border-radius: 10px;
  text-align: center;
  padding: 1.5rem;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.file-upload:hover {
  border-color: #45a79e;
}

.file-upload input[type="file"] {
  display: none;
}

.consent {
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 1.4;
  margin-top: 1rem;
  gap: 0.5rem;
  white-space: normal;
  flex-wrap: wrap;
}

.consent input[type="checkbox"] {
  transform: scale(1.2);
  accent-color: #45a79e; /* couleur personnalisée si tu veux */
}


button[type="submit"] {
  align-self: center;
  background-color: #45a79e;
  color: white;
  padding: 0.9rem 2rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #3a8f87;
}

.close-button {
  position: absolute;
  top: 2rem;
  right: -18rem;
  font-size: 1.5rem;
  background: transparent;
  border: none;
  color: #666;
  background-color: #45a79e;

  cursor: pointer;
  transition: color 0.2s ease;
} 
/* 
.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  background: transparent;
  border: none;
  color: #666;
  cursor: pointer;
  z-index: 10;
} */


.close-button:hover {
  color: #111;
}


@media screen and (max-width: 768px) {
  .modal-container {
    padding: 1rem;
  }

  .form-row {
    flex-direction: column;
  }

  .consent {
    flex-direction: column;
    align-items: flex-start;
  }
}



  </style>
