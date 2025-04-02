<script setup>
import { useContactStore } from '..//stores/contactStore'
const contactStore = useContactStore()

function handleChange(field, event) {
  contactStore.updateFormData(field, event.target.value)
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <input v-model="contactStore.formData.name" placeholder="Votre nom" />
    <input v-model="contactStore.formData.email" placeholder="Votre email" />
    <textarea v-model="contactStore.formData.message" placeholder="Votre message"></textarea>
    <button type="submit">Envoyer</button>
  </form>
</template>
