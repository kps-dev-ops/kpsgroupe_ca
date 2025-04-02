import { defineStore } from 'pinia'

export const useTechnologieStore = defineStore('Technologies', {
  state: () => ({
    intro: `KPS CONSULTING ANALYTICS place l'innovation et l'excellence au cœur de son
    développement et intervient dans les domaines liés à la transformation digitale...`,
    activeTab: 'features-tab-1',
    tabs: [
      {
        id: 'features-tab-1',
        title: 'Gestion de la Performance',
        heading: 'Optimisation et Alignement Stratégique',
        description: `Notre expertise des solutions EPM...`,
        points: [
          'Tableaux de bord sur-mesure.',
          'Optimisation des processus de gestion.',
          'Vision claire pour meilleure prise de décision.'
        ],
        image: './src/assets/img/features-illustration-1.webp'
      },
      {
        id: 'features-tab-2',
        title: 'Big Data & Visualisation',
        heading: 'Exploitation des Données Massives',
        description: `Grâce à notre expertise en Stambia, Semarchy...`,
        points: [
          'Collecte et structuration des données.',
          'Analyse avec Power BI et Tableau.',
          'Dashboards interactifs et performants.'
        ],
        image: './src/assets/img/features-illustration-2.webp'
      },
      {
        id: 'features-tab-3',
        title: 'Cybersécurité',
        heading: 'Protection et Sécurisation des Données',
        description: `Nous sécurisons vos systèmes d'information...`,
        points: [
          'Protection contre les cyberattaques.',
          'Gestion des accès et identités.',
          'Prévention et détection des menaces.'
        ],
        image: './src/assets/img/features-illustration-3.webp'
      }
    ]
  })
})
