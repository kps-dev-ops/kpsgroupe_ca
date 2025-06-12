import { defineStore } from 'pinia'
import logo from '@/assets/img/logo2.png'

export const useHeaderStore = defineStore('header', {
  state: () => ({
    logoPath: logo,
    menu: [
      { label: 'Accueil', href: '/#hero' },
      { label: 'À propos', href: '/#about' },
      { label: 'Expertise', href: '/#services' },
      { label: 'Technologies', href: '/#Technologies' },
      { label: 'Blog', href: '/#blog' },
      {  label: 'Carrières', href: '/#Carrières' }
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
