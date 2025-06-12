import { defineStore } from 'pinia'
import logo from '@/assets/img/logo2.png'

export const Admminstore = defineStore('header', {
  state: () => ({
    logoPath: logo,
    menu: [
      { label: 'Dashboard', href: '/layer/Dashboad' },
      { label: 'Carrière', href: '/layer/Carrrieredash' },
      { label: 'Documentation', href: '/layer/kps-doc' },
       { label: 'Déconnexion', action: 'logout' }

     
      // { label: 'Statistique', href: '#Statistique' },
      // { label: 'Cathegories', href: '#Cathegorie' },
      // { label: 'blog', href: '#blog' }
    ],
    // contactText: 'Logout',
    // tutoriels: 'Help',
    // Dashboad: 'Dashboad',
    // Carriere: 'Carriere',
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
