import { defineStore } from 'pinia'

export const detailmenu = defineStore('header', {
  state: () => ({
    logoPath: './src/assets/img/logo2.png',
    menu: [
      { label: 'Accueil', href: '/' },
    //   { label: 'À propos', href: '/#about' },
    //   { label: 'Expertise', href: '/#services' },
    //   { label: 'Technologies', href: '/#Technologies' },
    //   { label: 'blog', href: '/#blog' }
    ],
    contactText: 'Contactez-nous',
    contactHref: '#contact',
    isMenuOpen: false
  }),

  actions: {
    toggleMenu() {
      console.log('toggleMenu called!') 
      this.isMenuOpen = !this.isMenuOpen
      console.log('isMenuOpen:', this.isMenuOpen) // ✅ T
    },

    updateMenu(newMenu) {
      this.menu = newMenu
    },

    updateLogo(newPath) {
      this.logoPath = newPath
    },
    resetMenu() {
        this.menu = []
      }
  }
})
