import { defineStore } from 'pinia'
import logo from '@/assets/img/logo2.png'

export const detailmenu = defineStore('header', {
  state: () => ({
    logoPath: logo,
    menu: [
      { label: 'Accueil', href: '/' },
   
    ],
    contactText: 'Contactez-nous',
    contactHref: '#contact',
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
    },
    resetMenu() {
        this.menu = []
      }
  }
})
