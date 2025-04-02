import { defineStore } from 'pinia'

export const useAccueilStore = defineStore('accueil', {
  state: () => ({
    intro: 'Bienvenue sur :',
    titre: 'KPS CONSULTING ANALYTICS',
    description: `Depuis plus de 8 ans, nos experts accompagnent des
    entreprises et administrations dans la réalisation de leurs
    projets de transformation digitale en France et en Europe.`,
    contactText: 'Contactez-nous',
    contactHref: '#contact',
    videoText: 'Voir la vidéo',
    videoUrl: 'https://www.youtube.com/embed/Y7f98aduVJ8',
    image: './src/assets/img/illustration-1.webp',
    message: `Nous mettons en œuvre une solution sur mesure
      pour renforcer votre efficacité et piloter votre activité en temps réel.`,

    stats: [
      {
        title: '+100 Consultations',
        description: 'Des services personnalisés pour chaque client',
        icon: 'bi bi-calendar-check'
      },
      {
        title: '+200% Croissance',
        description: 'Une progression exponentielle grâce à nos solutions',
        icon: 'bi bi-graph-up-arrow'
      },
      {
        title: '+6 Nouvelles implantations',
        description: 'Expansion rapide pour être plus proche de vous',
        icon: 'bi bi-geo-alt'
      },
      {
        title: '+100 Clients',
        description: 'Une communauté en pleine croissance nous fait confiance',
        icon: 'bi bi-people'
      }
    ]
  })
})
