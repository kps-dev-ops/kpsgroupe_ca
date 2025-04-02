import { defineStore } from 'pinia'

export const useServicesStore = defineStore('services', {
  state: () => ({
    sectionTitle: 'Notre expertise',
    sectionDescription: 'Nous nous engageons à vous fournir un accompagnement personnalisé et des solutions innovantes grâce à notre expertise dans différents domaines clés.',
    services: [
      {
        id: 1,
        title: 'Expert métier',
        description: 'Nous optimisons vos stratégies, organisations et processus pour maximiser votre performance.',
        icon: 'bi bi-gear-wide-connected',
        delay: 100
      },
      {
        id: 2,
        title: 'Accompagnement personnalisé',
        description: 'Nous vous aidons à comprendre vos enjeux, définir vos besoins et trouver les solutions adaptées.',
        icon: 'bi bi-person-check',
        delay: 200
      },
      {
        id: 3,
        title: 'Transformation digitale',
        description: 'Nous vous guidons dans la mise en œuvre de technologies innovantes pour gagner en efficacité.',
        icon: 'bi bi-cloud-arrow-up',
        delay: 300
      },
      {
        id: 4,
        title: 'Solutions de cybersécurité',
        description: 'Nous proposons des stratégies robustes pour protéger vos actifs numériques et garantir l\'intégrité de vos données.',
        icon: 'bi bi-shield-lock',
        delay: 400
      }
    ]
  })
})
