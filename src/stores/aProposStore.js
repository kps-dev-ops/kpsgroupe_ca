import { defineStore } from 'pinia'

export const useAProposStore = defineStore('aPropos', {
  state: () => ({
    title: 'À propos de nous',
    description: 'Depuis plus de 8 ans, nos experts accompagnent des entreprises et administrations dans la réalisation de leurs projets de transformation digitale en France et en Europe.',
    additionalInfo: 'KPS CONSULTING ANALYTICS soutient divers clients issus de secteurs variés (Luxe, Secteur public, Transport et logistique, Assurance, Agro-industrie, Immobilier, etc.) en les aidant à réussir leurs transformations opérationnelles et digitales. Nous sommes spécialisés dans des domaines clés comme l\'EPM (Enterprise Performance Management), l\'ERP (Enterprise Resource Planning), ainsi que la collecte, la transformation et la visualisation des données, sans oublier les solutions Big Data.',
    imageUrl: '/src/assets/img/about-5.webp',
    smallImageUrl: '/src/assets/img/about-2.webp',
    experienceYears: 6
  }),
  actions: {
    setAProposData(data) {
      this.title = data.title
      this.description = data.description
      this.additionalInfo = data.additionalInfo
      this.imageUrl = data.imageUrl
      this.smallImageUrl = data.smallImageUrl
      this.experienceYears = data.experienceYears
    }
  }
})
