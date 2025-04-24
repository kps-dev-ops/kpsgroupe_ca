import { defineStore } from 'pinia'

export const Admminstore = defineStore('header', {
  state: () => ({
    logoPath: './src/assets/img/logo2.png',
    menu: [
      // { label: 'Dashboad', href: '#Dashboad' },
      // { label: 'Post', href: '#Post' },
      // { label: 'Statistique', href: '#Statistique' },
      // { label: 'Cathegories', href: '#Cathegorie' },
      // { label: 'blog', href: '#blog' }
    ],
    contactText: 'Logout',
    tutoriels: 'Help',
    contactHref: '#Profil',
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
