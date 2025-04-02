import { defineStore } from 'pinia'

export const useFooterStore = defineStore('footer', {
  state: () => ({
    logo: './src/assets/img/logo.png',
    citation: `“Nous mettons en œuvre une solution sur mesure pour renforcer votre efficacité et piloter votre activité en temps réel.”`,
    navLinks: [
      { label: 'Accueil', href: '#hero' },
      { label: 'À propos', href: '#about' },
      { label: 'Expertise', href: '#services' },
      { label: 'Technologies', href: '#Technologies' }
    ],
    socialLinks: [
      { icon: 'bi bi-linkedin', href: 'https://www.linkedin.com/company/kps-analytics/' }
    ],
    contact: {
      adresse: '25 Rue de Ponthieu, 75008 Paris',
      tel: '+33 6 52 521 414 / +33 6 61 600 900 / +33 6 51 953 090',
      email: 'contact@kpsgroupe.com'
    }
  })
})
