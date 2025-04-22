import { defineStore } from 'pinia'

export const useHeaderStore = defineStore('header', {
  state: () => ({
    logoPath: new URL('../assets/img/logo2.png', import.meta.url).href,
    menu: [
      { label: 'Accueil', href: '/#hero' },
      { label: 'À propos', href: '/#about' },
      { label: 'Expertise', href: '/#services' },
      { label: 'Technologies', href: '/#Technologies' },
      { label: 'Blog', href: '/#blog' }
    ],
    contactText: 'Contactez-nous',
    contactHref: '/#contact',
    isMenuOpen: false
  }),

  actions: {
    toggleMenu() {
      console.log('toggleMenu called!') 
      this.isMenuOpen = !this.isMenuOpen
      console.log('isMenuOpen:', this.isMenuOpen)
    },

    updateMenu(newMenu) {
      this.menu = newMenu
    },

    updateLogo(newPath) {
      this.logoPath = newPath
    }
  }
})
