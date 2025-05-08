import { defineStore } from 'pinia'
import image1 from '@/assets/img/features-illustration-1.webp'
import image2 from '@/assets/img/data.png'
import image3 from '@/assets/img/securite.jpg'

export const useTechnologieStore = defineStore('Technologies', {
  state: () => ({
    intro: `KPS CONSULTING ANALYTICS place l'innovation et l'excellence au cœur de son
    développement et intervient dans les domaines liés à la transformation digitale des grands groupes, des PME, des TPE et nous accompagnons toutes sortes de start-ups. `,
    activeTab: 'features-tab-1',
    tabs: [
      {
        id: 'features-tab-1',
        title: 'Gestion de la Performance',
        heading: 'Optimisation et Alignement Stratégique',
        description: `Notre expertise des solutions EPM nous permet de renforcer la performance globale de 
votre entreprise en alliant technologie et vision métier.`,
        points: [
          'Tableaux de bord sur-mesure, conçus avec des outils comme Anaplan, Board, Pigment ou Tagetik.',
          'Optimisation des processus de gestion : planification budgétaire, prévisions, modélisation.',
          'Vision claire pour une meilleure prise de décision, grâce à des données fiables et centralisées.'
        ],
        image: image1
      },
      {
        id: 'features-tab-2',
        title: 'Big Data & Visualisation',
        heading: 'Exploitation des Données Massives',
        description: `Notre expertise en traitement et valorisation de données vous permet de transformer la complexité en clarté.`,
        points: [
          'Collecte et structuration des données à l’aide d’outils puissants comme Stambia et Semarchy.',
          'Analyse poussée et visualisation intuitive via Power BI et Tableau.',
          'Dashboards interactifs et performants, pour une lecture rapide et une prise de décision éclairée.'
        ],
        image: image2
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
        image: image3
      }
    ]
  })
})
