import { defineStore } from 'pinia'

export const useContactStore = defineStore('contact', {
  state: () => ({
    formData: {
      name: '',
      email: '',
      message: ''
    }
  }),
  actions: {
    updateFormData(field, value) {
      this.formData[field] = value
    },
    resetForm() {
      this.formData = { name: '', email: '', message: '' }
    }
  }
})
