import { defineStore } from 'pinia'

export const useHeaderStore = defineStore('header', {
  state: () => ({
    logoPath: './src/assets/img/logo2.png',
    menu: [
      { label: 'Accueil', href: '#hero' },
      { label: 'À propos', href: '#about' },
      { label: 'Expertise', href: '#services' },
      { label: 'Technologies', href: '#Technologies' }
    ],
    contactText: 'Contactez-nous',
    contactHref: '#contact',
    isMenuOpen: false
  }),

  actions: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },

    updateMenu(newMenu) {
      this.menu = newMenu
    },

    updateLogo(newPath) {
      this.logoPath = newPath
    }
  }
})
