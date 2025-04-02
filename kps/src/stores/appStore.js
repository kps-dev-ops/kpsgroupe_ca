import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    pageTitle: 'Accueil',
    contactInfo: {
      email: 'contact@kpsgroupe.com',
      phone: '+229 123 456 789'
    },
    userLanguage: 'fr'
  }),
  actions: {
    setPageTitle(title) {
      this.pageTitle = title
    },
    setUserLanguage(language) {
      this.userLanguage = language
    }
  }
})
